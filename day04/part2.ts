import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const [firstLine, ...cards] = input.split('\n\n');

const pickedNumbers = firstLine.split(',');

const formattedCard = cards.map(card => card.split('\n').map(line => line.trim().split(/\ +/)));

enum BingoNumber {
  PICKED,
  NOT_PICKED,
}

const formattedPickedNumber: BingoNumber[][][] = formattedCard.map(card =>
  card.map(line => line.map(_ => BingoNumber.NOT_PICKED))
);

const computeSolution = ({
  cardIndex,
  lastCalledNumber,
}: {
  cardIndex: number;
  lastCalledNumber: number;
}) => {
  let sum = 0;
  for (let x = 0; x < formattedCard[0][0].length; x++) {
    for (let y = 0; y < formattedCard[0].length; y++) {
      if (formattedPickedNumber[cardIndex][y][x] === BingoNumber.NOT_PICKED) {
        sum += parseInt(formattedCard[cardIndex][y][x], 10);
      }
    }
  }
  console.log(lastCalledNumber * sum);
};

let lastUnsolvedCard = -1;

pickedNumbers.forEach(pickedNumber => {
  // Pour toutes les cartes on met à jour le statut de chaque numéro pour savoir s'il a été picked
  formattedCard.forEach((card, index) => {
    for (let x = 0; x < card[0].length; x++) {
      for (let y = 0; y < card.length; y++) {
        if (card[y][x] === pickedNumber) {
          formattedPickedNumber[index][y][x] = BingoNumber.PICKED;
        }
      }
    }
  });

  // On vérifie si toutes les cartes sauf une ont été résolues
  let numberOfSolvedCards = 0;

  formattedCard.forEach((card, index) => {
    // on check les lignes
    let atLeastOneLineSolved = false;
    for (let x = 0; x < card.length; x++) {
      for (let y = 0; y < card[0].length; y++) {
        if (formattedPickedNumber[index][y][x] === BingoNumber.NOT_PICKED) {
          break;
        }

        if (y === card[0].length - 1) {
          atLeastOneLineSolved = true;
        }
      }
    }

    // on check les colonnes
    let atLeastOneColumnSolved = false;
    for (let y = 0; y < card[0].length; y++) {
      for (let x = 0; x < card.length; x++) {
        if (formattedPickedNumber[index][y][x] === BingoNumber.NOT_PICKED) {
          break;
        }

        if (x === card.length - 1) {
          atLeastOneColumnSolved = true;
        }
      }
    }

    if (atLeastOneColumnSolved || atLeastOneLineSolved) {
      numberOfSolvedCards += 1;
    } else {
      lastUnsolvedCard = index;
    }
  });

  if (numberOfSolvedCards === formattedCard.length) {
    computeSolution({ cardIndex: lastUnsolvedCard, lastCalledNumber: parseInt(pickedNumber, 10) });
    process.exit();
  }
});
