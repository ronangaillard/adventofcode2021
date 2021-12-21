import * as fs from 'fs';

let playerPos = [10, 9];
let playerScore = [0, 0];

let nextDiceRoll = 1;

let nextPlayer = 0;

let diceRollCount = 0;

while (playerScore[0] < 1000 && playerScore[1] < 1000) {
  for (let i = 0; i < 3; i++) {
    playerPos[nextPlayer] = ((playerPos[nextPlayer] + nextDiceRoll - 1) % 10) + 1;
    nextDiceRoll = (nextDiceRoll % 100) + 1;
    diceRollCount++;
  }
  playerScore[nextPlayer] += playerPos[nextPlayer];
  nextPlayer = (nextPlayer + 1) % 2;
}

console.log((playerScore[0] >= 1000 ? playerScore[1] : playerScore[0]) * diceRollCount);
