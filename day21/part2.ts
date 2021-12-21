import * as fs from 'fs';

let diceRollsProbability: Record<number, number> = {};

for (let i = 1; i < 4; i++) {
  for (let j = 1; j < 4; j++) {
    for (let k = 1; k < 4; k++) {
      diceRollsProbability[i + j + k] = (diceRollsProbability[i + j + k] ?? 0) + 1;
    }
  }
}

const playerWinCount = [0, 0];

const turn = (
  position: [number, number],
  score: [number, number],
  nextPlayer: number,
  proba: number
) => {
  Object.entries(diceRollsProbability).forEach(([roll, rollProba]) => {
    const newPosition = [...position] as [number, number];
    newPosition[nextPlayer] = ((newPosition[nextPlayer] + parseInt(roll, 10) - 1) % 10) + 1;

    const newScore = [...score] as [number, number];
    newScore[nextPlayer] += newPosition[nextPlayer];

    if (newScore[nextPlayer] >= 21) {
      playerWinCount[nextPlayer] += proba * rollProba;
    } else {
      const newNextPlayer = (nextPlayer + 1) % 2;
      turn(newPosition, newScore, newNextPlayer, proba * rollProba);
    }
  });
};

turn([10, 9], [0, 0], 0, 1);

console.log(Math.max(...playerWinCount));
