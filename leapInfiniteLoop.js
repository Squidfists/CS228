var controllerOptions = {};
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var i;
Leap.loop(controllerOptions, function(frame)
    {
        clear();
        circle(x,y,50);
        i = Math.floor(Math.random() * 3) - 1;
        x += i
        console.log(i)

    }
);