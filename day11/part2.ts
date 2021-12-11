import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const energyLevels = lines.map(line => line.split('').map(level => parseInt(level, 10)));

let flashCount = 0;

const energyIncrease = (x: number, y: number) => {
  if (x >= 0 && y >= 0 && x < 10 && y < 10) {
    energyLevels[x][y] += 1;

    if (energyLevels[x][y] === 10) {
      energyIncrease(x + 1, y);
      energyIncrease(x - 1, y);
      energyIncrease(x, y + 1);
      energyIncrease(x, y - 1);
      energyIncrease(x + 1, y + 1);
      energyIncrease(x + 1, y - 1);
      energyIncrease(x - 1, y - 1);
      energyIncrease(x - 1, y + 1);

      flashCount += 1;
    }
  }
};

for (let step = 0; ; step += 1) {
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      energyIncrease(x, y);
    }
  }

  let resetCount = 0;
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      if (energyLevels[x][y] > 9) {
        energyLevels[x][y] = 0;
        resetCount += 1;
      }
    }
  }

  if (resetCount === 100) {
    console.log(step + 1);
    process.exit(0);
  }
}
