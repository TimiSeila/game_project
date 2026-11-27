import { fetchLevelById } from "./api.js"

export class Level{
    constructor(level_id, canvas, ctx){
        this.level_id = level_id;
        this.canvas = canvas
        this.ctx = ctx;
        this.elements = []
        // doors that are already open, so the buttons can turn green
        this.openedDoors = new Set()
        // buttons a player is standing on, used for the key prompt
        this.nearbyButtons = new Map()
    }

    async init(){
        const level_data = await fetchLevelById(this.level_id)
        this.elements = level_data.elements
        this.width = level_data.width
        this.height = level_data.height
        this.openedDoors = new Set()
        this.nearbyButtons = new Map()
    }

    // removes the door from the level if the player is allowed to open it
    openDoor(door_id, player_color){
        if (!door_id){
            return false
        }

        const door_exists = this.elements.some((element) =>
            element.type === "door" &&
            element.id === door_id &&
            (!element.player || element.player === player_color)
        )
        if (!door_exists){
            return false
        }

        this.elements = this.elements.filter((element) =>
            !(element.type === "door" && element.id === door_id && (!element.player || element.player === player_color))
        )
        this.openedDoors.add(door_id)
        return true
    }

    draw(){
        const element_width = this.canvas.width / this.width
        const element_height = this.canvas.height / this.height

        for (const element of this.elements){
            const x = (element.location.x - 1) * element_width
            const y = (element.location.y - 1) * element_height

            switch(element.type){
                case "floor":
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(x, y, element_width, element_height);
                    break;
                case "spike":
                    this.ctx.fillStyle = "grey";
                    this.ctx.fillRect(x, y, element_width, element_height);
                    break;
                case "door":
                    this.#drawDoor(x, y, element_width, element_height, element)
                    break;
                case "button":
                    this.#drawButton(x, y, element_width, element_height, element)
                    break;
            }
        }
    }

    // door is 2 tiles tall, the color shows which player can open it
    #drawDoor(x, y, element_width, element_height, element){
        const door_height = element_height * 2
        const border = Math.max(2, element_width * 0.08)
        const is_black = element.player === "black"
        const is_white = element.player === "white"

        this.ctx.fillStyle = is_black ? "#111111" : is_white ? "#f2f2f2" : "#8a5a2b"
        this.ctx.fillRect(x, y, element_width, door_height)

        this.ctx.strokeStyle = is_black ? "#f2f2f2" : is_white ? "#111111" : "#3d2414"
        this.ctx.lineWidth = border
        this.ctx.strokeRect(x + border / 2, y + border / 2, element_width - border, door_height - border)
    }

    // button turns green once its door is open
    #drawButton(x, y, element_width, element_height, element){
        const is_open = this.openedDoors.has(element.door_id)
        const is_nearby = this.nearbyButtons.has(element)
        const is_black = element.player === "black"
        const is_white = element.player === "white"
        const padding = element_width * 0.25
        const button_x = x + padding
        const button_y = y + padding
        const button_width = element_width - padding * 2
        const button_height = element_height - padding * 2

        this.ctx.fillStyle = is_open ? "#4fae63" : is_black ? "#111111" : is_white ? "#f2f2f2" : "#f2d04b"
        this.ctx.fillRect(button_x, button_y, button_width, button_height)

        this.ctx.strokeStyle = is_nearby ? "#00e5ff" : is_black ? "#f2f2f2" : is_white ? "#111111" : "#3b3324"
        this.ctx.lineWidth = Math.max(2, element_width * 0.06)
        this.ctx.strokeRect(button_x, button_y, button_width, button_height)

        if (is_nearby){
            this.ctx.fillStyle = "#00e5ff"
            this.ctx.font = `bold ${Math.max(12, element_height * 0.28)}px Cinzel, serif`
            this.ctx.textAlign = "center"
            this.ctx.fillText(this.nearbyButtons.get(element), x + element_width / 2, y - element_height * 1.2)
        }
    }
}
