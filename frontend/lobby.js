const player_sprite_1 = document.getElementById("player-sprite-1");
const player_sprite_2 = document.getElementById("player-sprite-2");

const player_container_1 = document.getElementById("player-container-1")
const player_container_2 = document.getElementById("player-container-2")

const ready_text_1 = document.getElementById("ready-text-1")
const ready_text_2 = document.getElementById("ready-text-2")

let player_1_ready = false
let player_2_ready = false
let game_loading = false

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW"){
        player_container_1.className = "player-container-dark"
        player_sprite_1.hidden = false
        ready_text_1.hidden = true
        player_1_ready = true
    }

    if (e.code == "ArrowUp"){
        player_container_2.className = "player-container-light"
        player_sprite_2.hidden = false
        ready_text_2.hidden = true
        player_2_ready = true
    }

    if (player_1_ready && player_2_ready && !game_loading){
        startLoadingGame()
    }
})

const startLoadingGame = () => {
    game_loading = true
    const countdown_timer = document.createElement("p")
    countdown_timer.style.position = "absolute"
    countdown_timer.style.left = `${window.innerWidth / 2}px`
    countdown_timer.style.top = `${window.innerHeight / 2}px`
    countdown_timer.style.fontSize = "20vw"
    countdown_timer.style.transform = "translate(-50%, -50%)";
    countdown_timer.style.color = "grey"
    document.body.appendChild(countdown_timer)

    let i = 3;
    countdown_timer.innerText = i;

    const timer = setInterval(() => {
        i--;
        countdown_timer.innerText = i;

        if (i <= 0) {
            countdown_timer.hidden = true
            window.location.href = "./game.html"
            clearInterval(timer);
        }
    }, 1000);
}
