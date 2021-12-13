import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const [rawDots, instructions] = input.split('\n\n');

const dotsCoordinates = rawDots.split('\n').map(rd => rd.split(',').map(x => parseInt(x, 10)));

const maxX = Math.max(...dotsCoordinates.map(x => x[0])) + 1;
const maxY = Math.max(...dotsCoordinates.map(y => y[1])) + 1;

const dots = new Array(maxX).fill(undefined).map(line => new Array(maxY).fill(1)) as number[][];
dotsCoordinates.forEach(coordinate => {
  dots[coordinate[0]][coordinate[1]] = 0;
});

const firstInstruction = instructions.split('\n')[0];

const axis = firstInstruction[11];
const distance = parseInt(firstInstruction.split('=')[1], 10);

if (axis !== 'x' && axis !== 'y') {
  throw new Error('weird axis');
}

if (axis === 'x') {
  for (let i = distance + 1; i < maxX; i += 1) {
    for (let j = 0; j < maxY; j += 1) {
      if (dots[i][j] === 0) {
        dots[i][j] = 1;
        dots[distance - (i - distance)][j] = 0;
      }
    }
  }

  dots.length = distance;
}

let dotCount = 0;

dots.forEach(line =>
  line.forEach(dot => {
    if (dot === 0) {
      dotCount += 1;
    }
  })
);

console.log(dotCount);
