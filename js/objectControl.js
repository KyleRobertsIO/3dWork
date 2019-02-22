function randomTreeSpawns(scene){
    let treeArray = [];
    let trees = new THREE.Group();
    position = 0;
    for(let i = 0; i < 5; i++){

        var tree = treeGen();
        tree.name = "tree-" + i;
        tree.position.y = 1.25;
        tree.position.x = position;
        position -= 5;

        let rngPosition = Math.random() * (10 - (-10)) + (-10);
        tree.position.z = rngPosition;

        treeArray.push(tree);
        trees.add(tree);
    }
    scene.add(trees);
    trees.position.x = -7;
}

function buildChunk(scene){
    let CHUNK = new THREE.Group();


    let hillArray = [];
    let hillCount = Math.random() * (3 - 1) + 1;

    for(let i = 0; i < hillCount; i++){
        let hillObject = rngHills();
        let randomHillZ = Math.floor(Math.random() * (80 - (-80)) + (-80));
        if(hillArray == 0){
            hillObject.model.position.z = randomHillZ;
            hillArray.push(hillObject);
        }else{
            // Loop through hillArray hill positions
        }
        
    }

    /*for(let i = 0; i < 3; i++){

        hillObject.model.position.z = randomHillZ;
        hillObject.model.position.x = -28;
        CHUNK.add(hillObject.model);
    }*/

    CHUNK.position.z = 0;
    CHUNK.position.y = 50;
    scene.add(CHUNK);
}