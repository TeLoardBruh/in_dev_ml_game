let feature;
let knn;
let labelP;
let ready = false;
let video;

function setup() {
    createCanvas(320, 240);
    background(200);

    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
    feature = ml5.featureExtractor("MobileNet", modelReady);
    knn = ml5.KNNClassifier();
    labelP = createP("need training");
    labelP.style("font-size", "32px")

}

function goClassify() {
    const logits = feature.infer(video);
    knn.classify(logits, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            labelP.html(results.label);
            goClassify();
            // console.log(results);
        }
    });
}

// 
// function mousePressed() {
//     if (knn.getNumLabels() > 0) {
//         const logits = feature.infer(video);
//         knn.classify(logits, gotResults);
//     }
// }

// training 
function keyPressed() {
    const logits = feature.infer(video);
    // logits.print();
    // console.log(logits.dataSync());
    if (key == 'l') {
        knn.addExample(logits, 'left');
        console.log("left");
    } else if (key == 'r') {
        knn.addExample(logits, 'right');
        console.log("right");
    } else if (key == 'u') {
        knn.addExample(logits, 'up');
        console.log("up");
    } else if (key == 'd') {
        knn.addExample(logits, 'down');
        console.log("down");
    } else if (key == " ") {
        knn.addExample(logits, "stay");
    } else if (key == 's') {
        knn.save("model.json");
        console.log("save");
    }
}

function modelReady() {
    console.log('model is ready');
}

function draw() {
    background(0);
    image(video, 0, 0);

    if (!ready && knn.getNumLabels() > 0) {
        goClassify();
        ready = true;
    }
}