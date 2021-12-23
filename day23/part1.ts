import * as fs from 'fs';

const initialBoard = ['.', '.', 'da', '.', 'dc', '.', 'ab', '.', 'cb', '.', '.'];

const expectedBoard = ['.', '.', 'aa', '.', 'bb', '.', 'cc', '.', 'dd', '.', '.'];

const energyMap = {
  a: 1,
  b: 10,
  c: 100,
  d: 1000,
};

const roomIndex = [2, 4, 6, 8];

let minEnergy = Infinity;

const isWayClear = (origin: number, destination: number, board: string[]) => {
  const start = Math.min(origin, destination);
  const end = Math.max(origin, destination);

  for (let i = start + 1; i < end; i++) {
    if (roomIndex.includes(i)) {
      continue;
    }
    if (board[i] !== '.') {
      return false;
    }
  }

  return true;
};

const move = (board: string[], energy: number) => {
  if (energy > minEnergy) {
    return;
  }

  if (JSON.stringify(board) === JSON.stringify(expectedBoard)) {
    if (minEnergy > energy) {
      console.log(energy);
    }
    minEnergy = Math.min(minEnergy, energy);
    return;
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] == '.') {
      continue;
    }

    const _board = [...board];

    // get amphipod
    const amphipod = _board[i].split('').pop() as 'a' | 'b' | 'c' | 'd';

    // if amphipod already at final position don't try to move it
    if (amphipod == 'a' && i == 2 && (_board[i] === 'a' || _board[i] === 'aa')) {
      continue;
    }
    if (amphipod == 'b' && i == 4 && (_board[i] === 'b' || _board[i] === 'bb')) {
      continue;
    }
    if (amphipod == 'c' && i == 6 && (_board[i] === 'c' || _board[i] === 'cc')) {
      continue;
    }
    if (amphipod == 'd' && i == 8 && (_board[i] === 'd' || _board[i] === 'dd')) {
      continue;
    }

    _board[i] = _board[i].slice(0, -1);
    if (_board[i].length === 0) {
      _board[i] = '.';
    }

    // try all possible positions for selected amphipod
    for (let j = 0; j < _board.length; j++) {
      if (i === j) {
        continue;
      }

      // Once an amphipod stops moving in the hallway, it will stay in that spot until it can move into a room.
      // so if amphipod is in hallway, and destination is not a room, skip
      if (!roomIndex.includes(i) && !roomIndex.includes(j)) {
        continue;
      }

      if (!isWayClear(i, j, _board)) {
        continue;
      }

      let moveCount = 0;
      // if amphipod starts in room
      if (roomIndex.includes(i)) {
        moveCount += 1;

        // if he was alone that's one more move to go out
        if (_board[i] === '.') {
          moveCount += 1;
        }
      }

      // Amphipods will never stop on the space immediately outside any room.
      // Amphipods will never move from the hallway into a room unless that room is their destination room and that room contains no amphipods which do not also have that room as their own destination.
      if (roomIndex.includes(j)) {
        // one more move to enter the room
        moveCount += 1;

        if (_board[j] === '.') {
          // one more if room is empty
          moveCount += 1;
        }
        if (amphipod === 'a' && j === 2 && (_board[j] === '.' || _board[j] === 'a')) {
          const __board = [..._board];
          __board[j] = __board[j] === '.' ? amphipod : __board[j] + amphipod;
          move(__board, energy + (Math.abs(j - i) + moveCount) * energyMap[amphipod]);
        }
        if (amphipod === 'b' && j === 4 && (_board[j] === '.' || _board[j] === 'b')) {
          const __board = [..._board];
          __board[j] = __board[j] === '.' ? amphipod : __board[j] + amphipod;
          move(__board, energy + (Math.abs(j - i) + moveCount) * energyMap[amphipod]);
        }

        if (amphipod === 'c' && j === 6 && (_board[j] === '.' || _board[j] === 'c')) {
          const __board = [..._board];
          __board[j] = __board[j] === '.' ? amphipod : __board[j] + amphipod;
          move(__board, energy + (Math.abs(j - i) + moveCount) * energyMap[amphipod]);
        }
        if (amphipod === 'd' && j === 8 && (_board[j] === '.' || _board[j] === 'd')) {
          const __board = [..._board];
          __board[j] = __board[j] === '.' ? amphipod : __board[j] + amphipod;
          move(__board, energy + (Math.abs(j - i) + moveCount) * energyMap[amphipod]);
        }
      } else if (_board[j] === '.') {
        const __board = [..._board];
        __board[j] = amphipod;
        move(__board, energy + (Math.abs(j - i) + moveCount) * energyMap[amphipod]);
      }
    }
  }
};

move(initialBoard, 0);

console.log('found solution', minEnergy);
