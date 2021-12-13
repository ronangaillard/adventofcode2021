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

const instructionList = instructions.split('\n');

for (
  let instructionNumber = 0;
  instructionNumber < instructionList.length;
  instructionNumber += 1
) {
  const instruction = instructionList[instructionNumber];

  const axis = instruction[11];
  const distance = parseInt(instruction.split('=')[1], 10);

  if (axis !== 'x' && axis !== 'y') {
    throw new Error('weird axis');
  }

  if (axis === 'x') {
    for (let i = distance + 1; i < dots.length; i += 1) {
      for (let j = 0; j < dots[0].length; j += 1) {
        if (dots[i][j] === 0) {
          dots[i][j] = 1;
          dots[distance - (i - distance)][j] = 0;
        }
      }
    }

    dots.length = distance;
  }

  if (axis === 'y') {
    for (let i = distance + 1; i < dots[0].length; i += 1) {
      for (let j = 0; j < dots.length; j += 1) {
        if (dots[j][i] === 0) {
          dots[j][i] = 1;
          dots[j][distance - (i - distance)] = 0;
        }
      }
    }

    dots.forEach(line => (line.length = distance));
  }
}

for (let y = 0; y < dots[0].length; y += 1) {
  for (let x = 0; x < dots.length; x += 1) {
    dots[x][y] === 0 ? process.stdout.write('#') : process.stdout.write(' ');
  }

  process.stdout.write('\n');
}
