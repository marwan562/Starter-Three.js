import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = 1
cubeMesh.position.x = 1
cubeMesh.position.z = 1

// axes line helper
const axesHelper = new THREE.AxesHelper(10);

// add scenes here
scene.add(cubeMesh, axesHelper);

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
