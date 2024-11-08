import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

//axes helper line
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper )

//cube mesh
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4, 512, 512, 512);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//! Sphere
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphereGeometry = new THREE.SphereGeometry(2, 512, 512);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 10;

//! turos
const toursMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const toursGeometry = new THREE.TorusGeometry(2, 0.4, 512, 512);
const tours = new THREE.Mesh(toursGeometry, toursMaterial);
tours.position.x = -10;

// group all mesh
const group = new THREE.Group() 
group.add(cube , tours , sphere)

scene.add(group)

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


function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // elapsed time 
  const elapsedTime = clock.getElapsedTime()

  // simple animation 
  cube.rotation.y = elapsedTime * .20
  cube.rotation.x = elapsedTime * .20
  cube.rotation.z = elapsedTime * .20

  sphere.rotation.y = elapsedTime * .20
  sphere.rotation.x = elapsedTime * .20
  sphere.rotation.z = elapsedTime * .20

  tours.rotation.y = elapsedTime * .20
  tours.rotation.x = elapsedTime * .20
  tours.rotation.z = elapsedTime * .20

  renderer.render(scene, camera);
}

animatLoopFrame();
