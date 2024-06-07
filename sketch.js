let font;
let points = [];
let leftpoints = [];
let rightpoints = [];
let midx = 80;
let midy = 370;
let delay = 200;
let i = 4;
let j = 0;

let steps = [
  () => drawButterflyOutline(),
  () => drawButterfly(),
  () => drawFlame(),
  () => applyBlur(2),
  () => {
    drawButterfly();
    drawFlame();
  },
];

function preload() {
  butterflyfont = loadFont("Butterflies.ttf");
  firefont = loadFont("Fire.ttf");
}

function setup() {
  createCanvas(600, 440);
  frameRate(8);

  points = butterflyfont.textToPoints("B", midx, midy, 350, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });

  leftpoints = firefont.textToPoints("N", midx - 30, midy + 20, 280, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });

  rightpoints = firefont.textToPoints("N", midx - 16, midy + 18, 280, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });
}

function draw() {
  background("black");
  const size = steps.length - 1;

  for (let k = 0; k <= Math.abs(i - size); k++) {
    steps[k]();
  }
  
  if (i == size*2) {
    if (j == 2) {
      j = 0;
      i = 0;
    } else {
      j++;
    }
  } else {
    i++;
  }
  

  // if (i == 6) {
  //   j = 4;
  // }

  // if (j >= 0) {
  //   steps[0]();
  //   i = 0
  // };

  // if (j >= 1) {
  //   steps[1]();
  //   i = 0
  // };

  // if (j >= 2) {
  //   steps[2]();
  //   i = 0
  // };

  // if (j >= 3) {
  //   steps[3]();
  //   i = 0
  // };

  // if (j >= 4) {
  //   steps[4]();
  //   i = 0
  // };

  // j--;

  // if (j == 0) {
  //   i = 0;
  // };
}

function drawButterflyOutline() {
  points.forEach((point) => {
    fill(106, 77, 89);
    rect(point.x, point.y, 5);
    strokeWeight(0);
  });
}

function drawButterfly() {
  points.forEach((point) => {
    fill(255, 179, 210);
    rect(point.x, point.y, 5);
    strokeWeight(0);
  });
}

function drawFlame() {
  // left flame
  leftpoints.forEach((point) => {
    fill(250, 0, 60);
    rect(point.x, point.y, 5);
    strokeWeight(0);
  });

  // right flame
  for (let i = rightpoints.length - 1; i >= 0; i--) {
    let point = rightpoints[i];
    rect(width - point.x, point.y, 4); // Flip the y-coordinate manually
    strokeWeight(0);
  }
}

function applyBlur(strength) {
  for (let i = 0; i < strength; i++) {
    filter(BLUR, 4);
  }
}
