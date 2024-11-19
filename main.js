import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const particalesGeometry = new THREE.SphereGeometry(1, 32, 32);
const particalesMaterial = new THREE.PointsMaterial({
  size: 5,
  sizeAttenuation: false,
});
const cubeMesh = new THREE.Points(particalesGeometry, particalesMaterial);

scene.add(cubeMesh);

//initialize the camera here
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  35
);

camera.position.z = 5;
scene.add(camera);

//initialize the renderer here
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(MAX_PIXEL_RATIO);

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);

function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

animatLoopFrame();
