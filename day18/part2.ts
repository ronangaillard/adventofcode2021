import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

type snailfishNumber = [number | snailfishNumber, number | snailfishNumber];

const charIsNum = (char: string) => char >= '0' && char <= '9';

const reduce = (line: string) => {
  let sn = line.split('');
  let depth = 0;

  for (let i = 0; i < sn.length; i++) {
    if (sn[i] === '[') {
      depth += 1;

      // explode
      if (depth > 4 && sn[i + 1] >= '0' && sn[i + 1] <= '9') {
        let _previousNumber = '';

        let j = i - 1;
        for (; j > 0 && ((sn[j] >= '0' && sn[j] <= '9') || _previousNumber.length === 0); j -= 1) {
          if (charIsNum(sn[j])) {
            _previousNumber = sn[j] + _previousNumber;
          }
        }

        let _currentLeftNumber = '';

        let k = i;
        for (
          ;
          k < line.length && ((sn[k] >= '0' && sn[k] <= '9') || _currentLeftNumber.length === 0);
          k += 1
        ) {
          if (charIsNum(sn[k])) {
            _currentLeftNumber = _currentLeftNumber + sn[k];
          }
        }

        // Exploding pairs will always consist of two regular numbers.
        if (sn[k] !== ',' || !charIsNum(sn[k + 1])) {
          continue;
        }

        let _currentRightNumber = '';

        let l = k + 1;
        for (; l < line.length && (charIsNum(sn[l]) || _currentRightNumber.length === 0); l += 1) {
          if (charIsNum(sn[l])) {
            _currentRightNumber = _currentRightNumber + sn[l];
          }
        }

        let _nextNumber = '';

        let m = l + 1;
        for (
          ;
          m < line.length && ((sn[m] >= '0' && sn[m] <= '9') || _nextNumber.length === 0);
          m += 1
        ) {
          if (charIsNum(sn[m])) {
            _nextNumber = _nextNumber + sn[m];
          }
        }

        let newLine = '';

        if (_previousNumber) {
          const previousNumber = parseInt(_currentLeftNumber, 10) + parseInt(_previousNumber, 10);
          newLine +=
            line.slice(0, j + 1) + previousNumber + line.slice(j + _previousNumber.length + 1, i);
        } else {
          newLine += line.slice(0, i);
        }

        newLine += '0';

        if (_nextNumber) {
          const nextNumber = parseInt(_currentRightNumber, 10) + parseInt(_nextNumber, 10);
          newLine += line.slice(l + 1, m - _nextNumber.length) + nextNumber + line.slice(m);
        } else {
          newLine += line.slice(l + 1);
        }

        return newLine;
      }
    }

    if (sn[i] === ']') {
      depth -= 1;
    }
  }

  for (let i = 0; i < sn.length; i++) {
    if ((sn[i] === ',' || sn[i] === ']') && sn[i - 1] >= '0' && sn[i - 1] <= '9') {
      let _previousNumber = '';

      let j = i - 1;
      for (; j > 0 && sn[j] >= '0' && sn[j] <= '9'; j -= 1) {
        _previousNumber = sn[j] + _previousNumber;
      }

      let previousNumber = parseInt(_previousNumber, 10);

      // split
      if (previousNumber >= 10) {
        const numberToInsert = `[${Math.floor(previousNumber / 2)},${Math.ceil(
          previousNumber / 2
        )}]`;

        return line.slice(0, j + 1) + numberToInsert + line.slice(i);
      }
    }
  }

  return line;
};

const add = (number1: string, number2: string) => {
  return `[${number1},${number2}]`;
};

const superReduce = (_line: string) => {
  let line = _line;
  let previousLine = line;

  while (true) {
    line = reduce(line);

    if (previousLine === line) {
      return line;
    }

    previousLine = line;
  }
};

const magnitude = (sn: any[]): any => {
  return (
    (Array.isArray(sn[0]) ? magnitude(sn[0]) : sn[0]) * 3 +
    (Array.isArray(sn[1]) ? magnitude(sn[1]) : sn[1]) * 2
  );
};

let maxMagnitude = 0;

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines.length; j++) {
    if (i !== j) {
      maxMagnitude = Math.max(
        magnitude(JSON.parse(superReduce(add(lines[i], lines[j])))),
        maxMagnitude
      );
    }
  }
}

console.log(maxMagnitude);
