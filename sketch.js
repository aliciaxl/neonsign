let font;
let points = [];
let leftpoints = [];
let rightpoints = [];
let midx = 80;
let midy = 370;
let delay = 200;
let steps = [
  () => drawButterflyOutline(),
  () => drawButterfly(),
  () => drawFlame(),
  () => applyBlur(2),
  () => {
    drawButterfly();
    drawFlame();
  }
];
  
//   console.log(cycle);



function preload() {
  butterflyfont = loadFont("Butterflies.ttf");
  firefont = loadFont("Fire.ttf");
}

function setup() {
  createCanvas(600, 440);
  frameRate();

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

  steps[0]();

 function oncycle() { 
    for (let i=1; i<5; i++){
    if (millis() > i * delay) {
    steps[i]();
  };
  }
}

oncycle();

// let reverseDelay = (4 + 1) * delay; // Total time to display all steps
  
//   if (millis() > reverseDelay) {
//     for (let i = 4; i >= 1; i--) {
//       if (millis() > reverseDelay + (4 - i) * delay) {
//         undoStep(i); // Remove step
//       }
//     }
//   }
// }

// function undoStep(stepIndex) {
//   // Code to remove the layers or undo the effects of the step
// }

}
/* 
1. draw butterfly in darker red
2. after small delay apply blur to canvas
3. after another small delay redraw butterfly in bright red
4. after another dmall delay draw flames onto canvas */

function drawButterflyOutline() {
  points.forEach((point) => {
    fill(168, 125, 133);
    rect(point.x, point.y, 5);
    strokeWeight(0);
  });
}

function drawButterfly() {
  points.forEach((point) => {
    fill("pink");
    rect(point.x, point.y, 5);
    strokeWeight(0);
  });
}

function drawFlame() {
  // left flame
  leftpoints.forEach((point) => {
    fill("red");
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
    filter(BLUR, 4); // Apply blur filter multiple times for stronger effect
  }
};