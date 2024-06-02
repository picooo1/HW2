let molds = [];
let num = 4000;
let d;
let textContainer;
let text = "Be Yourself";
let index = 0;
let typingSpeed = 150;
// Preload function to load the image before setup


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  d = pixelDensity();
  console.log('Pixel Density:', d);

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  background(0, 5);
  loadPixels();
  
  for (let i = 0; i < num; i++) {
    molds[i].update();
    molds[i].display();
  }
//updatePixels();

}

function mousePressed() {
  // Loop through Mold objects and apply hover effect
  for (let i = 0; i < num; i++) {
    molds[i].hoverEffect();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}