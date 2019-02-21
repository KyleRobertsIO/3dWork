function hillGen(){
    var hill = createSphere(14, 0x3c9e19);
    hill.position.y = -7;
    hill.position.x = -30;
    hill.position.z = -80;
    hill.name = "hill";
    return hill;
}

function randomHillGen(){
    let hills = new THREE.Group();
    let hillArray = [];
    let hillCount = Math.floor((Math.random() * 15) + 1);
    var addHill = true;

    for(let i = 0; i < hillCount; i++){
        let radius = Math.random() * (15 - 3) + 3;
        let hill = createSphere(radius, 0x3c9e19);
        
        hill.position.x = -30;
        hill.position.y = -radius / 2 * 0.7;

        if(hillArray.length > 0){
            let prevHillRadius = hillArray[i-1].geometry.parameters.radius;
            if((prevHillRadius * 2) > radius){

                switch(Math.floor((Math.random() * 2) + 1)){
                    case 1: 
                        hill.position.z = hillArray[i-1].position.z + prevHillRadius;
                        break;
                    case 2: 
                        let predictedDistanceToTrack = hillArray[i-1].position.x + (prevHillRadius * 2);
                        if(predictedDistanceToTrack <= -4){
                            switch(Math.floor((Math.random() * 2) + 1)){
                                case 1:
                                    hill.position.x = hillArray[i-1].position.x - prevHillRadius; //Place away
                                    break;
    
                                case 2:
                                    hill.position.x = hillArray[i-1].position.x + prevHillRadius; //Place to
                                    break;
                            }
                        }else{
                            hill.position.x = hillArray[i-1].position.x - prevHillRadius;
                        }
                        break;
                }

                addHill = true;
            }else{
                i--;
                addHill = false;
            }
        }

        if(addHill == true){
            hills.add(hill);
            hillArray.push(hill);
            addHill = false;
        }

    }
    return hills;
}

function treeGen(){
    let tree = new THREE.Group();

    let treeHeight = Math.random() * (6 - 3) + 3;
    let treeRadius = Math.random() * (5 - 1) + 1;

    let trunkRadius = (treeRadius * 0.1)
    let trunk = createCylinder(trunkRadius, trunkRadius, 16, 2.5, 0x664517);
    trunk.position.y = 0;
    tree.add(trunk);

    let position = 2.5;
    for(let i = 0; i < 5; i++){
        let cone = createCylinder((treeRadius * 0.2), treeRadius, 16, treeHeight, 0x40802a);
        cone.position.y = position;
        tree.add(cone);
        position += treeHeight * 0.4;
        treeRadius = treeRadius * 0.80;
    }

    return tree;
}