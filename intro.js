import * as THREE from 'three';
const width = window.innerWidth, height = window.innerHeight;

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons";
import {LoopOnce} from "three";

// init

const assetLoader = new GLTFLoader();
const introUrl = new URL('assets/models/intro.gltf', import.meta.url);

const renderer = new THREE.WebGLRenderer({ alpha: true }, { antialias: true });
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.getElementById("intro3d").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    37.82,
    window.innerWidth / window.innerHeight,
    0.1,
    10000000000.00
);

camera.position.set(276.064,0,0);
camera.rotation.set(0,90,0);

const scene = new THREE.Scene();

const orbit = new OrbitControls(camera, renderer.domElement);
//orbit.update();

//const grid = new THREE.GridHelper(30, 30);
//scene.add(grid);


let mixer;
assetLoader.load(introUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    // Play a certain animation
    const clip = THREE.AnimationClip.findByName(clips, 'Shatter');
    const action = mixer.clipAction(clip);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.setDuration(3);
    action.play();
}, undefined, function(error) {
    console.error(error);
});

// animation

const clock = new THREE.Clock();
function animate() {
    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
