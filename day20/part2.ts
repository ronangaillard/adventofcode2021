import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const algorithm = lines[0].split('').map(x => (x === '#' ? 1 : 0));

let image = new Array<number[]>();

const dirtyOffset = 100; // leave space around the image to allow it to grow

// parse image and add dirty offset of black pixels
for (let j = 0; j < dirtyOffset; j++) {
  image[j] = new Array(dirtyOffset * 2 + lines[2].split('').length).fill(0);
}

for (let i = 2; i < lines.length; i++) {
  image[i - 2 + dirtyOffset] = lines[i].split('').map(x => (x === '#' ? 1 : 0));

  for (let j = 0; j < dirtyOffset; j++) {
    image[i - 2 + dirtyOffset].unshift(0);
    image[i - 2 + dirtyOffset].push(0);
  }
}

for (let j = 0; j < dirtyOffset; j++) {
  image.push(new Array(dirtyOffset * 2 + lines[2].split('').length).fill(0));
}

for (let i = 0; i < 50; i++) {
  const newImage = image.map(line => line.slice());

  for (let x = 1; x < image[0].length - 1; x++) {
    for (let y = 1; y < image.length - 1; y++) {
      const index = parseInt(
        [
          image[x - 1][y - 1],
          image[x - 1][y],
          image[x - 1][y + 1],
          image[x][y - 1],
          image[x][y],
          image[x][y + 1],
          image[x + 1][y - 1],
          image[x + 1][y],
          image[x + 1][y + 1],
        ].join(''),
        2
      );

      newImage[x][y] = algorithm[index];
    }
  }

  for (let x = 0; x < image[0].length; x++) {
    newImage[x][0] = (i + 1) % 2;
    newImage[x][newImage[0].length - 1] = (i + 1) % 2;
  }

  for (let y = 0; y < image.length; y++) {
    newImage[0][y] = (i + 1) % 2;
    newImage[newImage.length - 1][y] = (i + 1) % 2;
  }

  image = newImage.map(function (line) {
    return line.slice();
  });
}

let count = 0;

for (let x = 1; x < image.length - 1; x++) {
  for (let y = 1; y < image.length - 1; y++) {
    count += image[x][y];
  }
}

console.log(count);
