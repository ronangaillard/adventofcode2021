import * as fs from 'fs';

type State = {
  w: number;
  x: number;
  y: number;
  z: number;
};

// each part of the algorithm is split in functions (there are 14 of them)
const part1 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 13;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 13;
  y = y * x;
  z = z + y;
  return z;
};

const part2 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 11;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 10;
  y = y * x;
  z = z + y;
  return z;
};

const part3 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 15;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 5;
  y = y * x;
  z = z + y;
  return z;
};

const part4 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -11;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 14;
  y = y * x;
  z = z + y;
  return z;
};

const part5 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 14;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 5;
  y = y * x;
  z = z + y;
  return z;
};

const part6 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + 0;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 15;
  y = y * x;
  z = z + y;
  return z;
};

const part7 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 12;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 4;
  y = y * x;
  z = z + y;
  return z;
};

const part8 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 12;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 11;
  y = y * x;
  z = z + y;
  return z;
};

const part9 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 1);
  x = x + 14;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 1;
  y = y * x;
  z = z + y;
  return z;
};

const part10 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -6;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 15;
  y = y * x;
  z = z + y;
  return z;
};

const part11 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -10;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 12;
  y = y * x;
  z = z + y;
  return z;
};

const part12 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -12;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 8;
  y = y * x;
  z = z + y;
  return z;
};

const part13 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -3;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 14;
  y = y * x;
  z = z + y;
  return z;
};

const part14 = (input: number, lastZ: number): number | undefined => {
  let x = 0;
  let y = 0;
  let z = lastZ;
  let w = input;
  x = x * 0;
  x = x + z;
  if (x < 0) {
    return undefined;
  }
  if (26 <= 0) {
    return undefined;
  }
  x = x % 26;
  z = Math.floor(z / 26);
  x = x + -5;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y = y * 0;
  y = y + 25;
  y = y * x;
  y = y + 1;
  z = z * y;
  y = y * 0;
  y = y + w;
  y = y + 9;
  y = y * x;
  z = z + y;

  return z;
};

const parts = [
  part1,
  part2,
  part3,
  part4,
  part5,
  part6,
  part7,
  part8,
  part9,
  part10,
  part11,
  part12,
  part13,
  part14,
];

type History = number[];

// steps map a z value to a history of input
let steps = new Map<number, History>();

// init steps
for (let input = 1; input <= 9; input++) {
  const z = part1(input, 0);

  if (z !== undefined) {
    steps.set(z, [input]);
  }
}

for (let i = 1; i < 14; i++) {
  console.log(i, steps.size);

  let newSteps = new Map<number, History>();
  steps.forEach((history: History, lastZ: number) => {
    for (let input = 1; input <= 9; input++) {
      const newZ = parts[i](input, lastZ);

      if (newZ != undefined) {
        // there is another save step that has the same state
        // we keep the one with the highest history
        if (newSteps.has(newZ)) {
          const newHistory = [...history, input];

          for (let l = 0; l < newHistory.length; l++) {
            if (newHistory[l] < newSteps.get(newZ)![l]) {
              newSteps.set(newZ, newHistory);
              continue;
            } else if (newHistory[l] > newSteps.get(newZ)![l]) {
              continue;
            }
          }

          continue;
        } else {
          newSteps.set(newZ, [...history, input]);
        }
      }
    }
  });

  steps = newSteps;
}

console.log(steps.get(0)?.join(''));
