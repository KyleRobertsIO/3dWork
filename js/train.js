var trackCopy;
var hill;

function init() {
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    /* Train Objects */
    var plane = createPlane(1000, 0x3c9e19);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    plane.name = "generalPlane";

    // Steam Engine
    var topHalf = createCube(2.5, 2, 8, 0x0077ff);
    topHalf.position.y = 2.5;
    topHalf.position.z = 1;
    var steamEngine = createCube(2.5, 3, 10, 0x0077ff);
    steamEngine.position.y = 2.25;
    steamEngine.add(topHalf);
    steamEngine.name = "train";
    scene.add(steamEngine);

    // Cart
    var cart = createCube(2.5, 5, 10, 0x0077ff);
    cart.position.y = 1;
    cart.position.z = 11;
    steamEngine.add(cart);

    //Wheels
    var wheelGroup = new THREE.Group();
    var position = -3;
    for (let i = 0; i < 4; i++) {
        let wheel = createCylinder(0.5, 0.5, 16, 3, 0xff0000);
        wheel.position.set(0, 0.5, position);
        wheel.rotation.z = Math.PI / 2;
        position += 2;
        wheelGroup.add(wheel)
    }
    var wheelGroup2 = wheelGroup.clone();
    wheelGroup2.position.z = 11;
    wheelGroup.add(wheelGroup2);
    wheelGroup.position.y = -1.75;
    steamEngine.add(wheelGroup);

    /* Train Objects */

    /* Track */
    var track = createCube(4, 0.5, 50, 0x7d5514);
    track.name = "track";
    scene.add(track);

    var railLeft = createCube(0.5, 0.25, 50, 0x585956);
    railLeft.position.x = 1.5;
    railLeft.position.y = 0.375;

    var railRight = railLeft.clone();
    railRight.position.x = -1.5;
    track.add(railLeft, railRight);

    var boards = new THREE.Group();
    var boardZ = -24;
    for (let i = 0; i < 25; i++) {
        var board = createCube(3, 0.125, 1, 0x573d11);
        board.position.y = 0.3;
        board.position.z = boardZ;
        boardZ += 2;
        boards.add(board);
    }
    track.add(boards);

    trackCopy = track.clone();
    trackCopy.name = "trackCopy";
    trackCopy.position.z = -50;
    scene.add(trackCopy);
    /* Track */

    /* Hills */
    var hill = createSphere(14, 0x3c9e19);
    hill.position.y = -7;
    hill.position.x = -30;
    hill.position.z = -80;
    hill.name = "hill";
    scene.add(hill);
    /* Hills */

    /* Lights */

    // Spotlight
    var spotLight = new THREE.SpotLight(0xffffff, 0.4);
    spotLight.position.set(100, 50, -50);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    var orb = createSphere(3, 0xff0000);
    spotLight.add(orb);
    scene.add(spotLight);

    /* Lights */

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.position.x = 50;
    camera.position.y = 15;
    camera.position.z = -10;
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

var addedTrack = false;
var speed = 0.3;
var count = 0;
var hillMove = false;

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene, camera
    );

    count += speed;
    if (count > 20) {
        let rng = Math.floor((Math.random() * 10) + 1);
        if(rng > 1){
            hillMove = true;
        }
        count = 0;
    }

    if(hillMove == true){
        scene.getObjectByName("hill").position.z += speed;
        if(scene.getObjectByName("hill").position.z > 80){
            scene.getObjectByName("hill").position.z = -80;
            hillMove = false;
        }
    }

    scene.getObjectByName("track").position.z += speed;
    scene.getObjectByName("trackCopy").position.z += speed;

    if (scene.getObjectByName("trackCopy").position.z >= 50) {
        scene.getObjectByName("trackCopy").position.z = -49.75;
    }
    if (scene.getObjectByName("track").position.z >= 50) {
        scene.getObjectByName("track").position.z = -49.875;
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

var scene = init();

/*
    Todo List:
     - Make the object background moduler
     - Different hill types
     - Mountains
     - Trees
     - Raised track on hill
*/