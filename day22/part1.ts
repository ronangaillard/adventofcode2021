import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const shrinkCoordinates = (minT: number, maxT: number) => {
  if (minT < -50 && maxT < -50) {
    return [-51, -51];
  }

  if (minT > 50 && maxT > 50) {
    return [51, 51];
  }

  return [Math.max(minT, -50), Math.min(maxT, 50)];
};

const cubes = new Array(101)
  .fill(undefined)
  .map(() => new Array(101).fill(undefined).map(() => new Array(101).fill(0))) as number[][][];

const set = (x: number, y: number, z: number, value: number) => {
  if (x < -50 || x > 50 || y < -50 || y > 50 || z < -50 || z > 50) {
    return;
  }

  cubes[x + 50][y + 50][z + 50] = value;
};

const lineRegex = new RegExp(
  '(on|off)\\sx=(-?\\d+)..(-?\\d+),y=(-?\\d+)..(-?\\d+),z=(-?\\d+)..(-?\\d+)'
);

for (let i = 0; i < lines.length; i++) {
  if (!lineRegex.test(lines[i])) {
    throw new Error('weird error ' + lines[i]);
  }

  const result = lineRegex.exec(lines[i]);

  const onOff = result![1];
  const x1 = parseInt(result![2], 10);
  const x2 = parseInt(result![3], 10);
  const y1 = parseInt(result![4], 10);
  const y2 = parseInt(result![5], 10);
  const z1 = parseInt(result![6], 10);
  const z2 = parseInt(result![7], 10);

  const _minX = Math.min(x1, x2);
  const _maxX = Math.max(x1, x2);
  const _minY = Math.min(y1, y2);
  const _maxY = Math.max(y1, y2);
  const _minZ = Math.min(z1, z2);
  const _maxZ = Math.max(z1, z2);

  const [minX, maxX] = shrinkCoordinates(_minX, _maxX);
  const [minY, maxY] = shrinkCoordinates(_minY, _maxY);
  const [minZ, maxZ] = shrinkCoordinates(_minZ, _maxZ);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        set(x, y, z, onOff === 'on' ? 1 : 0);
      }
    }
  }
}

let count = 0;

cubes.forEach(line => line.forEach(subline => subline.forEach(element => (count += element))));

console.log(count);
