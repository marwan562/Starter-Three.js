import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

// texture loader
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/static/textures/1/color.jpg");
colorMap.repeat.x = 5;
colorMap.repeat.y = 5;
colorMap.wrapS = THREE.RepeatWrapping;
colorMap.wrapT = THREE.RepeatWrapping;
colorMap.center.x = 0.5;
colorMap.center.y = 0.5;

//axes helper line
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//cube mesh
const cubeMaterial = new THREE.MeshBasicMaterial({ map: colorMap });
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4, 1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//! Sphere
const sphereMaterial = new THREE.MeshBasicMaterial({ map: colorMap });
const sphereGeometry = new THREE.SphereGeometry(2, 512, 512);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 10;

//! turos
const toursMaterial = new THREE.MeshBasicMaterial({ map: colorMap });
const toursGeometry = new THREE.TorusGeometry(2, 0.4, 512, 512);
const tours = new THREE.Mesh(toursGeometry, toursMaterial);
tours.position.x = -10;

// group all mesh
const group = new THREE.Group();
group.add(cube, tours, sphere);

scene.add(group);

//initialize the camera here
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(5, 5, 10);
scene.add(camera);

//initialize the renderer here
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.autoRotate = true

//clock time for animations frams optmize with difference devices
const clock = new THREE.Clock();

function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  orbitControl.update()
  renderer.setSize(window.innerWidth, window.innerHeight);

  // elapsed time
  const elapsedTime = clock.getElapsedTime();

  // simple animation
  cube.rotation.y = elapsedTime * 0.2;
  cube.rotation.x = elapsedTime * 0.2;
  cube.rotation.z = elapsedTime * 0.2;

  sphere.rotation.y = elapsedTime * 0.2;
  sphere.rotation.x = elapsedTime * 0.2;
  sphere.rotation.z = elapsedTime * 0.2;

  tours.rotation.y = elapsedTime * 0.2;
  tours.rotation.x = elapsedTime * 0.2;
  tours.rotation.z = elapsedTime * 0.2;

  renderer.render(scene, camera);
}

animatLoopFrame();
