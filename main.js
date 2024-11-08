import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
});
const cubeMaterial1 = new THREE.MeshBasicMaterial({
  color: "yellow",
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
cubeMesh1.position.x = -2;

scene.add(cubeMesh, cubeMesh1);

const aspectCamera = window.innerWidth / window.innerHeight;

// initialize the camera here
const camera = new THREE.PerspectiveCamera(75, aspectCamera, 0.1, 100);

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectCamera,
//   1 * aspectCamera,
//   1,
//   -1,
//   0.1,
  100
// );

camera.position.x = -3;

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

const cursorMouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (ev) => {
  cursorMouse.x = ev.clientX / window.innerWidth - 0.5;
  cursorMouse.y = ev.clientY / window.innerHeight - 0.5;
});

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;
orbitControl.autoRotate = true;

function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  // camera.position.x =  cursorMouse.x * 10
  // camera.position.y = -  cursorMouse.y *10
  camera.position.x = Math.sin(Math.PI * 2 * cursorMouse.x) * 10;
  camera.position.z = Math.cos(Math.PI * 2 * cursorMouse.x) * 10;
  camera.position.y = cursorMouse.y * 20;

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

animatLoopFrame();
