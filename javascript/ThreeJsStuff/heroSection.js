import * as THREE from 'three';
const width = window.innerWidth, height = window.innerHeight;

import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// init

const assetLoader = new GLTFLoader();
const heroSectionUrl = new URL('/assets/models/heroSectionScene.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer({ alpha: true }, { antialias: true });
renderer.setSize( width, height );
//renderer.setAnimationLoop( animate );
document.getElementById("hero3d").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45.0,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000000.00
);


var light = new THREE.AmbientLight( 0xffffff, 2 );

const scene = new THREE.Scene();

var camera_pivot = new THREE.Object3D()
var Y_AXIS = new THREE.Vector3( 0, 1, 0 );

scene.add( camera_pivot );
camera_pivot.add( camera );
camera_pivot.position.set( 0, 3, 0 );
camera.position.set( 15, -5, 0 );

let model = null;
assetLoader.load(heroSectionUrl.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);
},
    undefined,
    function(error) {console.error(error);}
);


function animate() {
    camera.lookAt( camera_pivot.position );

    renderer.render(scene, camera);
    if (model) {model.rotation.z -= lenis.velocity * 0.001;}
}

renderer.setAnimationLoop(animate);

camera_pivot.rotateOnAxis( Y_AXIS, 0.01 ); 

window.addEventListener('load', function() {
    model.rotation.z = 0
    camera.position.set( 15, -5, 0 );
    camera.lookAt( camera_pivot.position );
})

//window.addEventListener('resize', function() {
//    camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
//});


let oldz = 0
let oldy = 0

window.onmousemove = function(e) {
    let changez = e.x - oldz
    let changey = e.y - oldy

    camera.position.z += (changez * 0.001)
    camera.position.y -= changey * 0.001

    oldz = e.x
    oldy = e.y
}