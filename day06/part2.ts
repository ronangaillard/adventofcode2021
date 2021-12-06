import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let data = lines[0].split(',').map(fish => parseInt(fish, 10));

let lanternfishes = [0, 0, 0, 0, 0, 0, 0, 0, 0] as number[];

data.forEach(age => {
  lanternfishes[age] += 1;
});

for (let day = 0; day < 256; day += 1) {
  let newlanternfishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  lanternfishes.forEach((fishnumber, age) => {
    if (age == 0) {
      newlanternfishes[8] = fishnumber;
      newlanternfishes[6] += fishnumber;
    } else {
      newlanternfishes[age - 1] += fishnumber;
    }
  });

  lanternfishes = [...newlanternfishes];
}

console.log(lanternfishes.reduce((sum, current) => sum + current, 0));
