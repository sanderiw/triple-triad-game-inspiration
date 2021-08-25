const cardsDatabase = [
    {id: 0, rank: [9, 6, 7, 3], color: 'neutral', name: 'angelo'},
    {id: 1, rank: [10, 8, 2, 6], color: 'neutral', name: 'bahamut'},
    {id: 2, rank: [3, 6, 5, 7], color: 'neutral', name: 'behemoth'},
    {id: 3, rank: [1, 3, 3, 5], color: 'neutral', name: 'bitebug'},
    {id: 4, rank: [2, 3, 1, 5], color: 'neutral', name: 'blobra'},
    {id: 5, rank: [8, 4, 10, 4], color: 'neutral', name: 'carbuncle'},
    {id: 6, rank: [9, 4, 8, 4], color: 'neutral', name: 'chocobo'},
    {id: 7, rank: [4, 4, 8, 9], color: 'neutral', name: 'chubbychocobo'},
    {id: 8, rank: [5, 10, 8, 3], color: 'neutral', name: 'diablos'},
    {id: 9, rank: [10, 10, 3, 3], color: 'neutral', name: 'ultimecia'},
    {id: 10, rank: [5, 1, 1, 3], color: 'neutral', name: 'funguar'},
    {id: 11, rank: [2, 1, 4, 4], color: 'neutral', name: 'gayla'},
    {id: 12, rank: [1, 4, 1, 5], color: 'neutral', name: 'geezard'},
    {id: 13, rank: [3, 7, 9, 6], color: 'neutral', name: 'gilgamesh'},
    {id: 14, rank: [9, 6, 2, 8], color: 'neutral', name: 'ifrit'},
    {id: 15, rank: [6, 5, 6, 5], color: 'neutral', name: 'irongiant'},
    {id: 16, rank: [2, 6, 9, 10], color: 'neutral', name: 'irvine'},
    {id: 17, rank: [8, 8, 4, 4], color: 'neutral', name: 'jumbocactuar'},
    {id: 18, rank: [6, 7, 6, 10], color: 'neutral', name: 'kiros'},
    {id: 19, rank: [5, 10, 3, 9], color: 'neutral', name: 'laguna'}
];

class Card {
    
    constructor(card) {
        this.id = card.id;
        this.top = card.rank[0];
        this.right = card.rank[1];
        this.bottom = card.rank[2];
        this.left = card.rank[3];
        this.color = card.color;
        this.name = card.name;
        this.strength = this.top + this.right + this.bottom + this.left;
        this.blueCardImg = new Image();
        this.redCardImg = new Image();
    }

    copyCard() {
        const deconstructedCard = {id: this.id, rank: [this.top, this.right, this.bottom, this.left], color: this.color, name: this.name};
        return new Card(deconstructedCard);
    }

    generateImg() {
        const blueFileName = this.name + ".jpg"
        const redFileName = this.name + "-r.jpg"
        this.blueCardImg.src = "./assets/cards/" + blueFileName; 
        this.redCardImg.src = "./assets/cards/" + redFileName; 
    }

}

class Game {

    constructor(cardsDatabase) {
        const initialPointsOfEachPlayer = 5;
        this.cardsDatabase = cardsDatabase;
        this.board = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
        this.deck = [];
        this.player1Hands = [];
        this.player2Hands = [];
        this.player1Points = initialPointsOfEachPlayer;
        this.player2Points = initialPointsOfEachPlayer;
        this.currentCard = null;
        this.currentlyPlaying = "player 1";
        this.currentPosition = null;
        this.endOfGame = false;
    }

    createDeck() {
        this.deck = this.cardsDatabase.map((elem) => {
            const card = new Card(elem);
            card.generateImg();
            return card;
        })
    }
    
    shuffleCards() {
        if (this.deck) {
            let copyOfCards = [...this.deck];
            const shuffledCards = [];
            let lengthOfCards = this.deck.length;
            for (let i = 0; i < this.deck.length; i++) {
              const randomNumber = Math.floor(Math.random() * lengthOfCards);
              shuffledCards.push(copyOfCards[randomNumber]);
              lengthOfCards--;
              copyOfCards.splice(randomNumber, 1)
            }
            this.deck = [...shuffledCards];
          } else {
            return undefined;
          }
    }

    distributeCards() {
        const numberOfCards = 5;
        const player1Color = "blue";
        const player2Color = "red";
        const cardsToDistribute1 = this.deck.slice(0, numberOfCards);
        this.player1Hands = cardsToDistribute1.map(card => card.copyCard())
        this.player1Hands.forEach(elem => elem.color = player1Color);
        const cardsToDistribute2 = this.deck.slice(numberOfCards * -1);
        this.player2Hands = cardsToDistribute2.map(card => card.copyCard())
        this.player2Hands.forEach(elem => elem.color = player2Color);
    }
    
    checkAdjacentGrids(row, column) {
        // Check adjacent grids
        const adjacentGrids = [];
        const rowAndColumnIndex = [0, 1, 2];
        
        if (rowAndColumnIndex.includes(row - 1)) {
            adjacentGrids.push([row - 1, column]);
        }
        if (rowAndColumnIndex.includes(column + 1)) {
            adjacentGrids.push([row, column + 1]);
        }
        if (rowAndColumnIndex.includes(row + 1)) {
            adjacentGrids.push([row + 1, column]);
        }
        if (rowAndColumnIndex.includes(column - 1)) {
            adjacentGrids.push([row, column - 1]);
        }
        
        return adjacentGrids;
    }
    
    checkAdjacentCardsPosition(adjacentGrids) {
        const adjacentCardsPosition = [];
        adjacentGrids.forEach((elem) => {
            if (typeof this.board[elem[0]][elem[1]] !== "number") {
                adjacentCardsPosition.push([elem[0], elem[1]])
            }
        })
        return adjacentCardsPosition;
    }
    
    
    checkOppositeColors(adjacentCardsPosition) {
        // Check the colors of the cards
        const oppositeColorCardsPosition = [];
        adjacentCardsPosition.forEach((position) => {
            if(this.currentCard.color !== this.board[position[0]][position[1]].color) {
                oppositeColorCardsPosition.push([position[0], position[1]]);
            } 
        })
        //console.log(oppositeColorCardsPosition);
        return oppositeColorCardsPosition;
    }
    
    checkIfCurrentCardWins(currentCardPosition, placedCardPosition) {
        const placedCardRow = placedCardPosition[0];
        const placedCardColumn = placedCardPosition[1];
        
        const currentCardRow = currentCardPosition[0];
        const currentCardColumn = currentCardPosition[1];
        
        const placedCard = this.board[placedCardRow][placedCardColumn];
        const currentCard = this.board[currentCardRow][currentCardColumn];
        
        let points = null;
        let condition = null;
        
        if (currentCardRow > placedCardRow) {
            points = currentCard.top - placedCard.bottom;
        } else if (currentCardRow < placedCardRow) {
            points = currentCard.bottom - placedCard.top;
        } else if (currentCardColumn > placedCardColumn) {
            points = currentCard.left - placedCard.right;
        } else if (currentCardColumn < placedCardColumn) {
            points = currentCard.right - placedCard.left;
        }
        
        if (points > 0) {
            condition = true;
        } else {
            condition = false;
        }
        
        return condition;
        
    }
    
    changeColors(position) {
        //Change colors if the current cards rank is greater than the placed card
        if (this.currentCard.color === "blue") {
            this.board[position[0]][position[1]].color = "blue";
        } else {
            this.board[position[0]][position[1]].color = "red";
        }
    }
    
    compareMultipleCards() {
        //Check the matching sides ranks of the opposite side cards.
        const row = this.currentPosition[0];
        const column = this.currentPosition[1];
        
        const adjacentGrids = this.checkAdjacentGrids(row, column);
        const adjacentCardsPosition = this.checkAdjacentCardsPosition(adjacentGrids);
        const oppositeColorCardsPosition = this.checkOppositeColors(adjacentCardsPosition);
        
        oppositeColorCardsPosition.forEach((position) => {
            if (this.checkIfCurrentCardWins(this.currentPosition, position)) {
                this.changeColors(position);
                if (this.currentlyPlaying === "player 1") {
                    this.player1Points++;
                    this.player2Points--;
                } else {
                    this.player2Points++;
                    this.player1Points--;
                }
                console.log(position);
            }
        })
    }
    
    
    startGame() {
        this.createDeck();
        this.shuffleCards();
        this.distributeCards();
    }

    endMessage() {
        if (this.player1Points > this.player2Points) {
            alert("Player 1 Won");
        } else if (this.player1Points < this.player2Points) {
            alert("Player 2 Won");
        } else {
            alert("Draw");
        }
        alert(`Player One (Blue) has ${game.player1Points} points and Player Two (Red) has ${game.player2Points} points`);
        alert("End of the Game. Thanks for playing");
    }

    checkIfAllGridsTaken() {
        // Check if all grids are taken
        let counter = 0;
        this.board.forEach((row) => {
            row.forEach((elem) => {
                if (typeof elem === "number") {
                    counter++;
                }
            })
        })
        if (counter === 0) {    
            this.endOfGame = true;
        
        }
    }

    player1Turn() {
        const row = this.currentPosition[0];
        const column = this.currentPosition[1];
        let rowAndColumnIndex = [0, 1, 2];
        if (rowAndColumnIndex.includes(row) && rowAndColumnIndex.includes(column)) {
          if (typeof this.board[row][column] === "number") {
            if (this.player1Hands.includes(this.currentCard)) {
                this.board[row][column] = this.currentCard;
                this.player1Hands.splice(this.player1Hands.indexOf(this.currentCard), 1);
                this.compareMultipleCards();
                this.currentlyPlaying = "player 2";
            } else {
                alert("You don't have this card on your deck");
            }
        } else {
            alert("This grid is not empty");
        }  
        } else {
            alert("You must input a valid index");
        }
        this.currentCard = null;
        this.currentPosition = null;
    }
    
    player2Turn() {
        const row = this.currentPosition[0];
        const column = this.currentPosition[1];
        let rowAndColumnIndex = [0, 1, 2];
        if (rowAndColumnIndex.includes(row) && rowAndColumnIndex.includes(column)) {
          if (typeof this.board[row][column] === "number") {
            if (this.player2Hands.includes(this.currentCard)) {
                this.board[row][column] = this.currentCard;
                this.player2Hands.splice(this.player2Hands.indexOf(this.currentCard), 1);
                this.compareMultipleCards();
                this.currentlyPlaying = "player 1";
            } else {
                alert("You don't have this card on your deck");
            }
        } else {
            alert("This grid is not empty");
        }  
        } else {
            alert("You must input a valid index");
        }
        this.currentCard = null;
        this.currentPosition = null;
    }

    play(cardPosition, row, column) {
        if (this.currentlyPlaying === "player 1") {
            this.player1Turn();
        } else {
            this.player2Turn(cardPosition, row, column);
        }
    }

}