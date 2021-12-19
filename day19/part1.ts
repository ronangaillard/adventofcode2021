import * as fs from 'fs';
import permutator from '../utils/permutator';
import product from '../utils/product';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

type Coordinates = [number, number, number];

type Scanner = {
  pos: Coordinates | undefined;
  beacons: Coordinates[];
};

const scanners = new Array<Scanner>();

// parse input

const regexScanner = new RegExp('--- scanner (\\d+) ---', 'g');
const regexCoordinates = new RegExp('-?\\d+,-?\\d+,-?\\d+');

let currentScanner = -1;

for (let i = 0; i < lines.length; i += 1) {
  if (regexScanner.test(lines[i])) {
    scanners.push({ pos: undefined, beacons: new Array<[number, number, number]>() });
    currentScanner++;
  } else if (regexCoordinates.test(lines[i])) {
    const [x, y, z] = lines[i].split(',');
    scanners[currentScanner].beacons.push(
      [x, y, z].map(x => parseInt(x, 10)) as [number, number, number]
    );
  }
}

// we make everything relative to the first scanner
scanners[0].pos = [0, 0, 0];

// prepare transformation

// directions for all axis (axis can be upside down for some of them)
const directions = product([1, -1], [1, -1], [1, -1]);
// 0 is x, 1 is y, 3 is z
const axes = permutator([0, 1, 2]);
// gets all possible directions for axis + axis order
const allPermutations = product(directions, axes);

// function to find same beacons
const findPosFor2ndScanner = (scanner1Index: number, scanner2Index: number) => {
  allPermutations.forEach(permutation => {
    if (scanners[scanner2Index].pos !== undefined) {
      return;
    }
    const axe = permutation[0];
    const direction = permutation[1];

    // permuted beacons
    const scanner2Beacons = scanners[scanner2Index].beacons.map(coords => {
      return [
        coords[direction[0]] * axe[0],
        coords[direction[1]] * axe[1],
        coords[direction[2]] * axe[2],
      ] as Coordinates;
    });

    // list beacons distance for each axis for both scanners
    const beaconsInCommon = Math.min(
      scanners[scanner1Index].beacons.length,
      scanner2Beacons.length
    );

    const distanceCount: Record<string, number> = {};

    for (let i = 0; i < scanners[scanner1Index].beacons.length; i++) {
      const beacon1 = scanners[scanner1Index].beacons[i];
      for (let j = 0; j < scanner2Beacons.length; j++) {
        const beacon2 = scanner2Beacons[j];
        const distance = [
          beacon2[0] - beacon1[0],
          beacon2[1] - beacon1[1],
          beacon2[2] - beacon1[2],
        ].join();

        distanceCount[distance] = (distanceCount[distance] ?? 0) + 1;
        if (distanceCount[distance] === 12) {
          console.log(
            'found position of scanner ',
            scanner2Index,
            ' thanks to scanner ',
            scanner1Index
          );

          scanners[scanner2Index].beacons = scanner2Beacons;

          const relativePos = distance.split(',').map(x => parseInt(x, 10)) as Coordinates;
          const relativePosRotated = [0, 0, 0] as Coordinates;
          relativePosRotated[0] = -relativePos[0];
          relativePosRotated[1] = -relativePos[1];
          relativePosRotated[2] = -relativePos[2];

          const scanner1Pos = scanners[scanner1Index].pos!;
          scanners[scanner2Index].pos = [
            relativePosRotated[0] + scanner1Pos[0],
            relativePosRotated[1] + scanner1Pos[1],
            relativePosRotated[2] + scanner1Pos[2],
          ];

          break;
        }
      }
    }
  });
};

// work around all scanners while position of all of them has not been found
while (scanners.find(scanner => scanner.pos === undefined)) {
  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners.length; j++) {
      if (scanners[i].pos === undefined && i !== j) {
        // use scanner j to find position of scanner i
        if (scanners[j].pos !== undefined) {
          findPosFor2ndScanner(j, i);
        }
      }
    }
  }
}

console.log('done');

const beacons = new Set();

for (let i = 0; i < scanners.length; i++) {
  for (let j = 0; j < scanners[i].beacons.length; j++) {
    beacons.add(
      scanners[i].beacons[j].map((coord, index) => coord + (scanners[i].pos?.[index] ?? 0)).join()
    );
  }
}

console.log(beacons.size);
