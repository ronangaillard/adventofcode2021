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

pickedNumbers.forEach(pickedNumber => {
  formattedCard.forEach((card, index) => {
    // Pour toutes les cartes on met à jour le statut de chaque numéro pour savoir s'il a été picked
    for (let x = 0; x < card[0].length; x++) {
      for (let y = 0; y < card.length; y++) {
        if (card[y][x] === pickedNumber) {
          formattedPickedNumber[index][y][x] = BingoNumber.PICKED;
        }
      }
    }

    // Et on vérifie si on a une lige ou une colonne de complète sur chaque carte

    // on check les lignes
    for (let x = 0; x < card.length; x++) {
      for (let y = 0; y < card[0].length; y++) {
        if (formattedPickedNumber[index][y][x] === BingoNumber.NOT_PICKED) {
          break;
        }

        if (y === card[0].length - 1) {
          computeSolution({ cardIndex: index, lastCalledNumber: parseInt(pickedNumber, 10) });
          process.exit();
        }
      }
    }

    // on check les colonnes
    for (let y = 0; y < card[0].length; y++) {
      for (let x = 0; x < card.length; x++) {
        if (formattedPickedNumber[index][y][x] === BingoNumber.NOT_PICKED) {
          break;
        }

        if (x === card.length - 1) {
          computeSolution({ cardIndex: index, lastCalledNumber: parseInt(pickedNumber, 10) });
          process.exit();
        }
      }
    }
  });
});
