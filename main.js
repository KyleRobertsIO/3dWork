function init() {
    var scene = new THREE.Scene();

    var enableFog = false;
    if(enableFog){
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    /* Adding to scene below */

    var plane = createPlane(20);
    plane.rotation.x = Math.PI / 2;
    plane.name = "plane-1";

    var box = createCube(1, 1, 1);
    box.position.y = box.geometry.parameters.height / 2;

    var pointLight = createPointLight(5);
    pointLight.position.y = 2;
    //pointLight.position.x = 3;
    //pointLight.position.z = 2;

    var sphere = createSphere(0.05);

    scene.add(box);
    //plane.add(box);
    scene.add(plane);
    pointLight.add(sphere);
    scene.add(pointLight);

    /* Adding to scene above */

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 2;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x777777);
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);

    return scene;
}

function update(renderer, scene, camera){
    renderer.render(
        scene,
        camera
    );

    /*var plane = scene.getObjectByName('plane-1');
    plane.rotation.y += 0.01;
    plane.rotation.x += 0.01;

    scene.traverse(function(child){
        child.scale.x += 0.01;
    })*/

    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    })
}

function createPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    return light;
}

function createCube(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        color: 0x555555
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function createSphere(size){
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

function createPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

var scene = init();