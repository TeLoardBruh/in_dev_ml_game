let dino;
// import in img 
let backImg;
let chImg;
let ostImg;
let pipe = [];
let soundClassifier;


function preload() {
    const options = {
        probabilityThreshold: 0.95
    };
    soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
    backImg = loadImage("assets/background.png");
    chImg = loadImage("assets/bird.png");
    ostImg = loadImage("assets/pipe-top.png");

}

function setup() {

    createCanvas(600, 450)
    dino = new Dino()
    soundClassifier.classify(gotCommand);

}
function gotCommand(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results[0].label, results[0].confidence);
    if (results[0].label == 'up') {
      dino.jump();
    }
  }
function draw() {
    //  random bring ost
    if (random(1) < 0.01) {
        pipe.push(new Pipe());
    }
    background(backImg)
    
    for (let p of pipe) {
        p.move();
        p.show();
        if (dino.hits(p)) {
            console.log("HIT");
            noLoop();
        }
    }
    dino.show();
    dino.move();
}

function keyPressed() {
    if (key == " ") {
        dino.jump();
    }
}