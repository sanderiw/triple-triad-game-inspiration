const game = new Game(cardsDatabase);
game.startGame();
// game.play(0, 0, 0); //blue card 1
// game.play(0, 1, 0); //red card 2
// game.play(0, 0, 2); //blue card 3
// game.play(0, 1, 2); //red card 4
// game.play(0, 2, 0); //blue card 5
// game.play(0, 2, 1); //red card 6
// game.play(0, 2, 2); //blue card 7
// game.play(0, 0, 1); //red card 8
// game.play(0, 1, 1); //blue card 9



const player1Hands = document.getElementById("player1-hands").children;
const player2Hands = document.getElementById("player2-hands").children;
const mainBoard = document.getElementById("main-board");
let counter = 0

for (let i = 0; i < player1Hands.length; i++) {
    const html1 = 
    `<p id="top" card-position=${i} class="text-end me-2 my-0">${game.player1Hands[i].top}</p>
     <p class="text-end my-0"><span id="left" class="me-1">${game.player1Hands[i].left}</span> <span id="right">${game.player1Hands[i].right}</span></p>
     <p id="bottom" class="text-end me-2 my-0">${game.player1Hands[i].bottom}</p>
     <p id="card-name" class="card-name mt-3">${game.player1Hands[i].name}</p>`

     const html2 = 
    `<p id="top" class="text-end me-2 my-0">${game.player2Hands[i].top}</p>
     <p class="text-end my-0"><span id="left" class="me-1">${game.player2Hands[i].left}</span> <span id="right">${game.player2Hands[i].right}</span></p>
     <p id="bottom" class="text-end me-2 my-0">${game.player2Hands[i].bottom}</p>
     <p id="card-name" class="card-name mt-3">${game.player2Hands[i].name}</p>`
    
     player1Hands[i].innerHTML = html1;
     player2Hands[i].innerHTML = html2
}

const player1Cards = document.querySelectorAll(".player1-hands-cards")
player1Cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        game.currentCard = game.player1Hands[index];
    })
})

const player2Cards = document.querySelectorAll(".player2-hands-cards")
player2Cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        game.currentCard = game.player2Hands[index];
    })
})


mainBoard.addEventListener("click", (elem) => {
    const html = 
    `<p id="top" class="text-end me-2 my-0">${game.currentCard.top}</p>
     <p class="text-end my-0"><span id="left" class="me-1">${game.currentCard.left}</span> <span id="right">${game.currentCard.right}</span></p>
     <p id="bottom" class="text-end me-2 my-0">${game.currentCard.bottom}</p>
     <p id="card-name" class="card-name mt-3">${game.currentCard.name}</p>`
    elem.target.innerHTML = html;
    console.log(elem.target);
})
