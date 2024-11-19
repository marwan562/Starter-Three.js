import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

/**
 * GLFT Loader
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig({ type: "js" });
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
const glftLoader = new GLTFLoader();
glftLoader.setDRACOLoader(dracoLoader);

/**
 * Ducks
 */
glftLoader.load("/models/Duck/glTF/Duck.gltf", (glft) => {
  scene.add(glft.scene);
});

glftLoader.load("/models/Duck/glTF-Binary/Duck.glb", (glft) => {
  glft.scene.position.x = 2;
  scene.add(glft.scene);
});

glftLoader.load("/models/Duck/glTF-Embedded/Duck.gltf", (glft) => {
  glft.scene.position.x = 4;
  scene.add(glft.scene);
});

glftLoader.load("/models/Duck/glTF-Draco/Duck.gltf", (glft) => {
  glft.scene.position.x = 6;
  scene.add(glft.scene);
});

/**
 * Fox
 */
let mixer1;
let mixer2;
let mixer3;

glftLoader.load("/models/Fox/glTF/Fox.gltf", (glft) => {
  glft.scene.position.x = -2;
  glft.scene.scale.set(0.1, 0.1, 0.1);
  scene.add(glft.scene);
  mixer1 = new THREE.AnimationMixer(glft.scene);
  const action = mixer1.clipAction(glft.animations[0]);
  action.play();
});

glftLoader.load("/models/Fox/glTF-Binary/Fox.glb", (glft) => {
  glft.scene.position.x = -6;
  glft.scene.scale.set(0.1, 0.1, 0.1);
  scene.add(glft.scene);
  mixer2 = new THREE.AnimationMixer(glft.scene);
  const action = mixer2.clipAction(glft.animations[1]);
  action.play();
});

glftLoader.load("/models/Fox/glTF-Embedded/Fox.gltf", (glft) => {
  glft.scene.position.x = -10;
  glft.scene.scale.set(0.1, 0.1, 0.1);
  scene.add(glft.scene);
  mixer3 = new THREE.AnimationMixer(glft.scene);
  const action = mixer3.clipAction(glft.animations[2]);
  action.play();
});

/**
 * Flight helmet
 */
glftLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (glft) => {
  glft.scene.position.y = 3;
  scene.add(glft.scene);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(6, 6, 6);
scene.add(camera);

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
let previousTime = 0;

function animateLoopFrame() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (mixer1) {
    mixer1.update(deltaTime);
  }
  if (mixer2) {
    mixer2.update(deltaTime);
  }
  if (mixer3) {
    mixer3.update(deltaTime);
  }

  // Render scene
  orbitControls.update();
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animateLoopFrame);
}

animateLoopFrame();
