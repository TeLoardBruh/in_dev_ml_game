// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.1

let imgClass;
let mobilenet;
let video;
let predictor;
let value = 0;
let slider;
let addBtn;
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
        value = results.value;
        // fill(0);
        // textSize(64);
        // text(label, 10, height - 1000);
        // createP(label);
        // loop
        predictor.predict(gotResults);
    }
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Train completed');
        predictor.predict(gotResults);
    } else {
        console.log(loss);

    }
}

function setup() {
    createCanvas(500, 500);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', video, callBackFunction);
    predictor = mobilenet.regression(video, videoReady);

    slider = createSlider(0, 1, 0.5, 0.01);
    // event for slider 

    // slider.input(function(){
    //     predictor.addImage(slider.value());
    //     // console.log(slider.value());
    // });

    addBtn = createButton('Add example image');
    addBtn.mousePressed(function () {
        predictor.addImage(slider.value());
    })






    trainBtn = createButton('trainBtn');
    // when press this will excute 
    trainBtn.mousePressed(function () {
        predictor.train(whileTraining);
    })

}

function draw() {
    background(0);
    image(video, 0, 0, 500, 500);
    // background(0);
    // let this draw rect 
    fill(255,0,255);
    rect(value*width, height/2, 50, 100)
    fill(255);
    textSize(32);
    text(value, 10, height - 20);
}


// imgClass = ml5.imageClassifier('MobileNet', callBackFunction);