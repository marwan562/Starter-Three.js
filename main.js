import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environment = cubeTextureLoader.load([
  "./Standard-Cube-Map/nx.png",
  "./Standard-Cube-Map/ny.png",
  "./Standard-Cube-Map/nz.png",
  "./Standard-Cube-Map/px.png",
  "./Standard-Cube-Map/py.png",
  "./Standard-Cube-Map/pz.png",
]);

scene.background = environment;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = 2;
cubeMesh.rotation.x = 1.57;

scene.add(cubeMesh);

const aspectCamera = window.innerWidth / window.innerHeight;

//initialize the camera here
const camera = new THREE.PerspectiveCamera(75, aspectCamera, 0.1, 100);

camera.position.x = 3;
camera.position.z = 3;
camera.position.y = 3;

scene.add(camera);

// axises helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//initialize the renderer here
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspectCamera;
  camera.updateProjectionMatrix();
});

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;
orbitControl.autoRotate = true;

function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  renderer.render(scene, camera);
}

animatLoopFrame();
