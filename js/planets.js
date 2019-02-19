function init(){
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var ambLight = new THREE.AmbientLight(0xffffff);
    ambLight.position.y = 1000;
    scene.add(ambLight);

    var sun = createSphere(695, 0xffdd00);
    scene.add(sun);

    var mercury = createSphere(2.4, 0xffc68a);
    mercury.name = "mercury";

    var venus = createSphere(6, 0xffb58a);
    venus.name = "venus";

    var earth = createSphere(6.3, 0xaebaff);
    earth.name = "earth";

    var mars = createSphere(3.9, 0xff5246);
    mars.name = "mars";

    var jupiter = createSphere(69.9, 0xd96d42);
    jupiter.name = "jupiter";

    var geometry = new THREE.CylinderGeometry( 100, 100, 1, 40 );
    var material = new THREE.MeshBasicMaterial( {color: 0xa14f10} );
    var ring = new THREE.Mesh( geometry, material );
    scene.add( ring );

    var saturn = createSphere(58.2, 0xd4c860);
    saturn.add(ring);
    saturn.name = "saturn";
    
    var uranus = createSphere(25.3, 0x92ccd6);
    uranus.name = "uranus";

    var neptune = createSphere(24.6, 0x2f54d9);
    neptune.name = "neptune";

    scene.add(mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1, 
        20000
    );

    camera.position.x = 2000;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

function planetOrbit(scene, planet ,timestamp, speed, orbit){
    if(planet == "saturn"){
        scene.getObjectByName(planet).rotation.x += 0.1;
        scene.getObjectByName(planet).rotation.y += 0.1;
    }
    scene.getObjectByName(planet).position.x = Math.cos(timestamp * speed) * (695 + orbit);
    scene.getObjectByName(planet).position.z = Math.sin(timestamp * speed) * (695 + orbit);
}

function update(renderer, scene, camera, controls){
    renderer.render(
        scene, camera
    );

    let timestamp = Date.now() * 0.0001;

    planetOrbit(scene, "mercury", timestamp, 47.9, 36); 
    planetOrbit(scene, "venus", timestamp, 35, 67); 
    planetOrbit(scene, "earth", timestamp, 29.8, 141); 
    planetOrbit(scene, "mars", timestamp, 24, 438); 
    planetOrbit(scene, "jupiter", timestamp, 13.1, 886); 
    planetOrbit(scene, "saturn", timestamp, 9.7, 1784);
    planetOrbit(scene, "uranus", timestamp, 6.8, 2794); 
    planetOrbit(scene, "neptune", timestamp, 5.4, 3674); 

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    });
}

var scene = init();