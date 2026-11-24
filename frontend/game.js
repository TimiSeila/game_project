import { Level } from "./level.js"

class Game{
    constructor(){
        this.canvas = document.getElementById("game_canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerWidth * 9 / 16
        this.currentLevelIndex = 0

        this.levels = [
            new Level(1, this.canvas, this.ctx),
            new Level(2, this.canvas, this.ctx),
            new Level(3, this.canvas, this.ctx)
        ]
    }

    async init(){
        for (const level of this.levels){
            await level.init()
        }
        this.draw()
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.levels[this.currentLevelIndex].draw()
    }

    async nextLevel(){
        this.currentLevelIndex++;
        this.draw()
    }
}

const game = new Game()
await game.init()
game.draw()

document.addEventListener("click", async() => await game.nextLevel())
