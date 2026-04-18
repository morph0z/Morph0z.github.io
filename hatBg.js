import * as THREE from 'three';
const width = window.innerWidth, height = window.innerHeight;

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

// init

const assetLoader = new GLTFLoader();
const hatUrl = new URL('assets/models/hat.gltf', import.meta.url);

const renderer = new THREE.WebGLRenderer({ alpha: true }, { antialias: true });
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.getElementById("hat3d").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45.0,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000000.00
);

camera.position.set(6.924,2.483,7.616);
camera.rotation.set(-20.32,43.33,14.26);

const scene = new THREE.Scene();

let model
assetLoader.load(hatUrl.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);},
    undefined,
    function(error) {console.error(error);}
);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.disconnect()

function animate() {
    renderer.render(scene, camera);
    if (model) {model.rotation.y += lenis.velocity * 0.01;}
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
