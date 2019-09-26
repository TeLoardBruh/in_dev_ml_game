let imgClass;
let mobilenet;

let video;
let classifier;
let label = ' ';
let bottleDBtn;
let iphoneBtn;
let trainBtn;

// console.log('ml5 version:', ml5.version);
function callBackFunction() {
    console.log('model is ready!');
    // so here tryin to predict the output 
    // imgClass.predict(create_Img, gotResults);
    // imgClass.predict(gotResults);
}

function videoReady() {
    console.log('video ready to roll');
}

function gotResults(err, results) {
    if (err) {
        console.log("PREDICTED U ARE FUCKED" + err);
    } else {
        // console.log(results);
        label = results[0].label;
        // fill(0);
        // textSize(64);
        // text(label, 10, height - 1000);
        // createP(label);
        // loop
        classifier.classify(gotResults);
    }
}

function whileTraining(loss) {
    if(loss == null){
        console.log('Train completed');
        classifier.classify(gotResults);
    }else{
        console.log(loss);

    }
}

function setup() {
    createCanvas(840, 900);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', video, callBackFunction);
    classifier = mobilenet.classification(video, videoReady);

    bottleDBtn = createButton('bottle');
    // when press this will excute 
    bottleDBtn.mousePressed(function () {
        classifier.addImage('bottle');
    })

    iphoneBtn = createButton('iphone');
    // when press this will excute 
    iphoneBtn.mousePressed(function () {
        classifier.addImage('iphone');
    })





    trainBtn = createButton('trainBtn');
    // when press this will excute 
    trainBtn.mousePressed(function () {
        classifier.train(whileTraining);
    })

    
}

function draw() {
    background(0);
    image(video, 0, 0);
    // background(0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}


// imgClass = ml5.imageClassifier('MobileNet', callBackFunction);