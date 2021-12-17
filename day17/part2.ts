const targetAreaX = [265, 287];
const targetAreaY = [-103, -58];

let possibleVelocityCount = 0;

for (let yVelocity = -105; yVelocity < 5000; yVelocity++) {
  for (let xVelocity = 1; xVelocity < 300; xVelocity++) {
    let x = 0;
    let y = 0;
    let xDynamicVelocity = xVelocity;
    let yDynamicVelocity = yVelocity;

    while (x <= targetAreaX[1] && y >= targetAreaY[0]) {
      x += xDynamicVelocity;
      if (xDynamicVelocity > 0) {
        xDynamicVelocity -= 1;
      } else if (xDynamicVelocity < 0) {
        xDynamicVelocity += 1;
      }
      y += yDynamicVelocity;
      yDynamicVelocity -= 1;

      if (
        x >= targetAreaX[0] &&
        x <= targetAreaX[1] &&
        y >= targetAreaY[0] &&
        y <= targetAreaY[1]
      ) {
        possibleVelocityCount += 1;
        break;
      }
    }
  }
}

console.log(possibleVelocityCount);
