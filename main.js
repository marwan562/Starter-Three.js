import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();

//textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/static/textures/matcaps/6.png");
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environment = cubeTextureLoader.load([
  "/static/textures/envMap/px.png",
  "/static/textures/envMap/nx.png",
  "/static/textures/envMap/py.png",
  "/static/textures/envMap/ny.png",
  "/static/textures/envMap/pz.png",
  "/static/textures/envMap/nz.png",
]);

scene.environment = environment;
scene.background = environment;

//axes helper
// const axesHelper = new THREE.AxesHelper(5)

//initialize the camera here
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;
scene.add(camera);

// Add the Text 3d here
const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const fontLoader = new FontLoader();
fontLoader.load("/static/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("  Marwan Hassan\nCreative Develoepr", {
    font,
    size: 2,
    height: 1,
    curveSegments: 10,
  });
  textGeometry.center();
  const textMesh = new THREE.Mesh(textGeometry, matcapMaterial);

  scene.add(textMesh);
});

//
const tetrahedronGeometry = new THREE.TetrahedronGeometry(1, 0);

const group = new THREE.Group();

for (let i = 0; i < 100; i++) {
  const tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, matcapMaterial);
  tetrahedronMesh.position.x = (Math.random() - 0.5) * 25;
  tetrahedronMesh.position.y = (Math.random() - 0.5) * 25;
  tetrahedronMesh.position.z = (Math.random() - 0.5) * 25;

  tetrahedronMesh.rotation.x = Math.random() * Math.PI;
  tetrahedronMesh.rotation.z = Math.random() * Math.PI;

  const scale = Math.random();
  tetrahedronMesh.scale.setScalar(scale);

  group.add(tetrahedronMesh);
}

scene.add(group);

//initialize the renderer here
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// resize the page browser
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//initialize the orbit controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;

//Clock elapsedtime
const clock = new THREE.Clock();

function animatLoopFrame() {
  const elapsedTime = clock.getElapsedTime();

  window.requestAnimationFrame(animatLoopFrame);
  orbitControl.update();
  renderer.render(scene, camera);
  group.children.forEach((mesh) => {
    mesh.rotation.y = Math.PI * elapsedTime * 0.09;
    mesh.rotation.x = Math.PI * elapsedTime * 0.09;
  });

  group.rotation.x = Math.PI * elapsedTime * 0.09;
  group.rotation.x = Math.PI * elapsedTime * 0.09;
  group.rotation.z = Math.PI * elapsedTime * 0.09;
}

animatLoopFrame();
