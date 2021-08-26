const audio = new Audio("./assets/audio/finalfantasy_prelude.mp3")


window.addEventListener("click", () => {
    audio.play();
})

const here = document.getElementById("here");
const button = document.getElementById("button");
const text = document.getElementById("text");
const start = document.getElementById("button")

here.addEventListener("click", () => {
    here.classList.add("none");
    button.classList.remove("none");
    text.classList.remove("none");
    
})


