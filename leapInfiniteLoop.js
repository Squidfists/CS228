var controllerOptions = {};
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var i;
var z;
var hand;
var fingers;

function HandleFrame(frame) {
    clear();
    circle(x,y,50);
    i = Math.floor(Math.random() * 3) - 1;
    x += i;
    z = Math.floor(Math.random() * 3) - 1;
    y += z;

    if (frame.hands.length > 0) {
        hand = frame.hands[0];
        HandleHand(hand);
    }
}

function HandleHand(hand) {
    //console.log(frame.hands);
    //console.log(hand);
    fingers = hand.fingers;
    console.log(fingers);
    for (var w = 0; w < fingers.length; w++) {
        HandleFinger(fingers);
    }
}

function  HandleFinger(fingers) {
    if (fingers[w] == hand.indexFinger) {
        console.log(fingers[w])
    }
}

Leap.loop(controllerOptions, function(frame)
    {
        HandleFrame(frame);
    }
);