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


nj.config.printThreshold = 1000;
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
    var correct = 0;
    if (predictedClassLabels.get(0) == 9){
        correct = 1;
    }
    else {
        correct = 0;
    }
    meanPredictionAccuracySoFar = ((((numPredictions - 1) * meanPredictionAccuracySoFar) + (correct)) / numPredictions);
    console.log(predictedClassLabels.get(0));


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
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0,window.innerWidth/2,window.innerHeight/2);
}

function SignIn(){
    username = document.getElementById('username').value;
    //console.log(username);
    var list = document.getElementById('users');

    if(IsNewUser(username,list) == true){
        CreateNewUser(username,list);
        CreateSignInItem(username,list);
    }
    else {
        ID = String(username) + "_signins"
        listItem = document.getElementById(ID);
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    }
    console.log(list.innerHTML);
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

function IsNewUser(username,list){
    var users = list.children;
    var usernameFound = false;
    for(var i = 0; i < users.length; i++){
        if(username == users[i].innerHTML){
            usernameFound = true;
        }
    }
    return usernameFound == false;
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