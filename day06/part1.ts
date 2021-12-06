import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let lanternfishes = lines[0].split(',').map(fish => parseInt(fish, 10));

for (let day = 0; day < 80; day += 1) {
  let newlanternfishes = [] as number[];

  lanternfishes = lanternfishes.map(fish => {
    if (fish > 0) {
      return fish - 1;
    } else {
      newlanternfishes.push(8);
      return 6;
    }
  });

  lanternfishes = [...lanternfishes, ...newlanternfishes];
}

console.log(lanternfishes.length);
