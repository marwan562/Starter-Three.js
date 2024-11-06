import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
// default cube mesh
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// cube mesh 1
const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh1.position.x = 2

// cube mesh 2
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.z = 2

const group = new THREE.Group()
group.add(cubeMesh)
group.add(cubeMesh1)
group.add(cubeMesh2)

group.position.y = 2

cubeMesh.scale.y = 2

scene.add(group)



// Axes line helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

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
const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(MAX_PIXEL_RATIO);

// Initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);

// Adjust scene on window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animateLoopFrame() {
  requestAnimationFrame(animateLoopFrame);
  cubeMesh.rotation.y += 0.01
  renderer.render(scene, camera);
}

animateLoopFrame();
