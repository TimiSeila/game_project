import {fetchCutsceneById} from "./api.js"

const id = new URLSearchParams(window.location.search).get("id");

const data = await fetchCutsceneById(id)

console.log(id)
/*
for (let kuva of data.shots) {
    //document.body.style.background = `url('${data.shots[kuva].image}')`;
    document.body.style.backgroundColor = "blue"
    prompt("Press Enter to continue...");
}
*/
let current = 0;

function showBackground() {
    document.body.style.background = `url('${data.shots[current].image}')`;
    //document.body.style.backgroundColor = "blue"
    
}

showBackground();

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        current++;

        if (current < backgrounds.length) {
            showBackground();
        }
    }
});