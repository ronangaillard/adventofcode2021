import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const heightMap = lines.map(line => line.split('').map(x => parseInt(x, 10)));

let riskSum = 0;

for (let i = 0; i < heightMap.length; i += 1) {
  for (let j = 0; j < heightMap[i].length; j += 1) {
    let minAdjacent = 9;

    if (i > 0) {
      minAdjacent = Math.min(minAdjacent, heightMap[i - 1][j]);
    }

    if (j > 0) {
      minAdjacent = Math.min(minAdjacent, heightMap[i][j - 1]);
    }

    if (i < heightMap.length - 1) {
      minAdjacent = Math.min(minAdjacent, heightMap[i + 1][j]);
    }

    if (j < heightMap[i].length - 1) {
      minAdjacent = Math.min(minAdjacent, heightMap[i][j + 1]);
    }

    if (minAdjacent > heightMap[i][j]) {
      riskSum += heightMap[i][j] + 1;
    }
  }
}

console.log(riskSum);
