import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const inputs = [] as string[];
const outputs = [] as string[];

lines.forEach(line => {
  const Xput = line.split(' | ');
  inputs.push(Xput[0]);
  outputs.push(Xput[1]);
});

let easyDigitsCount = 0;

outputs.forEach(output => {
  const digits = output.split(' ');
  digits.forEach(digit => {
    if (digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7) {
      easyDigitsCount += 1;
    }
  });
});

console.log(easyDigitsCount);
