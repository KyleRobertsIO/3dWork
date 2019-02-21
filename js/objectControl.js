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