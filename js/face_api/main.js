let video = document.getElementById("video")
let txt = '';

// call promise to all obj in webcam

Promise.all([
    // call all lib 
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    // specify the details on face 
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    // allow api ro recon where the face
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    // recon expression
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),

]).then(startvideo())

function startvideo() {
    // to get a webcam 
    navigator.getUserMedia({
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}
// add event listener
// syntax "method" , function
video.addEventListener('play', faceRecon)



function faceRecon() {
    console.log('up and running model');
    let canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas);
    // canvas around face 
    let showOn = {
        width: video.width,
        height: video.height
    }
    faceapi.matchDimensions(canvas, showOn)
    // take canvas and create var 
    setInterval(async () => {
        let detection = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        // test data
        // let detection_test = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
        // console.log(detection_test[0]);
        // console.log(detection);
        // poses[0].pose.keypoints[0].position.x;
        // var testData = detection[0].expressions;
        // console.log(testData);
        let showResize = faceapi.resizeResults(detection, showOn)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        // draw 
        faceapi.draw.drawDetections(canvas, showResize)
        // draw more detail 
        // faceapi.draw.drawFaceLandmarks(canvas, showResize)
        faceapi.draw.drawFaceExpressions(canvas, showResize)
        // console.log(detection[0].expressions.happy);
        // if esle for printing out the express that we match
        // console.log(detection[0]);
        if (detection[0].expressions.happy > 0.80) {
            console.log("this is happy detection 😀");
            // txt += "The emoji is 😀 " + "<br>";
            // document.getElementById("myCanvas").innerHTML = txt;

        }
        if (detection[0].expressions.sad > 0.80) {
            console.log("this is sad detection 😔");

            // txt += "The emoji is 😔 " + "<br>";
            // document.getElementById("demo").innerHTML = txt;
        }
        if (detection[0].expressions.angry > 0.80) {
            console.log("this is angry detection 😡");

            // txt += "The emoji is 😡 " + "<br>";
            // document.getElementById("demo").innerHTML = txt;
        }
        if (detection[0].expressions.disgusted > 0.80) {
            console.log("this is disgusted detection 🤢");

            // txt += "The emoji is 🤢 " + "<br>";
            // document.getElementById("demo").innerHTML = txt;
        }
        if (detection[0].expressions.surprised > 0.80) {
            console.log("this is surprised detection 😲");

            // txt += "The emoji is 😲 " + "<br>";
            // document.getElementById("demo").innerHTML = txt;
        }
        
    }, 100);
}


function randomEm() {
    var myArray = [
        "😀",
        "😔",
        "😡",
        "🤢",
        "😲",
    ];
    console.log(myArray);
    var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

    document.getElementById("randomEm").innerHTML = randomItem;
}
randomEm()