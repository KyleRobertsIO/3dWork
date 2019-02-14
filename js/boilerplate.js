function init(){
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    var plane = createPlane(100, 0x000000);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    plane.name = "generalPlane";

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1, 
        1000
    );

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

function update(renderer, scene, camera, controls){
    renderer.render(
        scene, camera
    );

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    });
}

var scene = init();