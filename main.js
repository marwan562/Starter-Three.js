import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// GLTF Loader
const gltfLoader = new GLTFLoader();
let model;
gltfLoader.load("/robotic_eye/scene.gltf", (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 0.2;
scene.add(camera);

/**
 * Mouse Movement
 */
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX / window.innerWidth - 0.5;
  mouse.y = e.clientY / window.innerHeight - 0.5;

  if (model) {
    model.rotation.y = (mouse.x * Math.PI) / 2;
    model.rotation.x = (mouse.y * Math.PI) / 2;
  }
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Renderer
const canvas = document.querySelector("canvas.threejs");
if (!canvas) {
  console.error("Canvas with class 'threejs' not found");
}
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
const clock = new THREE.Clock();
function animateLoopFrame() {
  const elapsedTime = clock.getElapsedTime();
  // Render scene
  orbitControls.update();
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animateLoopFrame);
}

animateLoopFrame();
