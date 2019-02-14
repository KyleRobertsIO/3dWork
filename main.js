function init() {
    var scene = new THREE.Scene();

    /* Adding to scene below */

    var plane = createPlane(4);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    var box = createCube(1, 1, 1);
    box.position.y = box.geometry.parameters.height / 2;
    scene.add(box);

    /* Adding to scene above */

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 1;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);

    return scene;
}

function update(renderer, scene, camera){
    renderer.render(
        scene,
        camera
    );
    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    })
}

function createCube(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

function createPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

var scene = init();