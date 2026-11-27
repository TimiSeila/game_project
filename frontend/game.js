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

        // player 1 is black, player 2 is white
        this.players.push(new Player({left: "KeyA", right: "KeyD", up: "KeyW", interact: "KeyE", interactLabel: "E", color: "black"},
            true,
            this.ctx,
            this.canvas,
            this.canvas.width / this.levels[this.currentLevelIndex].width,
            this.canvas.height / this.levels[this.currentLevelIndex].height
        ))

        this.players.push(new Player({left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp", interact: "Enter", interactLabel: "ENTER", color: "white"},
            true,
            this.ctx,
            this.canvas,
            this.canvas.width / this.levels[this.currentLevelIndex].width,
            this.canvas.height / this.levels[this.currentLevelIndex].height
        ))

        const spawn_x = this.canvas.width / this.levels[this.currentLevelIndex].width
        this.players[0].x = 0
        this.players[1].x = spawn_x

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
        const level = this.levels[this.currentLevelIndex]
        const nearbyButtons = new Map()

        for (const player of this.players){
            player.updateMovement(level.elements, level.width, level.height)
            if (player.nearbyButton){
                nearbyButtons.set(player.nearbyButton, player.controls.interactLabel)
            }
        }

        for (const player of this.players){
            if (!player.interact){
                continue
            }

            player.interact = false
            if (player.nearbyButton){
                // open the door linked to the button the player is standing on
                level.openDoor(player.nearbyButton.door_id, player.controls.color)
            }
        }

        level.nearbyButtons = nearbyButtons
    }

    async nextLevel(){
        this.currentLevelIndex++;
    }
}

const game = new Game()
await game.init()

document.addEventListener("click", async() => await game.nextLevel())
