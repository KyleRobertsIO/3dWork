function randomTreeSpawns(scene) {
    let treeArray = [];
    let trees = new THREE.Group();
    position = 0;
    for (let i = 0; i < 5; i++) {

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

function buildChunk(scene) {
    let CHUNK = new THREE.Group();


    let hillArray = [];
    let hillCount = Math.floor(Math.random() * (4 - 1) + 1);

    for (let i = 0; i < hillCount; i++) {
        let hillObject = rngHills();
        let randomHillZ = Math.floor(Math.random() * (80 - (-80)) + (-80));
        if (i == 0) {
            hillObject.model.position.z = randomHillZ;
            CHUNK.add(hillObject.model);
            hillArray.push(hillObject);
        } else if(i > 0) {
            let currentPosZ = randomHillZ + hillObject.posZ;
            let currentNegZ = randomHillZ - hillObject.negZ;
            for (let j = 0; j < hillCount; j++) {
                let prevPosZ = hillArray[j].model.position.z + hillArray[j].posZ;
                let prevNegZ = hillArray[j].model.position.z - hillArray[j].negZ;
                if (
                    (prevPosZ > currentPosZ && prevNegZ < currentPosZ)
                    ||
                    (prevPosZ > currentNegZ && prevNegZ < currentNegZ)
                ) {
                    console.log('fail');
                    i--; // Retry a generation
                    break;
                } else {
                    hillObject.model.position.z = randomHillZ;
                    CHUNK.add(hillObject.model);
                    hillArray.push(hillObject);
                }
            }
        }
    }

    CHUNK.position.z = 0;
    CHUNK.position.y = 50;
    scene.add(CHUNK);
}