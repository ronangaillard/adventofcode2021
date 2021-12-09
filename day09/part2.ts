import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const heightMap = lines.map(line => line.split('').map(x => parseInt(x, 10)));
const bassinMap = [...heightMap];

let bassinSizes = [] as number[];

const bassinSizeCount = (i: number, j: number): number => {
  if (bassinMap[i][j] == 9 || bassinMap[i][j] == -1) {
    return 0;
  }
  let size = 1;

  bassinMap[i][j] = -1;

  if (i > 0) {
    size += bassinSizeCount(i - 1, j);
  }

  if (j > 0) {
    size += bassinSizeCount(i, j - 1);
  }

  if (i < heightMap.length - 1) {
    size += bassinSizeCount(i + 1, j);
  }

  if (j < heightMap[i].length - 1) {
    size += bassinSizeCount(i, j + 1);
  }

  return size;
};

for (let i = 0; i < heightMap.length; i += 1) {
  for (let j = 0; j < heightMap[i].length; j += 1) {
    const bassinSize = bassinSizeCount(i, j);
    if (bassinSize > 0) {
      bassinSizes.push(bassinSize);
    }
  }
}

console.log(
  bassinSizes
    .sort((a, b) => {
      return b - a;
    })
    .slice(0, 3)
    .reduce((previous, current) => previous * current, 1)
);
