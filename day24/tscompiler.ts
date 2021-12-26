import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let lastPoppedInput = 0;

const run = (line: string) => {
  const operands = line.split(' ');

  if (operands[0] === 'inp') {
    if (lastPoppedInput !== 0) {
      console.log('return {w, x, y, x};\n}\n');
    }
    console.log(
      `const part${lastPoppedInput + 1} = (input: number, state: State): State | undefined => {`
    );

    console.log('let { w, x, y, z } = state;');
    console.log(`${operands[1]} = input;`);
    lastPoppedInput += 1;
  } else if (operands[0] === 'add') {
    console.log(`${operands[1]} = ${operands[1]} + ${operands[2]};`);
  } else if (operands[0] === 'mul') {
    console.log(`${operands[1]} = ${operands[1]} * ${operands[2]};`);
  } else if (operands[0] === 'div') {
    console.log(`if (${operands[2]} == 0) {return undefined;}`);
    console.log(`${operands[1]} = Math.floor(${operands[1]} / ${operands[2]});`);
  } else if (operands[0] === 'mod') {
    console.log(`if (${operands[1]} < 0) {return undefined;}`);
    console.log(`if (${operands[2]} <= 0) {return undefined;}`);
    console.log(`${operands[1]} = ${operands[1]} % ${operands[2]};`);
  } else if (operands[0] === 'eql') {
    console.log(`${operands[1]} = ${operands[1]} == ${operands[2]} ? 1 : 0;`);
  } else {
    console.log(`unknown operand ${operands[0]}`);
  }
};

for (let j = 0; j < lines.length; j++) {
  run(lines[j]);
}
