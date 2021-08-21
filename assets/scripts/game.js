const cardsDatabase = [
    {id: 0, rank: [9, 6, 5, 1], color: 'neutral', name: 'squall'},
    {id: 1, rank: [1, 5, 1, 5], color: 'neutral', name: 'ifrit'},
    {id: 2, rank: [2, 4, 5, 10], color: 'neutral', name: 'shiva'},
    {id: 3, rank: [2, 4, 8, 9], color: 'neutral', name: 'rinoa'},
    {id: 4, rank: [1, 3, 6, 7], color: 'neutral', name: 'ultimecia'},
    {id: 5, rank: [8, 2, 3, 8], color: 'neutral', name: 'zell'},
    {id: 6, rank: [10, 7, 6, 9], color: 'neutral', name: 'quezacoatl'},
    {id: 7, rank: [9, 3, 4, 6], color: 'neutral', name: 'diablo'},
    {id: 8, rank: [9, 3, 4, 6], color: 'neutral', name: 'selphie'},
    {id: 9, rank: [9, 3, 4, 6], color: 'neutral', name: 'fujin'},
    {id: 10, rank: [8, 7, 6, 2], color: 'neutral', name: 'seifer'},
    {id: 11, rank: [9, 6, 5, 1], color: 'neutral', name: 'quistis'},
    {id: 12, rank: [1, 5, 1, 5], color: 'neutral', name: 'irvine'},
    {id: 13, rank: [2, 4, 5, 10], color: 'neutral', name: 'siren'},
    {id: 14, rank: [2, 4, 8, 9], color: 'neutral', name: 'bomb'},
    {id: 15, rank: [1, 3, 6, 7], color: 'neutral', name: 'raijin'},
    {id: 16, rank: [8, 2, 3, 8], color: 'neutral', name: 'cartenpilar'},
    {id: 17, rank: [10, 7, 6, 9], color: 'neutral', name: 'laguna'},
    {id: 18, rank: [9, 1, 2, 6], color: 'neutral', name: 'cid'},
    {id: 19, rank: [9, 3, 4, 6], color: 'neutral', name: 'kiros'}
];

class Card {
    constructor(card) {
        this.id = card.id;
        this.top = card.rank[0];
        this.rigth = card.rank[1];
        this.bottom = card.rank[2];
        this.left = card.rank[3];
        this.color = card.color;
        this.name = card.name;
        this.strength = this.top + this.rigth + this.bottom + this.left;
    }

    copyCard() {
        const deconstructedCard = {id: this.id, rank: [this.top, this.rigth, this.bottom, this.left], color: this.color, name: this.name};
        return new Card(deconstructedCard);
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
    }

    createDeck() {
        this.deck = this.cardsDatabase.map(elem => new Card(elem));
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

    startGame() {
        this.createDeck();
        this.shuffleCards();
        this.distributeCards();
    }

    player1move(card, row, column) {
        if (typeof this.board[row][column] === "number") {
            if (this.player1Hands.includes(card)) {
                this.board[row][column] = card
                this.player1Hands.splice(this.player1Hands.indexOf(card), 1);
            } else {
                console.log("You don't have this card on your deck");
                return;
            }
            
        } else {
            console.log("This grid is not empty");
            return;
        }
        
    }

    player2move(card, row, column) {
        if (typeof this.board[row][column] === "number") {
            if (this.player2Hands.includes(card)) {
                this.board[row][column] = card
                this.player2Hands.splice(this.player2Hands.indexOf(card), 1);
            } else {
                console.log("You don't have this card on your deck");
                return;
            }
            
        } else {
            console.log("This grid is not empty");
            return;
        }
        
    }

    checkColors() {
        // Check the colors of the cards
    }

    checkAdjacent() {
        // Check if cards are adjacent
    }

    checkRanks() {

    }

    changeColors() {
        //Change colors if the current cards rank is greater than the placed card
    }

    checkIfAllGridsTaken() {
        // Check if all grids are taken
    }

    play() {
        // A for loop or do while loop until a condition is met: All nine grids taken
    }

}

// Creating an array of cards from the card class

let game = new Game(cardsDatabase);
game.startGame()
console.log(game.deck);
game.player1move(game.player1Hands[1], 0, 0);
console.log(game.board);
game.player1move(game.player1Hands[0], 1, 0);
console.log(game.board);



