import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Correct path for OrbitControls
import vertexShader from "../public/shaders/vertex.glsl"
import fragmentShader from "../public/shaders/fragment.glsl"

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  35
);
camera.position.z = 5;
scene.add(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize the OrbitControls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;

// Animation loop to update the time uniform
function animate() {
  // Update controls and render the scene
  orbitControl.update();
  renderer.render(scene, camera);

  // Request the next frame
  window.requestAnimationFrame(animate);
}

animate();

// Handle resizing of the window
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
