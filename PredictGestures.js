const knnClassifier = ml5.KNNClassifier();

var trainingCompleted = false;
var predictedLabel;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros([test.shape[3]]);

function Train(){
    trainingCompleted = true;
    for (var l = 0; l < train0.shape[3]; l++){
        //console.log( train0.pick(null,null,null,l).toString() );
        var features = train0.pick(null,null,null,l);
        features = features.reshape(1,120);

        var features1 = train1.pick(null,null,null,l);
        features1 = features1.reshape(1,120);

        knnClassifier.addExample(features.tolist(),0);
        knnClassifier.addExample(features1.tolist(),1);
    }

}

function Test(){
    for (var i = 0; i < test.shape[3]; i++){
        var testfeatures = test.pick(null,null,null,i);
        testfeatures = testfeatures.reshape(1,120);
        predictedLabel = knnClassifier.classify(testfeatures.tolist(),GotResults);
    }
}

function GotResults(err, result) {
    predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
    console.log([testingSampleIndex,predictedClassLabels.get(testingSampleIndex)]);
    testingSampleIndex++;
    if (testingSampleIndex >= test.shape[3]) {
        testingSampleIndex = 0;
    }
}


function draw(){
    clear();

    if (trainingCompleted == false){
        Train();
    }

    Test();
}