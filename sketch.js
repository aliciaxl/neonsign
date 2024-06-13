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
  () => drawButterflyOutline(),
  () => drawButterfly(),
  () => drawFlame(),
  () => applyBlur(4),
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
  frameRate(6);

  points = butterflyfont.textToPoints("B", midx, midy, 350, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });

  leftpoints = firefont.textToPoints("N", midx - 26, midy + 18, 280, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });

  rightpoints = firefont.textToPoints("N", midx - 14, midy + 18, 280, {
    sampleFactor: 0.28,
    simplifyThreshold: 0,
  });
}

function draw() {
  background("black");

  const size = steps.length - 1;

  function blinking() {
    for (let k = 0; k <= Math.abs(i - size); k++) {
      steps[k]();
    }

    if (i == size * 2) {
      if (j == 2) {
        j = 0;
        i = 0;
      } else {
        j++;
      }
    } else {
      i++;
    }
  }

  blinking();
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
