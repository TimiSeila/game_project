import { fetchLevelById } from "./api.js"

export class Level{
    constructor(level_id, canvas, ctx){
        this.level_id = level_id;
        this.canvas = canvas
        this.ctx = ctx;
    }

    async init(){
        const level_data = await fetchLevelById(this.level_id)
        this.elements = level_data.elements
        this.width = level_data.width
        this.height = level_data.height
    }

    draw(){
        for (const element of this.elements){
            const element_width = this.canvas.width / this.width
            const element_height = this.canvas.height / this.height
            switch(element.type){
                case "floor":
                    this.ctx.fillStyle = "green";
                    break;
                case "spike":
                    this.ctx.fillStyle = "grey";
                    break;
            }
            this.ctx.fillRect((element.location.x - 1) * element_width, (element.location.y - 1) * element_height, element_width, element_height);
        }
    }
}
