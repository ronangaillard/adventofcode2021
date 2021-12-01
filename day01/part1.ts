import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const linesAsNumber = lines.map(line => parseInt(line, 10));

let increases = 0;

linesAsNumber.forEach((line, index) => {
  if (linesAsNumber[index - 1] < line) {
    increases += 1;
  }
});

console.log(increases);
