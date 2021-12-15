import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const riskMap = lines.map(line => line.split('').map(x => parseInt(x, 10)));

const lowestRiskMap = lines.map(line => line.split('').map(() => Infinity));
const validatedCoordinates = lines.map(line => line.split('').map(() => false));

let validatedCoordinatesCount = 0;

const getNextCoordinates = () => {
  let minRisk = Infinity;
  let minRiskCoordinates = [] as number[];

  for (let x = 0; x < lowestRiskMap.length; x++) {
    for (let y = 0; y < lowestRiskMap[0].length; y++) {
      if (!validatedCoordinates[x][y]) {
        if (minRisk > lowestRiskMap[x][y]) {
          minRisk = lowestRiskMap[x][y];
          minRiskCoordinates = [x, y];
        }
      }
    }
  }

  return minRiskCoordinates;
};

lowestRiskMap[0][0] = 0;
validatedCoordinates[0][0] = true;
validatedCoordinatesCount += 1;

lowestRiskMap[1][0] = riskMap[1][0];
lowestRiskMap[0][1] = riskMap[0][1];

while (validatedCoordinatesCount < riskMap.length * riskMap[0].length) {
  const nextCoordinates = getNextCoordinates();
  const posX = nextCoordinates[0];
  const posY = nextCoordinates[1];

  validatedCoordinates[posX][posY] = true;
  validatedCoordinatesCount += 1;

  if (posX > 0) {
    lowestRiskMap[posX - 1][posY] = Math.min(
      lowestRiskMap[posX - 1][posY],
      lowestRiskMap[posX][posY] + riskMap[posX - 1][posY]
    );
  }

  if (posY > 0) {
    lowestRiskMap[posX][posY - 1] = Math.min(
      lowestRiskMap[posX][posY - 1],
      lowestRiskMap[posX][posY] + riskMap[posX][posY - 1]
    );
  }

  if (posX < riskMap.length - 1) {
    lowestRiskMap[posX + 1][posY] = Math.min(
      lowestRiskMap[posX + 1][posY],
      lowestRiskMap[posX][posY] + riskMap[posX + 1][posY]
    );
  }

  if (posY < riskMap[0].length - 1) {
    lowestRiskMap[posX][posY + 1] = Math.min(
      lowestRiskMap[posX][posY + 1],
      lowestRiskMap[posX][posY] + riskMap[posX][posY + 1]
    );
  }
}
console.log(lowestRiskMap[lowestRiskMap.length - 1][lowestRiskMap[0].length - 1]);
