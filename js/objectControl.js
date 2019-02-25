function randomTreeSpawns(hills) {
    let treeArray = [];
    let trees = new THREE.Group();
    position = 0;
    for (let i = 0; i < 5; i++) {
        var tree = createTree();
        tree.model.position.y = 1.25;
        tree.model.position.x = position;
        position -= 5;
        let rngPosition = Math.floor(Math.random() * (10 - (-10)) + (-10));
        tree.model.position.z = rngPosition;
        treeArray.push(tree);
        trees.add(tree.model);
    }

    let treePositionsZ = [];
    for (let i = 0; i < treeArray.length; i++) {
        treePositionsZ.push(treeArray[i].model.position.z);
    }
    let treesPosZ = Math.max.apply(null, treePositionsZ);
    let treesNegZ = Math.min.apply(null, treePositionsZ);

    /*let w1 = createPlane(50, 0xff0000);
    w1.position.z = treesPosZ;
    let w2 = createPlane(50, 0xff0000);
    w2.position.z = treesNegZ;
    trees.add(w1, w2);*/

    for(let i = 0; i < hills.length; i++){
        let hillPosZ = hills[i].model.position.z + hills[i].posZ;
        let hillNegZ = hills[i].model.position.z - hills[i].negZ;
        if(
            (hillPosZ > treesPosZ && hillNegZ < treesPosZ)
            ||
            (hillPosZ > treesNegZ && hillNegZ < treesNegZ)
            ){
            console.log('overlap');
        }else{
            console.log('valid');
        }  
    }

    trees.position.x = -7;
    let obj = {
        model: trees,
        posZ: treesPosZ,
        negZ: treesNegZ
    }
    return obj;
}

function createHills() {
    let hillArray = [];
    let hillClusters = new THREE.Group();
    let hillCount = Math.floor(Math.random() * (4 - 1) + 1);
    for (let i = 0; i < hillCount; i++) {
        let hillObject = rngHills();
        let randomHillZ = Math.floor(Math.random() * (80 - (-80)) + (-80));
        if (i == 0) {
            hillObject.model.position.z = randomHillZ;
            hillClusters.add(hillObject.model);
            hillArray.push(hillObject);
        } else if (i > 0) {
            let currentPosZ = randomHillZ + hillObject.posZ;
            let currentNegZ = randomHillZ - hillObject.negZ;
            let validPosition = false;
            for (let j = 0; j < hillArray.length; j++) {
                let prevPosZ = hillArray[j].model.position.z + hillArray[j].posZ;
                let prevNegZ = hillArray[j].model.position.z - hillArray[j].negZ;
                if (
                    (prevPosZ > currentPosZ && prevNegZ < currentPosZ)
                    ||
                    (prevPosZ > currentNegZ && prevNegZ < currentNegZ)
                ) {
                    i--; // Retry a generation
                    validPosition = false;
                    break;
                } else {
                    validPosition = true;
                }
            }
            if (validPosition == true) {
                hillObject.model.position.z = randomHillZ;
                hillClusters.add(hillObject.model);
                hillArray.push(hillObject);
            }

        }
    }
    let obj = {
        hills: hillArray,
        model: hillClusters
    }
    return obj;
}

/*
    Chunk Render Steps:
    - Create hills
    - Check if hills overlap
    - Create tree and check is they overlap with hills
*/
function buildChunk(scene) {
    let CHUNK = new THREE.Group();
    let hillClusters = createHills();
    CHUNK.add(hillClusters.model);

    CHUNK.add(randomTreeSpawns(hillClusters.hills).model);

    CHUNK.position.x = -28;
    CHUNK.position.z = 0;
    CHUNK.position.y = 0;
    scene.add(CHUNK);
}