function init() {
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    var plane = createPlane(100, 0x333333);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    plane.name = "generalPlane";

    /* ADDED CONTENT */

    rings = [];
    space = 0;
    for(var i = 0; i < 10; i++){
        space += 10;
        var ring = createRing(10, 0.5, 0xff0000);
        ring.position.z = i - 59.5 + space;
        ring.name = "r" + i;
        rings.push(ring);
        scene.add(ring);
    }

    /* ADDED CONTENT */

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = -100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

var swap = false;
var turn = false;
var angle = 0;

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene, camera
    );

    console.log(camera.rotation.y);
    if(turn == true){
        if(camera.rotation.y >= Math.PI){
            if(camera.rotation.y >= Math.PI + Math.PI){
                turn = false;
                camera.rotation = 0;
            }else{
                camera.rotation.y += 0.2;
            }
        }else{
            if(camera.rotation.y == Math.PI.toFixed(2)){
                turn = false;
                camera.rotation.y = Math.PI;
            }else{
                camera.rotation.y += 0.2;
            }
        }
    }else{
        if(swap == true){
            camera.position.z -= 1;
            if(camera.position.z <= -100){
                swap = false;
                turn = true;
            }
        }else if(swap == false){
            camera.position.z += 1;
            if(camera.position.z >= 100){
                swap = true;
                turn = true;
            }
        }
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

var scene = init();

/*function spin() {
    setInterval(function(){
        let angle = scene.getObjectByName("s0").rotation.z;
        if(angle * 180 / Math.PI == 359){
            scene.getObjectByName("s0").rotation.z = 0;
        }else{
            angle = angle * 180 / Math.PI + 0.01;
            scene.getObjectByName("s0").rotation.z = angle;
            console.log(angle);
        }
    }, 10)
    setTimeout(function(){
        setInterval(function(){
            let angle = scene.getObjectByName("s1").rotation.z;
            angle = angle * 180 / Math.PI + 0.01;
            scene.getObjectByName("s1").rotation.z = angle;
        }, 10)
    }, 300);
}

    var light = createPointLight(1);
    light.position.y = 50;
    light.position.x = 50;
    scene.add(light);

    var s1 = createCube(10, 10, 1, 0xff0000);
    s1.position.z = 0;
    s1.position.y = 5;

    var s2 = createCube(10, 10, 1, 0x00ff00);
    s2.position.z = 1;
    s2.position.y = 5;

    var s3 = createCube(10, 10, 1, 0x0000ff);
    s3.position.z = 2;
    s3.position.y = 5;

    array = [s1, s2, s3];

    for (var i = 0; i < array.length; i++) {
        array[i].name = "s" + i;
        console.log(array[i].name);
        scene.add(array[i]);
    }*/