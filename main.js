import * as THREE from "three";
import { GUI } from "lil-gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const debugGui = new GUI();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//animations by gsap
const animationsGsapParamter = {
  spin: () => {
    gsap.to(cubeMesh.rotation, { y: cubeMesh.rotation.y + 10, duration: 2 });
  },
};

scene.add(cubeMesh);
debugGui.add(cubeMesh.material, "wireframe");
debugGui.add(cubeMesh.geometry, "seq");
debugGui.addColor(cubeMesh.material, "color");
debugGui.add(animationsGsapParamter, "spin");

//initialize the camera here
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  35
);

//initialize the axes helper
const axesHelper = new THREE.AxesHelper(5);

camera.position.set(3, 3, 3);

scene.add(camera, axesHelper);

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
  renderer.render(scene, camera);
}

animatLoopFrame();
