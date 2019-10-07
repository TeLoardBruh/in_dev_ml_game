const video = document.getElementById("video")

// call promise to all obj in webcam

Promise.all([
    // call all lib 
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models') 
]).then(startvideo())
function startvideo(){
    // to get a webcam 
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}
// add event listener

video.addEventListener('play', ()=>{
    console.log('up and running model');
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas);
    const showOn = {width:video.width, height:video.height } 
    faceapi.matchDimensions(canvas, showOn)
    // take canvas and create var 
    setInterval(async () =>{
        const detection = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        // console.log(detection);
        const showResize = faceapi.resizeResults(detection, showOn)
        canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
        // draw 
        faceapi.draw.drawDetections(canvas, showResize)
        // draw more detail 
        faceapi.draw.drawFaceLandmarks(canvas, showResize)
        faceapi.draw.drawFaceExpressions(canvas, showResize)
    },100)
})

