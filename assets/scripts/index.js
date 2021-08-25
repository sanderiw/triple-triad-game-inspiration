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

const audio = new Audio("./assets/audio/game_audio.mp3");
const audio_victory = new Audio("./assets/audio/victory_audio.mp3");

let currentElement = null;
const player1Hands = document.getElementById("player1-hands").children;
const player2Hands = document.getElementById("player2-hands").children;
const mainBoard = document.getElementById("main-board");

const player1PointsElement = document.getElementById("score1");
const player2PointsElement = document.getElementById("score2");
const currentTurnElement = document.getElementById("turn")


window.addEventListener("click", () => {
    audio.play();
})


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
player1Cards.forEach((card) => {
    card.addEventListener("click", (event) => {
        if (game.currentlyPlaying === "player 1") {
            currentElement = event.currentTarget;
            const name = currentElement.lastElementChild.innerText;
            game.currentCard = game.player1Hands.find((elem) => elem.name === name);
            
        } else {
            alert("Player 2 turn - You cannot select Player 1 cards")
        }
    })
})

const player2Cards = document.querySelectorAll(".player2-hands-cards")
player2Cards.forEach((card) => {
    card.addEventListener("click", (event) => {
        if (game.currentlyPlaying === "player 2") {
            currentElement = event.currentTarget;
            const name = currentElement.lastElementChild.innerText;
            game.currentCard = game.player2Hands.find((elem) => elem.name === name);
            
        } else {
            alert("Player 1 turn - You cannot select Player 2 cards");
        }
    })
})

const boardTiles = document.querySelectorAll(".tile");
boardTiles.forEach((tile, index) => {
    tile.addEventListener('click', (elem) => {
        
        if (game.currentCard) {
            const html = 
            `<p id="top" class="text-end me-2 my-0">${game.currentCard.top}</p>
             <p class="text-end my-0"><span id="left" class="me-1">${game.currentCard.left}</span> <span id="right">${game.currentCard.right}</span></p>
             <p id="bottom" class="text-end me-2 my-0">${game.currentCard.bottom}</p>
             <p id="card-name" class="card-name mt-3">${game.currentCard.name}</p>`       
        
            let id = parseInt(elem.currentTarget.getAttribute("id"));
           
            game.board.forEach((arr, index) => {
                if (arr.indexOf(id) !== -1) {
                    const row = index;
                    const column = arr.indexOf(id);
                    game.currentPosition = [row, column]
                }
            })
            
            if (game.currentPosition) {
                if (game.currentCard.color === "blue") {
                    elem.currentTarget.classList.add("color-blue");
                    elem.currentTarget.classList.remove("color-red");
                } else if (game.currentCard.color === "red") {
                    elem.currentTarget.classList.add("color-red");
                    elem.currentTarget.classList.remove("color-blue");
                }
                
                currentElement.parentNode.removeChild(currentElement);
                elem.currentTarget.innerHTML = html;

                currentElement = null;
                
                game.play();

                game.board.forEach((arr, row) => {
                    arr.forEach((card, column) => {
                        if (typeof card !== "number") {
                            //console.log(card, row, column);
                            if (card.color === "blue") {
                                //elem.currentTarget.classList.remove("color-red");
                                //elem.currentTarget.classList.add("color-blue");
                                //console.log(card.color)
                                let id2 = 3 * row + column;
                                document.getElementById(id2).classList.add("color-blue");
                                document.getElementById(id2).classList.remove("color-red");


                            } else if (card.color === "red") {
                                //elem.currentTarget.classList.remove("color-blue");
                                //elem.currentTarget.classList.add("color-red");
                                //console.log(card.color)
                                //console.log(row*3 + column);
                                let id2 = 3 * row + column;
                                document.getElementById(id2).classList.add("color-red");
                                document.getElementById(id2).classList.remove("color-blue");


                            }
                        }
                    })
                })

                //Update info bar
                player1PointsElement.innerText = game.player1Points;
                player2PointsElement.innerText = game.player2Points;
                

                let turnText = "";
                if (game.currentlyPlaying === "player 2") {
                    turnText = "P2 Turn"
                    currentTurnElement.parentElement.classList.toggle("color-red");
                    currentTurnElement.parentElement.classList.toggle("color-blue");
                } else if (game.currentlyPlaying === "player 1") {
                    turnText = "P1 Turn"
                    currentTurnElement.parentElement.classList.toggle("color-blue");
                    currentTurnElement.parentElement.classList.toggle("color-red");
                }
                
                currentTurnElement.innerText = turnText;


                game.checkIfAllGridsTaken();
                if (game.endOfGame) {
                    audio_victory.play();
                    
                    //audio.currentTime = 0;
                    //audio_victory.play();
                    
                }
                setTimeout(() => {
                    if (game.endOfGame) {
                        audio.pause();
                        game.endMessage();  
                    }
                }, 200);
                 
            } else {
                alert("Place the card on a empty grid")
            }

        } else {
            alert("Please select a card");
        }        
    })
})
