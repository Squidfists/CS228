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


nj.config.printThreshold = 1000;
function HandleFrame(frame) {

    if (frame.hands.length > 0) {
        hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand,InteractionBox);
        Test();
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

    var canvasXPrev = window.innerWidth * normalizedPrevJoint[0];
    var canvasYPrev = window.innerHeight * (1 - normalizedPrevJoint[1]);
    var canvasXNext = window.innerWidth * normalizedNextJoint[0];
    var canvasYNext = window.innerHeight * (1 - normalizedNextJoint[1]);

    line(canvasXNext,canvasYNext,canvasXPrev,canvasYPrev);

}
function Train(){
    trainingCompleted = true;
    for (var l = 0; l < 2; l++){
        //console.log( train0.pick(null,null,null,l).toString() );
        var features = train3.pick(null,null,null,l);
        features = features.reshape(1,120);

        var features1 = train5.pick(null,null,null,l);
        features1 = features1.reshape(1,120);

        var features2 = train7.pick(null,null,null,l);
        features2 = features2.reshape(1,120);

        var features3 = train1.pick(null,null,null,l);
        features3 = features3.reshape(1,120);

        var features4 = train0.pick(null,null,null,l);
        features4 = features4.reshape(1,120);

        var features5 = train2.pick(null,null,null,l);
        features5 = features5.reshape(1,120);

        var features6 = train4.pick(null,null,null,l);
        features6 = features6.reshape(1,120);

        var features7 = train6.pick(null,null,null,l);
        features7 = features7.reshape(1,120);

        var features8 = train8.pick(null,null,null,l);
        features8 = features8.reshape(1,120);

        var features9 = train9.pick(null,null,null,l);
        features9 = features9.reshape(1,120);

        knnClassifier.addExample(features4.tolist(),0);
        knnClassifier.addExample(features3.tolist(),1);
        knnClassifier.addExample(features5.tolist(),2);
        knnClassifier.addExample(features.tolist(),3);
        knnClassifier.addExample(features6.tolist(),4);
        knnClassifier.addExample(features1.tolist(),5);
        knnClassifier.addExample(features7.tolist(),6);
        knnClassifier.addExample(features2.tolist(),7);
        knnClassifier.addExample(features8.tolist(),8);
        knnClassifier.addExample(features8.tolist(),9);
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
    var correct = 0;
    if (predictedClassLabels.get(0) == 9){
        correct = 1;
    }
    else {
        correct = 0;
    }
    meanPredictionAccuracySoFar = ((((numPredictions - 1) * meanPredictionAccuracySoFar) + (correct)) / numPredictions);
    console.log([numPredictions,meanPredictionAccuracySoFar,predictedClassLabels.get(0)]);


    //console.log(predictedClassLabels.get(0));
}

Leap.loop(controllerOptions, function(frame){
    currentNumHands = frame.hands.length;
    clear();
    if (trainingCompleted == false){
        Train();
    }
    HandleFrame(frame);
    previousNumHands = currentNumHands;
});