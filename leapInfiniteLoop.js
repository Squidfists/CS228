var controllerOptions = {};
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var i;
var z;
var hand;
var fingers;
Leap.loop(controllerOptions, function(frame)
    {
        clear();
        circle(x,y,50);
        i = Math.floor(Math.random() * 3) - 1;
        x += i;
        z = Math.floor(Math.random() * 3) - 1;
        y += z;

        if (frame.hands.length > 0) {
            //console.log(frame.hands);
            hand = frame.hands[0];
            //console.log(hand);
            fingers = hand.fingers;
            console.log(fingers);
            for (var w = 0; w < fingers.length; w++) {
                if (fingers[w] == hand.indexFinger) {
                    console.log(fingers[w])
                }

            }
        }


    }
);