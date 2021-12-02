import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let x = 0;

let y = 0;

lines.forEach(line => {
  const [direction, distanceAsString] = line.split(' ');
  const distance = parseInt(distanceAsString, 10);

  if (direction === 'forward') {
    y += distance;
  }

  if (direction === 'down') {
    x += distance;
  }

  if (direction === 'up') {
    x -= distance;
  }
});

console.log(x * y);
