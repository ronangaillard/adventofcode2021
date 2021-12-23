import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

type Cube = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  on: boolean;
};

let onCount = 0;

let cubes = [] as Cube[];

const lineRegex = new RegExp(
  '(on|off)\\sx=(-?\\d+)..(-?\\d+),y=(-?\\d+)..(-?\\d+),z=(-?\\d+)..(-?\\d+)'
);

// compute the intersection btw two cubes
const intersect = (cube1: Cube, cube2: Cube): Cube | undefined => {
  // if no intersection btw cubes return 0
  if (
    !(
      ((cube1.minX <= cube2.minX && cube2.minX <= cube1.maxX) ||
        (cube2.minX <= cube1.minX && cube1.minX <= cube2.maxX)) &&
      ((cube1.minY <= cube2.minY && cube2.minY <= cube1.maxY) ||
        (cube2.minY <= cube1.minY && cube1.minY <= cube2.maxY)) &&
      ((cube1.minZ <= cube2.minZ && cube2.minZ <= cube1.maxZ) ||
        (cube2.minZ <= cube1.minZ && cube1.minZ <= cube2.maxZ))
    )
  ) {
    return undefined;
  }

  // coordinates of intersection
  let x1 = Math.max(cube1.minX, cube2.minX);
  let x2 = Math.min(cube1.maxX, cube2.maxX);
  let y1 = Math.max(cube1.minY, cube2.minY);
  let y2 = Math.min(cube1.maxY, cube2.maxY);
  let z1 = Math.max(cube1.minZ, cube2.minZ);
  let z2 = Math.min(cube1.maxZ, cube2.maxZ);

  return {
    minX: x1,
    maxX: x2,
    minY: y1,
    maxY: y2,
    minZ: z1,
    maxZ: z2,
    on: false,
  };
};

const addCube = (newCube: Cube) => {
  const newCubes = [] as Cube[];

  for (let i = 0; i < cubes.length; i++) {
    // if the two cubes intersect we do not count twice the intersection volume
    if (cubes[i].on) {
      const intersection = intersect(newCube, cubes[i]);
      // explode after intersection
      if (intersection) {
        // we create 26 cubes that split cubes[i] into smaller parts without the intersection

        const explosion = [] as Cube[];

        // cube 1
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 2
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 3
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 4
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 5
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 6
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 7
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 8
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 9
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: cubes[i].minZ,
          maxZ: intersection.minZ,
          on: true,
        });

        // cube 10
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 11
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 12
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 13
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 14
        // this one is the intersection

        // cube 15
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 16
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 17
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 18
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.minZ,
          maxZ: intersection.maxZ,
          on: true,
        });

        // cube 19
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 20
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 21
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: cubes[i].minY,
          maxY: intersection.minY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 22
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 23
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 24
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.minY,
          maxY: intersection.maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 25
        explosion.push({
          minX: cubes[i].minX,
          maxX: intersection.minX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 26
        explosion.push({
          minX: intersection.minX,
          maxX: intersection.maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        // cube 27
        explosion.push({
          minX: intersection.maxX,
          maxX: cubes[i].maxX,
          minY: intersection.maxY,
          maxY: cubes[i].maxY,
          minZ: intersection.maxZ,
          maxZ: cubes[i].maxZ,
          on: true,
        });

        newCubes.push(
          ...explosion.filter(
            cube => cube.minX !== cube.maxX && cube.minY !== cube.maxY && cube.minZ !== cube.maxZ
          )
        );
      } else {
        newCubes.push(cubes[i]);
      }
    }
  }

  newCubes.push(newCube);

  cubes = [...newCubes];
};

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

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  addCube({ minX, maxX, minY, maxY, minZ, maxZ, on: onOff === 'on' });
}

cubes.forEach(cube => {
  if (cube.on) {
    onCount += (cube.maxX - cube.minX) * (cube.maxY - cube.minY) * (cube.maxZ - cube.minZ);
  }
});

console.log(onCount);
// 2758514936282235
