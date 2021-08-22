let game = new Game(cardsDatabase);
game.playGame();
game.play(0, 0, 1); //blue card
game.play(0, 1, 0); //red card
game.play(0, 1, 2); //blue card
game.play(0, 2, 1); //red card
game.play(0, 1, 1); //blue card
let adjacentGrids = game.checkAdjacentGrids(1, 1);
let adjacentCardsPosition = game.returnCardsAdjacent(adjacentGrids);
console.log(game.checkOppositeColors(adjacentCardsPosition));





console.log(game.board);


