const knnClassifier = ml5.KNNClassifier();

function Train(){
    trainingCompleted = true;
    for (var l = 0; l < train0.shape[3]; l++){
        //console.log( train0.pick(null,null,null,l).toString() );
        var features = train0.pick(null,null,null,l);
        features = features.reshape(1,120);
        //console.log(features.toString());
        knnClassifier.addExample(features.tolist(),0);
    }
}

function Test(){

}


function draw(){
    clear();

    if (trainingCompleted == false){
        Train();
    }

    Test();

}