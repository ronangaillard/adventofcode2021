import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let oxygenGenerator = lines;

for (let i = 0; oxygenGenerator.length > 1; i += 1) {
  const bitCounter = oxygenGenerator.filter(line => line[i] === '1').length;
  const mostCommonBit = bitCounter >= oxygenGenerator.length / 2 ? '1' : '0';
  oxygenGenerator = oxygenGenerator.filter(line => line[i] === mostCommonBit);
}

let co2scubber = lines;

for (let i = 0; co2scubber.length > 1; i += 1) {
  const bitCounter = co2scubber.filter(line => line[i] === '1').length;
  const leastCommonBit = bitCounter >= co2scubber.length / 2 ? '0' : '1';
  co2scubber = co2scubber.filter(line => line[i] === leastCommonBit);
}

console.log(parseInt(co2scubber[0], 2) * parseInt(oxygenGenerator[0], 2));
