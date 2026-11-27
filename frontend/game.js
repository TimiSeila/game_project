import { Level } from "./level.js"
import { Player } from "./player.js"
import { Tick } from "./tick.js"

class Game{
    constructor(){
        this.canvas = document.getElementById("game_canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = window.innerHeight * 16 / 9
        this.canvas.height = window.innerHeight
        this.currentLevelIndex = 0
        this.tickSystem = new Tick()

        this.levels = [
            new Level(1, this.canvas, this.ctx),
            new Level(2, this.canvas, this.ctx),
            new Level(3, this.canvas, this.ctx)
        ]

        this.players = []
    }

    async init(){
        for (const level of this.levels){
            await level.init()
        }

        this.players.push(new Player({left: "KeyA", right: "KeyD", up: "KeyW"},
            true,
            this.ctx,
            this.canvas,
            this.canvas.width / this.levels[this.currentLevelIndex].width,
            this.canvas.height / this.levels[this.currentLevelIndex].height
        ))

        this.players.push(new Player({left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp"},
            true,
            this.ctx,
            this.canvas,
            this.canvas.width / this.levels[this.currentLevelIndex].width,
            this.canvas.height / this.levels[this.currentLevelIndex].height
        ))

        this.tickSystem.onTick(() => {
            this.update()
            this.draw()
        })
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.levels[this.currentLevelIndex].draw()
        for (const player of this.players){
            player.draw()
        }
    }

    update(){
        for (const player of this.players){
            player.updateMovement(this.levels[this.currentLevelIndex].elements, this.levels[this.currentLevelIndex].width, this.levels[this.currentLevelIndex].height)
        }
    }

    async nextLevel(){
        this.currentLevelIndex++;
    }
}

const game = new Game()
await game.init()

document.addEventListener("click", async() => await game.nextLevel())
