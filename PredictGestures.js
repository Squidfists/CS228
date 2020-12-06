const knnClassifier = ml5.KNNClassifier();
var framesOfData = nj.zeros([5,4,6]);
var trainingCompleted = false;
var predictedLabel;
var predictedClassLabels = nj.zeros(1);
var controllerOptions = {};
var hand;
var fingers;
var previousNumHands = 0;
var currentNumHands = 0;
var numPredictions = 0;
var meanPredictionAccuracySoFar = 0;
var programState = 0;
var digitToShow = 0;
var timeSinceLastDigitChange = new Date();
var zero = [0,false];
var one = [1,false];
var two = [2,false];
var three = [3,false];
var four = [4,false];
var five = [5,false];
var six = [6,false];
var seven = [7,false];
var eight = [8,false];
var nine = [9,false];
var comebackto = [];
var numlist = [zero,one,two,three,four,five,six,seven,eight,nine];
var bestBeat = false;

var equation1 = [5,false];
var equation2 = [8, false];
var equation3 = [0, false];
var equation4 = [1, false];
var equation5 = [5, false];
var equation6 = [9, false];
var equation7 = [5, false];
var equation8 = [3, false];
var equation9 = [2, false];
var equation10 = [0, false];
var equlist = [equation1,equation2,equation3,equation4,equation5,equation6,equation7,equation8,equation9,equation10];

var startshowingonlynumbers = false;
var time0 = 5;
var time1 = 5;
var time2 = 5;
var time3 = 5;
var time4 = 5;
var time5 = 5;
var time6 = 5;
var time7 = 5;
var time8 = 5;
var time9 = 5;
var timetogo = 5;
var times = [time0,time1,time2,time3,time4,time5,time6,time7,time8,time9];
var mode = 0;
var answer = 0;

nj.config.printThreshold = 1000;

var list;
var username;

var alltheequationsbaybee = ["1+1","1+2","1+3","1+4","1+5","1+6","1+7","1+8","2+2","2+3","2+4","2+5","2+6","2+7","3+3","3+4","3+5","3+6","4+4","4+5",
    "1-1","2-1","2-2","3-1","3-2","3-3","4-1","4-2","4-3","4-4","5-1","5-2","5-3","5-4","5-5","6-1","6-2","6-3","6-4","6-5","6-6","7-1","7-2","7-3","7-4","7-5","7-6","7-7","8-1","8-2","8-3","8-4","8-5",
    "8-6","8-7","8-8","9-1","9-2",'9-3',"9-4","9-5","9-6","9-7","9-8","9-9","2*2","2*3","2*4","3*3","8/4","6/3","8/2","6/2","4/2","9/3"];
var val;

function HandleFrame(frame) {

    if (frame.hands.length > 0) {
        hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand,InteractionBox);
        //Test();
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
    var scale = meanPredictionAccuracySoFar;
    if (currentNumHands == 1) {
        var colors = [[(1-scale)*255,(scale*255),0],[(1-scale)*191,(scale*191),0],[(1-scale)*127,(scale*127),0],[(1-scale*64),(scale*64),0]]

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

    framesOfData.set(fingerIndex,boneIndex,0, normalizedPrevJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,1, normalizedPrevJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,2, normalizedPrevJoint[2]);
    framesOfData.set(fingerIndex,boneIndex,3, normalizedNextJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,4, normalizedNextJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,5, normalizedNextJoint[2]);

    var canvasXPrev = window.innerWidth/2 * normalizedPrevJoint[0];
    var canvasYPrev = window.innerHeight/2 * (1 - normalizedPrevJoint[1]);
    var canvasXNext = window.innerWidth/2 * normalizedNextJoint[0];
    var canvasYNext = window.innerHeight/2 * (1 - normalizedNextJoint[1]);

    line(canvasXNext,canvasYNext,canvasXPrev,canvasYPrev);

}

function Train(){
    trainingCompleted = true;
    for (var l = 0; l < 2; l++){
        //console.log( train0.pick(null,null,null,l).toString() );
        var features = train3.pick(null,null,null,l);
        features = features.reshape(1,120);

        var features3again = train3Downs.pick(null,null,null,l);
        features3again = features3again.reshape(1,120);

        var features3another = train3Jing.pick(null,null,null,l);
        features3another = features3another.reshape(1,120);

        var features3more = train3Li.pick(null,null,null,l);
        features3more = features3more.reshape(1,120);

        var features3morer = train3Luke.pick(null,null,null,l);
        features3morer = features3morer.reshape(1,120);

        var features3most = train3Bongard.pick(null,null,null,l);
        features3most = features3most.reshape(1,120);

        var features3notdoingthatjokeagain = train3Riofro.pick(null,null,null,l);
        features3notdoingthatjokeagain = features3notdoingthatjokeagain.reshape(1,120);

        var features3notyetowo = train3Nimako.pick(null,null,null,l);
        features3notyetowo = features3notyetowo.reshape(1,120);

        var features1 = train5.pick(null,null,null,l);
        features1 = features1.reshape(1,120);

        var features5again = train5Blewett.pick(null,null,null,l);
        features5again = features5again.reshape(1,120);

        var features2 = train7.pick(null,null,null,l);
        features2 = features2.reshape(1,120);

        var features7again = train7Manion.pick(null,null,null,l);
        features7again = features7again.reshape(1,120);

        var features7another = train7Pooprasert.pick(null,null,null,l);
        features7another = features7another.reshape(1,120);

        var features7more = train7Bongard.pick(null,null,null,l);
        features7more = features7more.reshape(1,120);

        var features7moreer = train7Laquerre.pick(null,null,null,l);
        features7moreer = features7moreer.reshape(1,120);

        var features7most = train7Fisher.pick(null,null,null,l);
        features7most = features7most.reshape(1,120);

        var features3 = train1.pick(null,null,null,l);
        features3 = features3.reshape(1,120);

        var features1another = train1Allison.pick(null,null,null,l);
        features1another = features1another.reshape(1,120);

        var features1more = train1Bongard.pick(null,null,null,l);
        features1more = features1more.reshape(1,120);

        var features4 = train0.pick(null,null,null,l);
        features4 = features4.reshape(1,120);

        var features0 = train0Croxford.pick(null,null,null,l);
        features0 = features0.reshape(1,120);

        var features0again = train0Allison.pick(null,null,null,l);
        features0again = features0again.reshape(1,120);

        var features5 = train2.pick(null,null,null,l);
        features5 = features5.reshape(1,120);

        var features2again = train2Bongard.pick(null,null,null,l);
        features2again = features2again.reshape(1,120);

        var features2another = train2Neff.pick(null,null,null,l);
        features2another = features2another.reshape(1,120);

        var features2more = train2Obrien.pick(null,null,null,l);
        features2more = features2more.reshape(1,120);

        var features2moreer = train2Rielly.pick(null,null,null,l);
        features2moreer = features2moreer.reshape(1,120);

        var features2most = train2Banana.pick(null,null,null,l);
        features2most = features2most.reshape(1,120);

        var features2onehopthistime = train2Downs.pick(null,null,null,l);
        features2onehopthistime = features2onehopthistime.reshape(1,120);

        var features2unlimitedpower = train2Jing.pick(null,null,null,l);
        features2unlimitedpower = features2unlimitedpower.reshape(1,120);

        var features2iamthesenate = train2Liu.pick(null,null,null,l);
        features2iamthesenate = features2iamthesenate.reshape(1,120);

        var features6 = train4.pick(null,null,null,l);
        features6 = features6.reshape(1,120);

        var features1again = train1Li.pick(null,null,null,l);
        features1again = features1again.reshape(1,120);

        var features1moreer = train1Nim.pick(null,null,null,l);
        features1moreer = features1moreer.reshape(1,120);

        var features1most= train1MCHammer.pick(null,null,null,l);
        features1most = features1most.reshape(1,120);

        var features7 = train6.pick(null,null,null,l);
        features7 = features7.reshape(1,120);

        var features6again = train6Laquerre.pick(null,null,null,l);
        features6again = features6again.reshape(1,120);

        var features6another = train6Potts.pick(null,null,null,l);
        features6another = features6another.reshape(1,120);

        var features8 = train8.pick(null,null,null,l);
        features8 = features8.reshape(1,120);

        var features8again = train8Bongard.pick(null,null,null,l);
        features8again = features8again.reshape(1,120);

        var features9 = train9.pick(null,null,null,l);
        features9 = features9.reshape(1,120);

        var features9again = train9Bongard.pick(null,null,null,l);
        features9again = features9again.reshape(1,120);

        knnClassifier.addExample(features4.tolist(),0);
        knnClassifier.addExample(features0.tolist(),0);
        knnClassifier.addExample(features0again.tolist(),0);
        knnClassifier.addExample(features3.tolist(),1);
        knnClassifier.addExample(features1another.tolist(),1);
        knnClassifier.addExample(features1more.tolist(),1);
        knnClassifier.addExample(features1moreer.tolist(),1);
        knnClassifier.addExample(features1again.tolist(),1)
        knnClassifier.addExample(features1most.tolist(),1)
        knnClassifier.addExample(features5.tolist(),2);
        knnClassifier.addExample(features2again.tolist(),2);
        knnClassifier.addExample(features2another.tolist(),2);
        knnClassifier.addExample(features2more.tolist(),2);
        knnClassifier.addExample(features2moreer.tolist(),2);
        knnClassifier.addExample(features2onehopthistime.tolist(),2);
        knnClassifier.addExample(features2most.tolist(),2);
        knnClassifier.addExample(features2unlimitedpower.tolist(),2);
        knnClassifier.addExample(features2iamthesenate.tolist(),2);
        knnClassifier.addExample(features.tolist(),3);
        knnClassifier.addExample(features3again.tolist(),3);
        knnClassifier.addExample(features3another.tolist(),3);
        knnClassifier.addExample(features3more.tolist(),3);
        knnClassifier.addExample(features3morer.tolist(),3);
        knnClassifier.addExample(features3most.tolist(),3);
        knnClassifier.addExample(features3notdoingthatjokeagain.tolist(),3);
        knnClassifier.addExample(features3notyetowo.tolist(),3);
        knnClassifier.addExample(features6.tolist(),4);
        knnClassifier.addExample(features1.tolist(),5);
        knnClassifier.addExample(features5again.tolist(),5);
        knnClassifier.addExample(features7.tolist(),6);
        knnClassifier.addExample(features6again.tolist(),6);
        knnClassifier.addExample(features6another.tolist(),6);
        knnClassifier.addExample(features2.tolist(),7);
        knnClassifier.addExample(features7again.tolist(),7);
        knnClassifier.addExample(features7another.tolist(),7);
        knnClassifier.addExample(features7more.tolist(),7);
        knnClassifier.addExample(features7moreer.tolist(),7);
        knnClassifier.addExample(features7most.tolist(),7);
        knnClassifier.addExample(features8.tolist(),8);
        knnClassifier.addExample(features8again.tolist(),8);
        knnClassifier.addExample(features9.tolist(),9);
        knnClassifier.addExample(features9again.tolist(),9);

    }

}

function centerData(){
    xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = .5 - currentMean;
    for(var f = 0; f < framesOfData.shape[0]; f++){
        for(var k = 0; k < framesOfData.shape[1]; k++){
            currentX = framesOfData.get(f,k,0);
            shiftedX = currentX + horizontalShift;
            framesOfData.set(f,k,0, shiftedX);

            currentX = framesOfData.get(f,k,3);
            shiftedX = currentX + horizontalShift;
            framesOfData.set(f,k,3, shiftedX);
        }
    }

    yValues = framesOfData.slice([],[],[1,6,3]);
    var currentyMean = yValues.mean();
    var verticalShift = .5 - currentyMean;
    for(var l = 0; l < framesOfData.shape[0]; l++){
        for(var m = 0; m < framesOfData.shape[1]; m++){
            currentY = framesOfData.get(l,m,1);
            shiftedY = currentY + verticalShift;
            framesOfData.set(l,m,1, shiftedY);

            currentY = framesOfData.get(l,m,4);
            shiftedY = currentY + verticalShift;
            framesOfData.set(l,m,4, shiftedY);
        }
    }

    zValues = framesOfData.slice([],[],[2,6,3]);
    var currentzMean = zValues.mean();
    var zShift = .5 - currentzMean;
    for(var a = 0; a < framesOfData.shape[0]; a++){
        for(var b = 0; b < framesOfData.shape[1]; b++){
            currentZ = framesOfData.get(a,b,2);
            shiftedZ = currentZ + zShift;
            framesOfData.set(a,b,2, shiftedZ);

            currentZ = framesOfData.get(a,b,5);
            shiftedZ = currentZ + zShift;
            framesOfData.set(a,b,5, shiftedZ);
        }
    }
}

function Test(){
    centerData();
    var testfeatures = framesOfData.reshape(1,120);
    predictedLabel = knnClassifier.classify(testfeatures.tolist(),GotResults);
}

function GotResults(err, result) {
    predictedClassLabels.set(0,parseInt(result.label));
    numPredictions++;
    var correct;
    if (predictedClassLabels.get(0) == answer){
        correct = 1;
    }
    else {
        correct = 0;
    }
    meanPredictionAccuracySoFar = ((((numPredictions - 1) * meanPredictionAccuracySoFar) + (correct)) / numPredictions);
    console.log(predictedClassLabels.get(0),meanPredictionAccuracySoFar);


    //console.log(predictedClassLabels.get(0));
}

function HandIsTooFarToTheLeft(){
    xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    if(currentMean < .25){
        return true;
    }
    else {
        return false;
    }

}

function HandIsTooFarToTheRight(){
    xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    if(currentMean > .75){
        return true;
    }
    else {
        return false;
    }

}

function HandIsTooFarToTheClose(){
    zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    if(currentMean > .75){
        return true;
    }
    else {
        return false;
    }

}

function HandIsTooFarToTheFar(){
    zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    if(currentMean < .25){
        return true;
    }
    else {
        return false;
    }

}

function HandIsTooFarToTheUp(){
    yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    if(currentMean > .75){
        return true;
    }
    else {
        return false;
    }

}

function HandIsTooFarToTheDown(){
    yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    if(currentMean < .25){
        return true;
    }
    else {
        return false;
    }

}

function HandIsUncentered(){
    var uncentered = false;
    if(HandIsTooFarToTheLeft()){
        uncentered = true
    }
    else if(HandIsTooFarToTheRight()){
        uncentered = true;
    }
    else if(HandIsTooFarToTheFar()){
        uncentered = true;
    }
    else if(HandIsTooFarToTheClose()){
        uncentered = true;
    }
    else if(HandIsTooFarToTheUp()){
        uncentered = true;
    }
    else if(HandIsTooFarToTheDown()){
        uncentered = true;
    }

    return uncentered;
}

function DetermineState(frame){
    currentNumHands = frame.hands.length;
    if(currentNumHands == 0){
        programState = 0;
    }
    else if(HandIsUncentered()){
        programState = 1;
    }
    else{
        programState = 2;
    }
}

function HandleState0(frame){
    TrainKNNIIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
}

function TrainKNNIIfNotDoneYet(){
    if (trainingCompleted == false){
        Train();
    }
}

function HandleState1(frame){
    HandleFrame(frame);
    if(HandIsTooFarToTheLeft()){
        DrawArrowRight();
    }
    else if(HandIsTooFarToTheRight()){
        DrawArrowLeft();
    }
    else if(HandIsTooFarToTheClose()){
        DrawArrowFar();
    }
    else if(HandIsTooFarToTheFar()){
        DrawArrowClose();
    }
    else if(HandIsTooFarToTheUp()){
        DrawArrowDown();
    }
    else if(HandIsTooFarToTheDown()){
        DrawArrowUp();
    }
}

function DrawArrowRight(){
    image(left,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowLeft(){
    image(right,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowUp(){
    image(low,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowDown(){
    image(high,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowFar(){
    image(back,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowClose(){
    image(forward,window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
}

function HandleState2(frame){
    HandleFrame(frame);
    DetermineWeatherToSwitchDigits();
    DrawLowerRightPanel();
    drawLowerLeftPanel();
    Test();
}

function DrawLowerRightPanel(){
    if(startshowingonlynumbers == false){
        if(whichModeAmI() == 0){
            if(startshowingonlynumbers == true){
                if(digitToShow == 0){
                    image(new0,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 1){
                    image(new1,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 2){
                    image(new2,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 3){
                    image(new3,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 4){
                    image(new4,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 5){
                    image(new5,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 6){
                    image(new6,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 7){
                    image(new7,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 8){
                    image(new8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 9){
                    image(new9,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
            }
            else{
                if(digitToShow == 0){
                    image(digi0,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 1){
                    image(digi1,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 2){
                    image(digi2,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 3){
                    image(digi3,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 4){
                    image(digi4,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 5){
                    image(digi5,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 6){
                    image(digi6,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 7){
                    image(digi7,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 8){
                    image(digi8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
                else if(digitToShow == 9){
                    image(digi9,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

                }
            }
        }
        else if(whichModeAmI() == 1){
            if(digitToShow == 0){
                image(equ1,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 1){
                image(equ2,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 2){
                image(equ3,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 3){
                image(equ4,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 4){
                image(equ5,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 5){
                image(equ6,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 6){
                image(equ7,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 7){
                image(equ8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 8){
                image(equ9,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
            else if(digitToShow == 9){
                image(equ10,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);

            }
        }
        else{
            noStroke();
            textSize(60);
            text(alltheequationsbaybee[val],(window.innerWidth/2)+(window.innerWidth/4),(window.innerHeight/2)+(window.innerHeight/4),window.innerWidth/4,window.innerHeight/4);
        }
    }


}

function runThisMess(){

    val = Math.floor(Math.random()*alltheequationsbaybee.length-1);
    var valarray;

    if(alltheequationsbaybee[val].indexOf("+") > 0){
        valarray = alltheequationsbaybee[val].split("+");
        answer = parseInt(valarray[0]) + parseInt(valarray[1]);
    }
    else if(alltheequationsbaybee[val].indexOf("-") > 0){
        valarray = alltheequationsbaybee[val].split("-");
        answer = valarray[0] - valarray[1];
    }
    else if(alltheequationsbaybee[val].indexOf("*") > 0){
        valarray = alltheequationsbaybee[val].split("*");
        answer = valarray[0] * valarray[1];
    }
    else if(alltheequationsbaybee[val].indexOf("/") > 0){
        valarray = alltheequationsbaybee[val].split("/");
        answer = valarray[0] / valarray[1];
    }

    console.log("answer=" + answer);

    if(meanPredictionAccuracySoFar >= .60){
        addToScore();
    }

    meanPredictionAccuracySoFar = 0;
    numPredictions = 0;
    timetogo = 10;
}

function TimeToSwitchDigits(){
    var currentTime = new Date();
    var timeDifInMilliseconds = currentTime - timeSinceLastDigitChange;
    var timeDifInSeconds = timeDifInMilliseconds/1000;
    if(timeDifInSeconds > timetogo){
        timeSinceLastDigitChange = new Date();
        return true;
    }
}

function SwitchDigits(){
    var usethis;
    if(whichModeAmI() == 0){
        usethis = numlist;
    }
    else if(whichModeAmI() == 1){
        usethis = equlist;
    }

    var countchocula = 0;
    var nextnumberplease = digitToShow+1;
    var thisdigit = digitToShow;
    var skip = false;
    if(nextnumberplease == 10){
        nextnumberplease = 0;
    }

    if(comebackto.length > 0){
        digitToShow = comebackto[0];
        answer = usethis[digitToShow][0];
        comebackto.shift();
    }
    else{
        var searching = true;
        while(searching){
            if(countchocula == 9){
                if(whichModeAmI() == 0){
                    numlist[0][1] = false;
                    numlist[1][1] = false;
                    numlist[2][1] = false;
                    numlist[3][1] = false;
                    numlist[4][1] = false;
                    numlist[5][1] = false;
                    numlist[6][1] = false;
                    numlist[7][1] = false;
                    numlist[8][1] = false;
                    numlist[9][1] = false;
                    startshowingonlynumbers = true;
                    skip = true;
                }
                else if(whichModeAmI() == 1){
                    equlist[0][1] = false;
                    equlist[1][1] = false;
                    equlist[2][1] = false;
                    equlist[3][1] = false;
                    equlist[4][1] = false;
                    equlist[5][1] = false;
                    equlist[6][1] = false;
                    equlist[7][1] = false;
                    equlist[8][1] = false;
                    equlist[9][1] = false;
                }
                searching = false;
                countchocula = 0;
                digitToShow = 0;
                comebackto = [];
                times[0] = 5;
                times[1] = 5;
                times[2] = 5;
                times[3] = 5;
                times[4] = 5;
                times[5] = 5;
                times[6] = 5;
                times[7] = 5;
                times[8] = 5;
                times[9] = 5;
            }
            else{
                if((usethis[nextnumberplease][1]) == false){
                    answer = usethis[nextnumberplease][0];
                    digitToShow = nextnumberplease;
                    searching = false;
                }
                else{
                    countchocula+=1
                    nextnumberplease+=1
                    if(nextnumberplease == 10){
                        nextnumberplease = 0;
                    }
                }
            }
        }
    }
    if(skip == false){
        if(meanPredictionAccuracySoFar >= .60){
            addToScore();
            if(whichModeAmI() == 0){
                numlist[thisdigit][1] = true;
            }
            else if(whichModeAmI() == 1){
                equlist[thisdigit][1] = true;
            }
        }
        else{
            comebackto.push(thisdigit);
            times[thisdigit] = times[thisdigit]+1;

        }
    }
    meanPredictionAccuracySoFar = 0;
    numPredictions = 0;
    timetogo = times[thisdigit];
}

function whichModeAmI(){
    return mode;
}

function hardMath(){
    Identity = String(username) + "_mathYes";
    listitems = document.getElementById(Identity);
    if(listitems.innerHTML.toString() == "true"){
        if(whichModeAmI() == 0 || whichModeAmI() == 1){
            mode = 2;
        }
        else{
            mode = 0;
        }
        comebackto=[]
        digitToShow=0
        numlist[0][1] = false;
        numlist[1][1] = false;
        numlist[2][1] = false;
        numlist[3][1] = false;
        numlist[4][1] = false;
        numlist[5][1] = false;
        numlist[6][1] = false;
        numlist[7][1] = false;
        numlist[8][1] = false;
        numlist[9][1] = false;
        times[0] = 5;
        times[1] = 5;
        times[2] = 5;
        times[3] = 5;
        times[4] = 5;
        times[5] = 5;
        times[6] = 5;
        times[7] = 5;
        times[8] = 5;
        times[9] = 5;
    }
}

function switchModes(){
    if(whichModeAmI() == 0){
        mode = 1;
    }
    else if(whichModeAmI() == 1){
        mode = 0;
    }
    else{
        mode = 0;
    }
    comebackto=[]
    digitToShow=0
    numlist[0][1] = false;
    numlist[1][1] = false;
    numlist[2][1] = false;
    numlist[3][1] = false;
    numlist[4][1] = false;
    numlist[5][1] = false;
    numlist[6][1] = false;
    numlist[7][1] = false;
    numlist[8][1] = false;
    numlist[9][1] = false;
    times[0] = 5;
    times[1] = 5;
    times[2] = 5;
    times[3] = 5;
    times[4] = 5;
    times[5] = 5;
    times[6] = 5;
    times[7] = 5;
    times[8] = 5;
    times[9] = 5;
}

function DetermineWeatherToSwitchDigits(){
    if(TimeToSwitchDigits()){
        if(whichModeAmI() == 0 || whichModeAmI() == 1){
            SwitchDigits();
        }
        else{
            runThisMess();
        }
    }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0,window.innerWidth/2,window.innerHeight/2);
}

function SignIn(){
    username = document.getElementById('username').value;
    //console.log(username);
    list = document.getElementById('users');

    if(IsNewUser(username,list) == true){
        CreateNewUser(username,list);
        CreateSignInItem(username,list);
        CreatePersonalBestItem(username,list);
        CreateCurrentScoreItem(username,list);
        CreateMathYesItem(username,list);
    }
    else {
        ID = String(username) + "_signins";
        listItem = document.getElementById(ID);
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
        resetCurrentScore();

        Id2 = String(username) + "_mathYes";
        listItemss = document.getElementById(Id2);
    }
    return false;
}

function CreateNewUser(username,list){
    var item = document.createElement('li');
    item.innerHTML = String(username);
    item.id = String(username) + "_name";
    list.appendChild(item);
}

function CreateSignInItem(username,list){
    var item2 = document.createElement('li');
    item2.innerHTML = 1;
    item2.id = String(username) + "_signins";
    list.appendChild(item2);
}

function CreatePersonalBestItem(username,list){
    var item3 = document.createElement('li');
    item3.innerHTML = 0;
    item3.id = String(username) + "_personalBest";
    list.appendChild(item3);
}

function CreateCurrentScoreItem(username,list){
    var item4 = document.createElement('li');
    item4.innerHTML = 0;
    item4.id = String(username) + "_currentScore";
    list.appendChild(item4);

}

function CreateMathYesItem(username,list){
    var item5 = document.createElement('li');
    item5.innerHTML = "false";
    item5.id = String(username) + "_mathYes";
    list.appendChild(item5);

}

function IsNewUser(username,list){
    var users = list.children;
    var usernameFound = false;
    for(var i = 0; i < users.length; i++){
        if(username == users[i].innerHTML){
            usernameFound = true;
        }
    }
    usernew = usernameFound == false;
    return usernameFound == false;
}

function drawLowerLeftPanel(){

    noStroke();
    textSize(20);
    //noFill();
    //RightSide
    if(usernew == true){
        text("Try and set a high score!",0,window.innerHeight/2,window.innerWidth/4,window.innerHeight/4);
    }
    else{
        if(bestBeat == false){
            text("Try and beat your high score!",0,window.innerHeight/2,window.innerWidth/4,window.innerHeight/4);
        }
        else{
            text("Keep it up!",0,window.innerHeight/2,window.innerWidth/4,window.innerHeight/4);
        }
    }
    ID = String(username) + "_currentScore";
    listItem = document.getElementById(ID);
    ID2 = String(username) + "_personalBest";
    listItem2 = document.getElementById(ID2);
    text("Current score = " + listItem.innerHTML,0,(window.innerHeight/2)+(window.innerHeight/4),window.innerWidth/4,window.innerHeight/8);
    text("High score = " + listItem2.innerText,0,(window.innerHeight/2)+(window.innerHeight/4)+(window.innerHeight/8),window.innerWidth/4,window.innerHeight/8);

    //Left Side
    text("Scoreboard",window.innerWidth/4,window.innerHeight/2,window.innerWidth/4,window.innerHeight/8);
    var scores = [];
    var userscore = [];
    for(var i = 0; i < list.children.length; i+=5){
        userscore.push(list.children[i].innerHTML);
        scores.push(userscore);
        userscore = [];
    }
    count = 0
    for(var k = 0; k < scores.length; k+=1){
        Ident = String(scores[k]) + "_personalBest";
        listitems = document.getElementById(Ident);
        scores[k].push((parseInt(listitems.innerHTML)).toString());
    }

    scores.sort(function (a,b){
        return b[1] - a[1];
    });

    newcount = 0
    for(var f = 0; f < scores.length; f++){
        text(scores[f][0] + " = " + scores[f][1],window.innerWidth/4,(window.innerHeight/2)+(window.innerHeight/8)+((newcount*3*window.innerHeight)/(8*scores.length)),window.innerWidth/4,(3*window.innerHeight)/(8*scores.length));
        newcount+=1;
    }

}



function resetCurrentScore(){
    ID = String(username) + "_currentScore";
    listItem = document.getElementById(ID);
    listItem.innerHTML = 0;
}

function addToScore(){
    ID = String(username) + "_currentScore";
    listItem = document.getElementById(ID);

    if(whichModeAmI() == 0){
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    }
    else if(whichModeAmI() == 1){
        listItem.innerHTML = parseInt(listItem.innerHTML) + 2;
    }
    else if(whichModeAmI() == 2){
        listItem.innerHTML = parseInt(listItem.innerHTML) + 3;
    }

    ID2 = String(username) + "_personalBest";
    listItem2 = document.getElementById(ID2);

    if(parseInt(listItem.innerHTML) > parseInt(listItem2.innerHTML)){
        listItem2.innerHTML = parseInt(listItem.innerHTML);
        bestBeat = true;
    }

    if(parseInt(listItem2.innerHTML) >= 10){
        Identity = String(username) + "_mathYes";
        listitemsss = document.getElementById(Identity);
        listitemsss = "true";
    }
}

Leap.loop(controllerOptions, function(frame){
    clear();
    DetermineState(frame);
    if (programState==0) {
        HandleState0(frame);
    }
    else if (programState==1) {
        HandleState1(frame);
    }
    else if (programState==2) {
        HandleState2(frame);
    }
    previousNumHands = currentNumHands;
});