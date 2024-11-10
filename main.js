import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

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
const renderer = new THREE.WebGLRenderer({ canvas ,antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);


//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true 
orbitControl.autoRotate = true


function animatLoopFrame  () {
  window.requestAnimationFrame(animatLoopFrame)
  orbitControl.update()
  renderer.render(scene, camera);
}

animatLoopFrame()



