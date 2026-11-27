export class Player{
    constructor(controls, isActive, ctx, canvas, width, height){
        this.controls = controls
        this.isActive = isActive
        this.ctx = ctx
        this.canvas = canvas
        this.width = width
        this.height = 2 * height
        this.speedX = 0
        this.speedY = 0
        this.gravity = 0.5
        this.gravityMultiplier = 0
        this.x = 0
        this.y = 0
        this.left = false
        this.right = false
        this.up = false
        this.isJumping = false

        this.#addKeyboardListeners()
    }

    #addKeyboardListeners(){
        document.addEventListener("keydown", (e) => {
            switch(e.code){
                case this.controls.left:
                    this.left = true
                    break;
                case this.controls.right:
                    this.right = true
                    break;
                case this.controls.up:
                    this.up = true
            }
        })

        document.addEventListener("keyup", (e) => {
            switch(e.code){
                case this.controls.left:
                    this.left = false
                    break;
                case this.controls.right:
                    this.right = false
                    break;
                case this.controls.up:
                    this.up = false
            }
        })
    }

    draw(){
        if(this.speedX < 0){
            this.ctx.fillStyle = "blue"
        }
        if(this.speedX > 0){
            this.ctx.fillStyle = "red"
        }
        if(this.speedX == 0){
            this.ctx.fillStyle = "green"
        }
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    updateMovement(level_elements, level_width, level_height){
        let blocked_right = false
        let blocked_left = false
        let blocked_top = false
        let blocked_bottom = false

        const player_left = this.x
        const player_right = this.x + this.width
        const player_top = this.y
        const player_bottom = this.y + this.height

        for (const element of level_elements){
            const element_width = this.canvas.width / level_width
            const element_height = this.canvas.height / level_height

            const element_left = (element.location.x - 1) * element_width
            const element_right = (element.location.x - 1) * element_width + element_width
            const element_top = (element.location.y - 1) * element_height
            const element_bottom = (element.location.y - 1) * element_height + element_height

            if (
                player_right > element_left &&
                player_left < element_right &&
                player_bottom > element_top &&
                player_top < element_bottom
            ){
                const distance_x = (element_left + element_right) / 2 - (player_left + player_right) / 2
                const distance_y = (element_top + element_bottom) / 2 - (player_top + player_bottom) / 2

                const overlap_x = (this.width + element_width) / 2 - Math.abs(distance_x);
                const overlap_y = (this.height + element_height) / 2 - Math.abs(distance_y);

                if (overlap_x < overlap_y) {
                    if (distance_x > 0) {
                        blocked_right = true
                        this.x = element_left - this.width
                    }else{
                        blocked_left = true
                        this.x = element_right
                    }

                }else{
                    if (distance_y > 0) {
                        blocked_bottom = true
                        this.y = element_top - this.height
                    }else{
                        blocked_top = true
                        this.y = element_bottom
                    }
                }
            }
        }

        this.speedY = 0
        if(!this.left && !this.right) {this.speedX = 0}
        if (this.left && !blocked_left) {this.speedX = -4}
        if (this.right && !blocked_right) {this.speedX = 4}

        this.x += this.speedX

        if(!blocked_bottom){
            this.gravityMultiplier += this.gravity
            this.y += this.speedY + this.gravityMultiplier;
        }else{
            this.gravityMultiplier = 0
        }

        if (this.up && !blocked_top && blocked_bottom) {this.#jump()}

        if (this.gravityMultiplier > 12) {
            this.gravityMultiplier = 12
        }
    }

    #jump(){
        this.isJumping = true
        this.gravityMultiplier = -12
        this.speedY = -8
        this.gravityMultiplier += this.gravity
        this.y += this.speedY + this.gravityMultiplier;
    }
}
