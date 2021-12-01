import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const linesAsNumber = lines.map(line => parseInt(line, 10));

let increases = 0;

linesAsNumber.forEach((line, index) => {
  if (index >= 3) {
    const previousSum =
      linesAsNumber[index - 1] + linesAsNumber[index - 2] + linesAsNumber[index - 3];
    const sum = linesAsNumber[index] + linesAsNumber[index - 1] + linesAsNumber[index - 2];
    if (previousSum < sum) {
      increases += 1;
    }
  }
});

console.log(increases);
