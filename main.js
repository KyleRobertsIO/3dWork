function init() {
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var enableFog = false;
    if (enableFog) {
        scene.fog = new THREE.FogExp2(0xff0000, 0.1);
    }

    /* Adding to scene below */

    var ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    var plane = createPlane(100);
    plane.rotation.x = Math.PI / 2;
    plane.name = "plane-1";

    var boxGrid = createBoxGrid(5, 5);
    boxGrid.name = "boxGrid";
    boxGrid.position.y = 0;

    var pointLight = createPointLight(0.5);
    pointLight.position.y = 20;
    pointLight.position.x = 0;
    pointLight.position.z = 0;

    var sphere = createSphere(0.05);

    scene.add(boxGrid);
    scene.add(plane);
    pointLight.add(sphere);
    scene.add(pointLight);

    /* Adding to scene above */

    gui.add(pointLight, 'intensity');
    gui.add(pointLight.position, 'x', -20, 20);
    gui.add(pointLight.position, 'z', -20, 20);
    gui.add(pointLight.position, 'y', 1, 20);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 50;
    camera.position.x = 50;
    camera.position.y = 50;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x777777);
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

var change = false;

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    if (change == true) {
        var boxGrid = createBoxGrid(5, 5);
        boxGrid.name = "boxGrid";
        boxGrid.position.y = 0;
        scene.add(boxGrid);
        change = false;
        setTimeout(function () {
            scene.remove(scene.getObjectByName("boxGrid"));
            change = true;
        }, 2000);
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    })
}

function createPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}

function createCube(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        color: rgbRandom()
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    //mesh.castShadow = true;
    return mesh;
}

function createBoxGrid(amount, separationMuliplier) {
    var group = new THREE.Group();
    for (var i = 0; i < amount; i++) {
        var random = Math.random() * 10 + 1;
        var obj = createCube(1, random, 1);
        obj.position.x = i * separationMuliplier;
        obj.position.y = obj.geometry.parameters.height / 2;
        group.add(obj);
        for (var j = 1; j < amount; j++) {
            random = random = Math.random() * 10 + 1;
            var obj = createCube(1, random, 1);
            obj.position.x = i * separationMuliplier;
            obj.position.y = obj.geometry.parameters.height / 2;
            obj.position.z = j * separationMuliplier;
            group.add(obj);
        }
    }

    group.position.x = -(separationMuliplier * (amount - 1) / 2);
    group.position.z = -(separationMuliplier * (amount - 1) / 2);

    return group;
}

function createSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function createPlane(size) {
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 0x444444,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    return mesh;
}

function rgbRandom() {
    var hue = 'rgb(' + (Math.floor(Math.random() * 256))
        + ',' + (Math.floor(Math.random() * 256))
        + ',' + (Math.floor(Math.random() * 256)) + ')';
    return hue;
}

var scene = init();
setTimeout(function () {
    scene.remove(scene.getObjectByName("boxGrid"));
    change = true;
}, 2000);