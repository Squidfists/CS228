var controllerOptions = {};
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var i;
var z;
var hand;
var fingers;
var tipPosition;
var rawXMin = 100;
var rawYMin = 100;
var rawXMax = -100;
var rawYMax = -100;
var rawZMin = 100;
var rawZMax = -100;


function HandleFrame(frame) {

    if (frame.hands.length > 0) {
        hand = frame.hands[0];
        HandleHand(hand);
    }
}

function HandleHand(hand) {
    //console.log(frame.hands);
    //console.log(hand);
    fingers = hand.fingers;
    //console.log(fingers);
    /*
    for (var w = 0; w < fingers.length; w++) {
        HandleFinger(fingers,w);
    }
     */
    var strokes = [10, 7, 4, 2];
    var colors = [[180,180,180],[120,120,120],[60,60,60],[0,0,0]]
    var count = 3

    for (var k = 3; k >= 0; k--) {
        strokeWeight(strokes[count]);
        stroke(colors[count][0],colors[count][1],colors[count][2]);
        if (count > 0) {
            count--;
        }
        else {
            count = 3;
        }
        for (var f = 0; f < 5; f++) {
            handleBone(fingers[f].bones[k]);
        }
    }


}

function  HandleFinger(fingers,w) {

    for (var j = 0; j < fingers[w].bones.length; j++) {
        handleBone(fingers[w].bones[j]);
    }

    /*
    tipPosition = fingers[w].tipPosition;
    console.log(tipPosition);
    x = tipPosition[0];
    y = -tipPosition[1];
    z = tipPosition[2];
    if (x < rawXMin) {
        rawXMin = x;
    }
    if (x > rawXMax) {
        rawXMax = x;
    }
    if (y < rawYMin) {
        rawYMin = y;
    }
    if (y > rawYMax) {
        rawYMax = y;
    }

    x = (0 + (window.innerWidth * ((x - rawXMin)/(rawXMax-rawXMin))));
    y = (0 + (window.innerHeight * ((y - rawYMin)/(rawYMax-rawYMin))));
    circle(x,y,50);
    */

}

function handleBone(bone) {
    bonePosition = bone.nextJoint;
    bonePosition2 = bone.prevJoint;
    x = bonePosition[0];
    y = -bonePosition[1];
    [xb, yb] = transformCoordinates(x,y);


    x1 = bonePosition2[0];
    y1 = -bonePosition2[1];
    [xt, yt] = transformCoordinates(x1,y1);

    line(xb,yb,xt,yt);

}

function transformCoordinates(x,y) {
    if (x < rawXMin) {
        rawXMin = x;
    }
    if (x > rawXMax) {
        rawXMax = x;
    }
    if (y < rawYMin) {
        rawYMin = y;
    }
    if (y > rawYMax) {
        rawYMax = y;
    }

    x = (0 + (window.innerWidth * ((x - rawXMin)/(rawXMax-rawXMin))));
    y = (0 + (window.innerHeight * ((y - rawYMin)/(rawYMax-rawYMin))));
    return [x,y];
}

Leap.loop(controllerOptions, function(frame)
    {
        clear();
        HandleFrame(frame);
    }
);