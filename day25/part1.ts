import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let seaMap = lines.map(line => line.split(''));

const move = () => {
  let altered = false;
  let alteredMap = seaMap.map(line => line.map(x => false));

  for (let y = 0; y < seaMap.length; y++) {
    for (let x = 0; x < seaMap[0].length; x++) {
      // east
      if (seaMap[y][x] === '>' && !alteredMap[y][x]) {
        if (x === seaMap[0].length - 1) {
          if (seaMap[y][0] === '.' && !(seaMap[y][1] === '>' && alteredMap[y][1])) {
            seaMap[y][0] = '>';
            alteredMap[y][0] = true;
            seaMap[y][x] = '.';
            altered = true;
          }
        } else {
          if (seaMap[y][x + 1] === '.') {
            seaMap[y][x + 1] = '>';
            alteredMap[y][x + 1] = true;
            seaMap[y][x] = '.';
            x++;
            altered = true;
          }
        }
      }
    }
  }
  alteredMap = seaMap.map(line => line.map(x => false));

  for (let y = 0; y < seaMap.length; y++) {
    for (let x = 0; x < seaMap[0].length; x++) {
      //south
      if (seaMap[y][x] === 'v' && !alteredMap[y][x]) {
        if (y === seaMap.length - 1) {
          if (seaMap[0][x] == '.' && !(seaMap[1][x] === 'v' && alteredMap[1][x])) {
            seaMap[0][x] = 'v';
            alteredMap[0][x] = true;
            seaMap[y][x] = '.';
            altered = true;
          }
        } else {
          if (seaMap[y + 1][x] === '.') {
            seaMap[y + 1][x] = 'v';
            seaMap[y][x] = '.';
            alteredMap[y + 1][x] = true;

            altered = true;
          }
        }
      }
    }
  }
  return altered;
};

const printMap = () => {
  for (let y = 0; y < seaMap.length; y++) {
    for (let x = 0; x < seaMap[0].length; x++) {
      process.stdout.write(seaMap[y][x]);
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
};

let i = 1;

while (move()) {
  i++;
}

console.log(i);
