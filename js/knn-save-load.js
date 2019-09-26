let x , y;
let feature;
let knn;
let labelP;
let ready = false;
let video;
let label = '';
function setup() {
    createCanvas(320, 240);
    background(200);
    video = createCapture(VIDEO);
    video.style("transform", "scale(-1,1)")
    video.size(320, 240);
    // video.hide();
    feature = ml5.featureExtractor("MobileNet", modelReady);
    labelP = createP("need training");
    labelP.style("font-size","32px")
    x = width /2 ;
    y = height /2;
}
function goClassify(){
    const logits = feature.infer(video);
    knn.classify(logits, function (err,results) {
        if(err){
            console.log(err);
        }
        else {
        label = results.label;
        labelP.html(label);
        goClassify();
        // console.log(results);
        }
    });
}



// training 
function keyPressed() {
    const logits = feature.infer(video);
    // logits.print();
    // console.log(logits.dataSync());
    if (key == 'l') {
        knn.addExample(logits, 'left');
        console.log("left");
    } else if(key == 'r') {
        knn.addExample(logits, 'right');
        console.log("right");
    }
    else if(key == 'u') {
        knn.addExample(logits, 'up');
        console.log("up");
    }
    else if(key == 'd') {
        knn.addExample(logits, 'down');
        console.log("down");
    }
    else if(key == ""){
        
    }
    else if(key == 's') {
        knn.save("model.json");
        console.log("save");
    }
}

function modelReady() {
    console.log('model is loaded');
    knn = ml5.KNNClassifier();
    knn.load("model_1.json",function(){
        console.log("KNN UP ADN RUN");
        goClassify();
    });

}

function draw() {

    background(0);
    fill(255);
    ellipse(x,y,36);

    if (label == "up"){
        y--;
    }else if(label =="down"){
        y++;
    }
    else if (label == "right"){
        x++;
    }
    else if(label == "left"){
        x--
    }
    // mirror 
    x = constrain(x,0, width);
    y = constrain(y,0, height);
}