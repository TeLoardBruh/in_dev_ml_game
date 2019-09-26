// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.1

let imgClass;
let video;
let label = ' ' ;
// console.log('ml5 version:', ml5.version);
function callBackFunction() {
    console.log('model is ready!');
    // so here tryin to predict the output 
    // imgClass.predict(create_Img, gotResults);
    imgClass.predict(gotResults);
}
function gotResults(err, results) {
    if (err) {
        console.log("PREDICTED U ARE FUCKED" + err);
    }
    else {
        console.log(results);
        label = results[0].label;
        fill(0);
        textSize(64);
        text(label, 10, height - 1000);
        // createP(label);
        // loop
        imgClass.predict(gotResults);
    }
}
// function imgReady() {
//     image(create_Img, 0, 0, width, height);

// }
function setup() {
    createCanvas(840, 1000);
    // create_Img = createImg('./assets/pc.jpg', imgReady);
    video = createCapture(VIDEO);
    // create_Img.hide();
    video.hide();
    background(0);
    imgClass = ml5.imageClassifier('MobileNet', video,callBackFunction);

}
function draw() {
    background(0);
    image(video,0,0);
    // background(0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}


// imgClass = ml5.imageClassifier('MobileNet', callBackFunction);