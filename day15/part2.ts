import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const riskMap = lines.map(line => line.split('').map(x => parseInt(x, 10)));

const riskMap25 = Array.from({ length: riskMap.length * 5 }, (_, y) =>
  Array.from(
    { length: riskMap[0].length * 5 },
    (_, x) =>
      ((riskMap[y % riskMap.length][x % riskMap[0].length] +
        Math.floor(y / riskMap.length) +
        Math.floor(x / riskMap[0].length) -
        1) %
        9) +
      1
  )
);

const lowestRiskMap = riskMap25.map(line => line.map(() => Infinity));
const validatedCoordinates = riskMap25.map(line => line.map(() => false));

let validatedCoordinatesCount = 0;

const getNextCoordinates = () => {
  let minRisk = Infinity;
  let minRiskCoordinates = [] as number[];

  for (let x = 0; x < riskMap25.length; x++) {
    for (let y = 0; y < riskMap25[0].length; y++) {
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

while (validatedCoordinatesCount < riskMap25.length * riskMap25[0].length) {
  const nextCoordinates = getNextCoordinates();
  const posX = nextCoordinates[0];
  const posY = nextCoordinates[1];

  process.stdout.write(
    `${
      Math.floor((validatedCoordinatesCount / (riskMap25.length * riskMap25[0].length)) * 1000) / 10
    }%\r`
  );

  validatedCoordinates[posX][posY] = true;
  validatedCoordinatesCount += 1;

  if (posX > 0) {
    lowestRiskMap[posX - 1][posY] = Math.min(
      lowestRiskMap[posX - 1][posY],
      lowestRiskMap[posX][posY] + riskMap25[posX - 1][posY]
    );
  }

  if (posY > 0) {
    lowestRiskMap[posX][posY - 1] = Math.min(
      lowestRiskMap[posX][posY - 1],
      lowestRiskMap[posX][posY] + riskMap25[posX][posY - 1]
    );
  }

  if (posX < riskMap25.length - 1) {
    lowestRiskMap[posX + 1][posY] = Math.min(
      lowestRiskMap[posX + 1][posY],
      lowestRiskMap[posX][posY] + riskMap25[posX + 1][posY]
    );
  }

  if (posY < riskMap25[0].length - 1) {
    lowestRiskMap[posX][posY + 1] = Math.min(
      lowestRiskMap[posX][posY + 1],
      lowestRiskMap[posX][posY] + riskMap25[posX][posY + 1]
    );
  }
}
console.log('');
console.log(lowestRiskMap[riskMap25.length - 1][riskMap25[0].length - 1]);
