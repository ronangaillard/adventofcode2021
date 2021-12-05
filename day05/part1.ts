import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

let maxX = 0;
let maxY = 0;

lines.forEach(line => {
  const points = line.split(' -> ');
  const x1 = parseInt(points[0].split(',')[0], 10);
  const y1 = parseInt(points[0].split(',')[1], 10);
  const x2 = parseInt(points[1].split(',')[0], 10);
  const y2 = parseInt(points[1].split(',')[1], 10);

  if (x1 > maxX) {
    maxX = x1;
  }

  if (x2 > maxX) {
    maxX = x2;
  }

  if (y1 > maxY) {
    maxY = y1;
  }

  if (y2 > maxY) {
    maxY = y2;
  }
});

maxX += 1;
maxY += 1;

let cloudMap: number[][] = new Array<Array<number>>(maxX);

for (let x = 0; x < maxX; x += 1) {
  cloudMap[x] = new Array<number>(maxY).fill(0);
}

lines.forEach(line => {
  const points = line.split(' -> ');
  const x1 = parseInt(points[0].split(',')[0], 10);
  const y1 = parseInt(points[0].split(',')[1], 10);
  const x2 = parseInt(points[1].split(',')[0], 10);
  const y2 = parseInt(points[1].split(',')[1], 10);

  if (x1 === x2 || y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x += 1) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y += 1) {
        cloudMap[x][y] += 1;
      }
    }
  }
});

let overlapCount = 0;

cloudMap.forEach(line => {
  line.forEach(point => {
    if (point >= 2) {
      overlapCount += 1;
    }
  });
});

console.log(overlapCount);
