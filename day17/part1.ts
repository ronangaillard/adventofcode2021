import * as fs from 'fs';

const targetAreaX = [265, 287];
const targetAreaY = [-103, -58];

let maxHeight = 0;

for (let yVelocity = 1; yVelocity < 1000; yVelocity++) {
  for (let xVelocity = 1; xVelocity < 1000; xVelocity++) {
    let x = 0;
    let y = 0;
    let xDynamicVelocity = xVelocity;
    let yDynamicVelocity = yVelocity;

    let currentMaxHeight = 0;

    while (x <= targetAreaX[1] && y >= targetAreaY[0]) {
      x += xDynamicVelocity;
      if (xDynamicVelocity > 0) {
        xDynamicVelocity -= 1;
      } else if (xDynamicVelocity < 0) {
        xDynamicVelocity += 1;
      }
      y += yDynamicVelocity;
      yDynamicVelocity -= 1;

      currentMaxHeight = Math.max(currentMaxHeight, y);

      if (
        x >= targetAreaX[0] &&
        x <= targetAreaX[1] &&
        y >= targetAreaY[0] &&
        y <= targetAreaY[1]
      ) {
        maxHeight = currentMaxHeight;
      }
    }
  }
}

console.log(maxHeight);
