// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.1

let imgClass;

console.log('ml5 version:', ml5.version);
function callBackFunction() {
    console.log('model is ready!');
    // so here tryin to predict the output 
    imgClass.predict(create_Img, gotResults);
}
function gotResults(err, results) {
    if (err) {
        console.log("PREDICTED U ARE FUCKED" + err);
    }
    else {
        console.log(results);
        let label = results[0].label;
        fill(0);
        textSize(64);
        text(label, 10, height - 1000);
        createP(label);
        
    }
}
function imgReady() {
    image(create_Img, 0, 0, width, height);

}
function setup() {
    createCanvas(400, 400);
    background(200);
    create_Img = createImg('./assets/chip.jpg', imgReady);
    create_Img.hide();
    imgClass = ml5.imageClassifier('MobileNet', callBackFunction);


}
function draw() {
    // background(100);

}


// imgClass = ml5.imageClassifier('MobileNet', callBackFunction);