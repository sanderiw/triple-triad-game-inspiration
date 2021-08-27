# Triple Triad Game Inspiration

![alt text](https://github.com/sanderiw/triple-triad-game-inspiration/blob/main/assets/img/finalfantasy_logo.png)

## Description

A game inspired by the original Triple Triad minigame from Final Fantasy VIII.

## Technologies used

- HTML
- CSS
- Pure Java Script

## Play it :)
https://sanderiw.github.io/triple-triad-game-inspiration/

## Rules, Logic and Pseudo Code

### Understanding the game

- Triple Triad Game is played on a 3x3 grid board.
- The game has a deck of cards
- Each card has 4 ranks (numbers) corresponding to each side of the card (top, right, botton and left). The ranks range from 1 to 9 and a letter A representing the number 10.
- The deck is shuffled and each player receives 5 cards
- Cards from player 1 are blue and cards from player 2 are red.
- The cards are visible to both players

### Flow of the game

- Each player puts a card on one of the 9 grids available on the board
- You can only place a card on an empty grid
- Player 1 will put his first card on the board. The card that is currently being placed on the grid is the current card and the cards that are already in the board are the placed cards
- The following sittuation happens in player 1's turn:
    - If the current card is placed on the grid and there is no adjacent card :
        - the card is placed on that grid and remains on that spot.
        - That grid is taken - not empty anymore
        - This card is removed from Player 1 Hands
        - Player One turn ends.
    - If the current card is placed on the grid and there is a placed card from the same color adjacent to it:
        - the card is placed on that grid and remains on that spot.
        - That grid is taken - is not empty anymore
        - This card is removed from Player 2 hands
        - Player One turn ends.
    - If the current card is placed on the grid and there is a placed card from a different color adjacent to it, the rank from each matching sides of the cards are compared:
        - If current card`s rank is higher:
            - The placed card will change its color
        - Else:
            - the card is placed on that grid and remains on that spot.
            - That grid is taken on the board - is not empty
            - Player One turn ends.

### Winning Condition

- When all grids are taken - meaning that Player One placed all of his cards and Player Two has one card on his hand

Player two always end up with one card on hand, since the board have 9 grids.

- How many blue cards and red cards are on the board and on the Player Two hand are counted.
- If the amount of blue cards are higher than the amount of red cards:
    - Player One wins
    - An Alert shows the victory of Player One
    - An option to restart the game is shown
- If amount of blue cards and red cards is the same:
    - The game is draw
    - An Alert shows Draw on the screen
    - An option to restart the game is shown
- If the amount of blue cards are fewer than the amount of red cards:
    - Player Two wins
    - An Alert shows the victory of Player Two
    - An option to restart the game is shown

## License
Triple triad and Final Fantasy VIII are Squaresoft Japan trademarks and I do not own any right to this game or brand. This project is only a tribute to the game

