import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let x = 0;

let y = 0;

let aim = 0;

lines.forEach(line => {
  const [direction, distanceAsString] = line.split(' ');
  const distance = parseInt(distanceAsString, 10);

  if (direction === 'forward') {
    y += distance;
    x += aim * distance;
  }

  if (direction === 'down') {
    aim += distance;
  }

  if (direction === 'up') {
    aim -= distance;
  }
});

console.log(x * y);
