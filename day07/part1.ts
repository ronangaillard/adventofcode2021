import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const originalPositions = lines[0].split(',').map(position => parseInt(position, 10));

const size = Math.max(...originalPositions);

let minFuel = size * size;

for (let i = 0; i <= size; i += 1) {
  let fuel = 0;

  for (let j = 0; j < originalPositions.length; j += 1) {
    fuel += Math.abs(originalPositions[j] - i);
  }

  if (fuel < minFuel) {
    minFuel = fuel;
  }
}

console.log(minFuel);
