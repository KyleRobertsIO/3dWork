function subHill(obj, bigHill) {
    let hillRadius = Math.floor((Math.random() * (12 - 3) + 3));
    let miniHill = createSphere(hillRadius, 0x3c9e19);
    let rng = Math.floor((Math.random() * 2) + 1);
    if (rng == 2) {
        let bigHillRadius = bigHill.geometry.parameters.radius;
        if (hillRadius > bigHillRadius) {
        } else {
            miniHill.position.y = bigHill.position.y;
            miniHill.position.z = bigHill.position.z;
            miniHill.position.x = bigHill.position.x + bigHillRadius;
            obj.add(miniHill);
        }
    }
}

function rngHills() {
    let hillsObj = new THREE.Group();
    let hills = [];
    let generatedHills = Math.floor((Math.random() * 5) + 1);
    let objLength = 0;
    let firstHillRadius = 0;
    for (let i = 0; i < generatedHills; i++) {
        let radius = Math.floor(Math.random() * (15 - 3) + 3);
        let hill = createSphere(radius, 0x3c9e19);
        hill.position.y = -radius / 2 * 0.8;
        if (hills.length > 0) {
            let prevHill = hills[i - 1].geometry.parameters.radius;
            if (radius > prevHill * 2) {
                i--; // Remove hill fail
            } else {
                hill.position.z = hills[i - 1].position.z + prevHill;
                objLength = hill.position.z + radius;
                subHill(hillsObj, hill);
                hills.push(hill); // Add Hill to group
                hillsObj.add(hill);
            }
        } else { //If the first hill
            firstHillRadius = radius;
            objLength = hill.position.z + radius;
            subHill(hillsObj, hill);
            hills.push(hill);
            hillsObj.add(hill);
        }
    }
    hillsObj.position.y = 0;
    let posZ = objLength;
    let negZ = -firstHillRadius;
    let hillCluster = {
        model: hillsObj,
        length: objLength,
        posZ: posZ,
        negZ: negZ
    }
    return hillCluster;
}

function createTree() {
    let tree = new THREE.Group();

    let treeHeight = Math.random() * (6 - 3) + 3;
    let treeRadius = Math.random() * (5 - 1) + 1;

    let trunkRadius = (treeRadius * 0.1)
    let trunk = createCylinder(trunkRadius, trunkRadius, 16, 2.5, 0x664517);
    trunk.position.y = 0;
    tree.add(trunk);

    let position = 2.5;
    for (let i = 0; i < 5; i++) {
        let cone = createCylinder((treeRadius * 0.2), treeRadius, 16, treeHeight, 0x40802a);
        cone.position.y = position;
        tree.add(cone);
        position += treeHeight * 0.4;
        treeRadius = treeRadius * 0.80;
    }
    obj = {
        model: tree,
        radius: treeRadius
    }
    return obj;
}