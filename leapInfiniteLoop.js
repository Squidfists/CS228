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
    for (var w = 0; w < fingers.length; w++) {
        HandleFinger(fingers,w);
    }
}

function  HandleFinger(fingers,w) {
    if (fingers[w] == hand.indexFinger) {
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
    }
}

Leap.loop(controllerOptions, function(frame)
    {
        clear();
        HandleFrame(frame);
    }
);