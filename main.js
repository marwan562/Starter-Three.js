import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

//initialize the camera here
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

//initialize the renderer here
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(MAX_PIXEL_RATIO);

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);

//clock time for animations frams optmize with difference devices
const clock = new THREE.Clock()


function animateLoopFrame() {
  window.requestAnimationFrame(animateLoopFrame);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // elapsed time 
  const elapsedTime = clock.getElapsedTime()

  renderer.render(scene, camera);
}

animateLoopFrame();
