
var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "black", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 890;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);

            // The following series of crap code just detects if the player is pressing W
            // This is needed to limit how long the player can hold the W button
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
            if (e.keyCode === 87) {
                if (!myGameArea.wIsDown) {
                    myGameArea.wJustPressed = true;
                    myGameArea.wIsDown = true;
                }
            } else {
                myGameArea.keys[e.keyCode] = true;
            }
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
            if (e.keyCode === 87) {
                myGameArea.wIsDown = false;
            } else {
                myGameArea.keys[e.keyCode] = false;            
            }     
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;   
    this.gravity = 0.06;
    this.gravitySpeed = 0; 
    this.x = x;
    this.y = y;
    this.isGrounded = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();

        // Gravity cap, so the player doesnt fall down instantly
        if (this.gravitySpeed > 5) {
            this.gravitySpeed = 5;
        }
    }

    /* 
    This function compares the player's location against the ground.
    Important for the jump functionality. 
    */
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.isGrounded = true;
        } else {
        this.isGrounded = false;
        }
}
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    //w (wtf do u mean w)
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -1; }


    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    //d
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 1; }


    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    //w
   if (myGameArea.wJustPressed){
        if (myGamePiece.isGrounded){
            myGamePiece.gravitySpeed = -2; // gives a smol boost to jumping
            myGamePiece.speedY = -2;
            myGamePiece.isGrounded = false;
        }
        myGameArea.wJustPressed = false;
    }


    myGamePiece.newPos();    
    myGamePiece.update();
}


