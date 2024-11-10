import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

// **light**

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//point light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);

scene.add(directionalLight, ambientLight);

// texture loader
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load("/static/textures/1/color.jpg");
const displacementMap = textureLoader.load("/static/textures/1/disp.png");
const alphaMap = textureLoader.load("/static/textures/1/alpha.png");
const normalMap = textureLoader.load("/static/textures/1/color.jpg");
const maskMap = textureLoader.load("/static/textures/1/mask.jpg");
const occMap = textureLoader.load("/static/textures/1/color.jpg");
const gradientTexture = textureLoader.load("/static/textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

//axes helper line
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//cube mesh
const cubeMaterial = new THREE.MeshToonMaterial({
  gradientMap: gradientTexture,
});
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4, 512, 512, 512);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//implement this for ambient occlustion
// cube.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(cube.geometry.attributes.uv.array, 2)
// );

//! Sphere
const sphereMaterial = new THREE.MeshNormalMaterial({ flatShading: true });
const sphereGeometry = new THREE.SphereGeometry(2);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 10;

//! turos
const toursMaterial = new THREE.MeshNormalMaterial({});
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
orbitControl.autoRotate = true;

//clock time for animations frams optmize with difference devices
const clock = new THREE.Clock();

function animatLoopFrame() {
  window.requestAnimationFrame(animatLoopFrame);
  orbitControl.update();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // elapsed time
  const elapsedTime = clock.getElapsedTime();

  // simple animation
  cube.rotation.y = elapsedTime * 0.2;
  sphere.rotation.y = elapsedTime * 0.2;
  tours.rotation.y = elapsedTime * 0.2;

  renderer.render(scene, camera);
}

animatLoopFrame();
