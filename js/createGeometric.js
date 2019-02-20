function createCube(w, h, d, color) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        color: color
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

function createSphere(size, color) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshPhongMaterial({
        color: color
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

function createCylinder(rT, rB, seg, h, color){
    var geometry = new THREE.CylinderGeometry( rT, rB, h, seg );
    var material = new THREE.MeshPhongMaterial( {color: color} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.castShadow = true;
    return cylinder;
}

function createPlane(size, color) {
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    return mesh;
}

function createRing(r, tube, color) {
    var geometry = new THREE.TorusBufferGeometry(r, tube, 16, 100);
    var material = new THREE.MeshPhongMaterial({ color: color });
    var torus = new THREE.Mesh(geometry, material);
    return torus;
}

function createPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}