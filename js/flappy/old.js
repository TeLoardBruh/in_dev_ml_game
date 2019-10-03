var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;
var hasGameStarted = false;
var score = 0;

function setup() {
  createCanvas(400, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  score = new Score();
  sliderTop = createSlider(0, 1, 0.06, 0.01);
  sliderBottom = createSlider(0, 1, 0.01, 0.01);
}

function draw() {
  background(0);
  // pasue the game b4
  if (hasGameStarted) {
    bird.update();
    updateSpeedOfPipes();
  }
  var vol = mic.getLevel();


  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].hits(bird)) {
      console.log("HIT");
      text("you lose!", width/2, height/2);

    }
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score.increment();
    }
    textAlign(LEFT, TOP);
    text("Score : "+score,
      20, 10);
  }

  bird.update();
  bird.show();
  // score.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  var thresholdTop = sliderTop.value();
  // console.log(thresholdTop);
  var thresholdBottom = sliderBottom.value();
  // console.log(thresholdBottom);

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol < thresholdBottom) {
    clapping = false;
  }

  fill(0, 255, 0);
  //console.log(vol);
  noStroke();
  var y = map(vol, 0, 1, height, 0);
  rect(width - 50, y, 50, height - y);

  var ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  var by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);

  

}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}


function updateSpeedOfPipes() {
  if (frameCount % 500 == 0) {

    for (var i = 0; i < pipes.length; i++) {
      pipes[i].increaseSpeed();
    }
    speed = speed + 1;
  }

}