var controllerOptions = {};
var hand;
var fingers;
var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;
var framesOfData = nj.zeros([5,4,6,numSamples]);

nj.config.printThreshold = 1000;
function HandleFrame(frame) {

    if (frame.hands.length > 0) {
        hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand,InteractionBox);
    }
}

function HandleHand(hand,InteractionBox) {
    //console.log(frame.hands);
    //console.log(hand);
    fingers = hand.fingers;
    //console.log(fingers);
    /*
    for (var w = 0; w < fingers.length; w++) {
        HandleFinger(fingers,w);
    }
     */
    var strokes = [50, 35, 20, 10];
    if (currentNumHands == 1) {
        var colors = [[0,255,0],[0,191,0],[0,127,0],[0,64,0]]
    }
    if (currentNumHands == 2) {
        var colors = [[255,0,0],[191,0,0],[127,0,0],[64,0,0]]
    }

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
            handleBone(fingers[f].bones[k],f,k,InteractionBox);
        }
    }


}

function handleBone(bone,fingerIndex,boneIndex,InteractionBox) {

    bonePosition = bone.nextJoint;
    bonePosition2 = bone.prevJoint;

    var normalizedPrevJoint = InteractionBox.normalizePoint(bonePosition2, true);
    var normalizedNextJoint = InteractionBox.normalizePoint(bonePosition, true);

    framesOfData.set(fingerIndex,boneIndex,0,currentSample,normalizedPrevJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,1, currentSample,normalizedPrevJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,3,currentSample,normalizedNextJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,4, currentSample, normalizedNextJoint[1]);

    var canvasXPrev = window.innerWidth * normalizedPrevJoint[0];
    var canvasYPrev = window.innerHeight * (1 - normalizedPrevJoint[1]);
    var canvasXNext = window.innerWidth * normalizedNextJoint[0];
    var canvasYNext = window.innerHeight * (1 - normalizedNextJoint[1]);

    line(canvasXNext,canvasYNext,canvasXPrev,canvasYPrev);

}

function recordData(){
    if (currentNumHands == 2) {
        currentSample += 1;
        if (currentSample == numSamples) {
            currentSample = 0;
        }
    }
    if (currentNumHands == 1 && previousNumHands == 2) {
        background(0,0,0);
        console.log(framesOfData.toString());
    }
}

Leap.loop(controllerOptions, function(frame)
    {
        currentNumHands = frame.hands.length;
        clear();
        HandleFrame(frame);
        recordData();
        previousNumHands = currentNumHands;
    }
);