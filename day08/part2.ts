import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const inputs = [] as string[];
const outputs = [] as string[];

lines.forEach(line => {
  const Xput = line.split(' | ');
  inputs.push(Xput[0]);
  outputs.push(Xput[1]);
});

const sortString = (str: string) => {
  var arr = str.split('');
  var tmp;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      /* if ASCII code greater then swap the elements position*/
      if (arr[i] > arr[j]) {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr.join('');
};

let sum = 0;

// 0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

inputs.forEach((input, index) => {
  const digits = input.split(' ');

  let segmentmapping = {
    a: 'abcdefg'.split(''),
    b: 'abcdefg'.split(''),
    c: 'abcdefg'.split(''),
    d: 'abcdefg'.split(''),
    e: 'abcdefg'.split(''),
    f: 'abcdefg'.split(''),
    g: 'abcdefg'.split(''),
  };

  let mapping = {} as Record<string, number>;

  digits.forEach(digit => {
    // digit 1
    if (digit.length === 2) {
      segmentmapping.c = segmentmapping.c.filter(x => x === digit[0] || x === digit[1]);
      segmentmapping.f = segmentmapping.f.filter(x => x === digit[0] || x === digit[1]);
      mapping[sortString(digit)] = 1;
    }

    //digit 4
    if (digit.length === 4) {
      segmentmapping.b = segmentmapping.b.filter(x => digit.includes(x));
      segmentmapping.c = segmentmapping.c.filter(x => digit.includes(x));
      segmentmapping.d = segmentmapping.d.filter(x => digit.includes(x));
      segmentmapping.f = segmentmapping.f.filter(x => digit.includes(x));
      mapping[sortString(digit)] = 4;
    }

    //digit 7
    if (digit.length === 3) {
      segmentmapping.a = segmentmapping.a.filter(x => digit.includes(x));
      segmentmapping.c = segmentmapping.c.filter(x => digit.includes(x));
      segmentmapping.f = segmentmapping.f.filter(x => digit.includes(x));
      mapping[sortString(digit)] = 7;
    }
  });

  // find 3
  digits.forEach(digit => {
    if (digit.length === 5) {
      const oneDigitSegment = Object.entries(mapping).find(x => x[1] === 1)?.[0];
      if (oneDigitSegment === undefined) {
        throw 'oups';
      }

      if (digit.includes(oneDigitSegment[0]) && digit.includes(oneDigitSegment[1])) {
        mapping[sortString(digit)] = 3;
      }
    }
  });

  // find 0
  digits.forEach(digit => {
    if (digit.length === 6) {
      // a priori zero c'est le seul de longueur 6 à avoir que 3 segments en commun avec 4 et 2 avec 1
      const fourDigitSegment = Object.entries(mapping).find(x => x[1] === 4)?.[0];
      const oneDigitSegment = Object.entries(mapping).find(x => x[1] === 1)?.[0];
      if (fourDigitSegment === undefined) {
        throw 'oups';
      }
      if (oneDigitSegment === undefined) {
        throw 'oups';
      }

      if (
        fourDigitSegment.split('').filter(x => digit.includes(x)).length === 3 &&
        oneDigitSegment.split('').filter(x => digit.includes(x)).length === 2
      ) {
        mapping[sortString(digit)] = 0;
      }
    }
  });

  // find 2
  digits.forEach(digit => {
    if (digit.length === 5) {
      // a priori 2 c'est le seul de longueur 5 à avoir que 2 segments en commun avec 4
      const fourDigitSegment = Object.entries(mapping).find(x => x[1] === 4)?.[0];
      if (fourDigitSegment === undefined) {
        throw 'oups';
      }

      if (fourDigitSegment.split('').filter(x => digit.includes(x)).length === 2) {
        mapping[sortString(digit)] = 2;
      }
    }
  });

  // find 5
  digits.forEach(digit => {
    if (digit.length === 5) {
      // a priori 5 c'est le seul de longueur 5 à avoir que 3 segments en commun avec 4 et qui n'est pas 3
      const fourDigitSegment = Object.entries(mapping).find(x => x[1] === 4)?.[0];
      if (fourDigitSegment === undefined) {
        throw 'oups';
      }

      if (
        fourDigitSegment.split('').filter(x => digit.includes(x)).length === 3 &&
        mapping[sortString(digit)] != 3
      ) {
        mapping[sortString(digit)] = 5;
      }
    }
  });

  // find 8
  digits.forEach(digit => {
    if (digit.length === 7) {
      mapping[sortString(digit)] = 8;
    }
  });

  // find 9
  digits.forEach(digit => {
    if (digit.length === 6) {
      // a priori 9 c'est le seul de longueur 6 à avoir 4 segments en commun avec 4
      const fourDigitSegment = Object.entries(mapping).find(x => x[1] === 4)?.[0];
      if (fourDigitSegment === undefined) {
        throw 'oups';
      }

      if (fourDigitSegment.split('').filter(x => digit.includes(x)).length === 4) {
        mapping[sortString(digit)] = 9;
      }
    }
  });

  // find 6
  digits.forEach(digit => {
    if (digit.length === 6) {
      // a priori 6 c'est le seul qui reste
      if (mapping[sortString(digit)] === undefined) {
        mapping[sortString(digit)] = 6;
      }
    }
  });

  const num = outputs[index]
    .split(' ')
    .map((x, subindex) => mapping[sortString(x)] * Math.pow(10, 4 - subindex - 1))
    .reduce((previous, current) => previous + current, 0);

  sum += num;
});

console.log(sum);
