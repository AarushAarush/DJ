var duration = 1000;

function changeClass() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementByClassName('img').style.backgroundColor = '#' + randomColor; //'formatForButton';
    setTimeout("changeClass()", duration);
}

function onload() {
    changeClass();
}
var song = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;


function play() {
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, console.log("Model Loaded!"));
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            console.log("0.5x");
            document.getElementById("speed").innerHTML = "Speed = 0.5";
        } else if (rightWristY > 100 && rightWristY <= 200) {
            console.log("1");
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1";
        } else if (rightWristY > 200 && rightWristY <= 300) {
            console.log("1.5");
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5";
        } else if (rightWristY > 300 && rightWristY <= 400) {
            console.log("2");
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed = 2";
        } else if (rightWristY > 400 && rightWristY <= 500) {
            console.log("2.5");
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = 2.5";
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("music.mp3");

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightWristX + "rightWristY" + rightWristY);
    }

}