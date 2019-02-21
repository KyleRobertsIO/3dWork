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
    hillCount = Math.random() * (3 - 1) + 1;
    for(let i = 0; i < hillCount; i++){

        let hills = randomHillGen();
        
        hills.model.position.z = Math.floor(Math.random() * (80 - (-80)) + (-80));

        let posZ = hills.model.position.z + hills.length / 2;
        let negZ = hills.model.position.z - hills.length / 2;

        if(hillArray.length > 0){
            for(let j = 0; j < hillArray.length; i++){
                if(hillArray[j].posZ > posZ && hillArray[j].negZ < negZ){
                    console.log("Overlapping hills");
                }
            }
        }

        let hillObject = {
            model: hills.model.position.z,
            length: hills.length,
            posZ: posZ,
            negZ: negZ
        }

        hillArray.push(hillObject);
        CHUNK.add(hills.model);
    }
    console.log(hillArray);


    CHUNK.position.z = 0;
    CHUNK.position.y = 50;
    scene.add(CHUNK);
}