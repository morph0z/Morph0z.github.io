import * as THREE from 'three';
const width = window.innerWidth, height = window.innerHeight;

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons";

// init

const assetLoader = new GLTFLoader();
const charUrl = new URL('assets/models/minecraftChar.gltf', import.meta.url);

const light = new THREE.AmbientLight( 0x404040 , 100); // soft white light

const renderer = new THREE.WebGLRenderer( { alpha: true },{ antialias: true });
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.getElementById("char3d").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45.0,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000000.00
);

camera.position.set(-10,15,40);
camera.rotation.set(0,0,0);

const scene = new THREE.Scene();

let mixer;
let model;
assetLoader.load(charUrl.href, function(gltf) {
    model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    // Play a certain animation
    const clip = THREE.AnimationClip.findByName(clips, 'wait');
    const action = mixer.clipAction(clip);
    action.play();
    model.rotation.y = 100;
}, undefined, function(error) {
    console.error(error);
});

scene.add( light );

const clock = new THREE.Clock();
function animate() {
    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
    if (model) {model.rotation.y += lenis.velocity * 0.001;}
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
