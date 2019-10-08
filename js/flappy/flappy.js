
var bird;
var pipes = [];
var score;
var hasGameStarted = false;
var speed;
var mic;
var sliderTop;
var sliderBottom;
function setup() {
  createCanvas(1024, 576);
  bg = loadImage("assets/background.png");
  bird = new Bird();
  score = new Score();
  pipes = [];
  hasGameStarted = false;
  speed = 5;
  // voice recon
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(bg);
  var vol = mic.getLevel();

  bird.display();
  if (hasGameStarted) {
    bird.update();
    updateSpeedOfPipes();
  }

  var reset = false;
  if (bird.hasHitEdge()) {
    reset = true;
  }

// push new obstacle
  if(hasGameStarted && frameCount % 75 == 0) {
    pipes.push(new Pipe(speed));
  }



  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].display();
    pipes[i].update();
    if (pipes[i].hasCollided(bird)) {
      reset = true;
    }
    if (pipes[i].isOffScreen()) {
      pipes.splice(i, 1);
      score.increment();
    }
  }
  score.display();

  if (reset) {
    setup();
  }

  if (vol > 0.05) {
    bird.up();
    hasGameStarted = true;
    // clapping = true;
  }


}


function keyPressed() {
  if (key == " ") {
    hasGameStarted = true;
    bird.up();
  }

}

// con start
function updateSpeedOfPipes() {
  if (frameCount % 500 == 0) {

    for (var i = 0; i < pipes.length; i++) {
      pipes[i].increaseSpeed();
    }
    speed = speed + 1;
  }

}
