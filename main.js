import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function init() {
  const scene = new THREE.Scene();
  const canvas = document.querySelector("canvas.threejs");

  THREE.ColorManagement.enabled = false;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-5, 5, 5);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Materials
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  // Geometries
  const cubeGeometry = new THREE.BoxGeometry();
  const planeGeometry = new THREE.PlaneGeometry(50, 50);

  // Meshes
  const cubeMesh = new THREE.Mesh(cubeGeometry, material);
  cubeMesh.castShadow = true;
  cubeMesh.position.set(-0.5, 0, -0.5);

  const planeMesh = new THREE.Mesh(planeGeometry, material);
  planeMesh.rotation.x = Math.PI * 0.5;
  planeMesh.material.side = THREE.DoubleSide;
  planeMesh.receiveShadow = true;
  planeMesh.position.y = -1;

  scene.add(cubeMesh, planeMesh);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  /**
   * spot light
   */

  // const spotLight = new THREE.SpotLight(0xffffff, 2, 50, Math.PI * 0.3, 0.25);
  // spotLight.castShadow = true;
  // spotLight.position.set(1, 4, 1);
  // spotLight.shadow.mapSize.width = 512;
  // spotLight.shadow.mapSize.height = 512;
  // scene.add(spotLight);

  /**
   * camera helper spote light
   */
  // const cameraPosition = spotLight.shadow.camera;
  // const spoteLightCameraHelper = new THREE.CameraHelper(cameraPosition);
  // scene.add(spoteLightCameraHelper);
  // console.log("othographic camera")
  // console.log("field of view",cameraPosition.fov)
  // console.log("field of near",cameraPosition.near)
  // console.log("field of far",cameraPosition.far)

  /**
   * directional light
   */
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 128;
  directionalLight.shadow.mapSize.height = 128;
  // this light use orthographic camera have: near, far, top, right, bottom, left
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 10;
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.right = 2;
  directionalLight.shadow.camera.bottom = -2;
  directionalLight.shadow.camera.left = -2;
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  /**
   * camera helper directional light
   */
  const cameraShadowPosition = directionalLight.shadow.camera;
  const directionalLightCameraHelper = new THREE.CameraHelper(
    cameraShadowPosition
  );
  scene.add(directionalLightCameraHelper);

  // Helpers
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  // Resize Event Listener
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  // Orbit Controls
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  /**
   * Change random color
   */
  function changeColor() {
    if (cubeMesh.material.color.getHex() === 0x00ff00) {
      cubeMesh.material.color.setHex(0xff0000); // تغيير اللون إلى أحمر
    } else {
      cubeMesh.material.color.setHex(0x00ff00); // تغيير اللون إلى أخضر
    }
  }

  // Animation Loop
  const clock = new THREE.Clock();
  const interval = 5; // الوقت الذي سيتم بعده تغيير اللون بالثواني
  let lastColorChangeTime = 0;

  function animateFrame() {
    const elapsedTime = clock.getElapsedTime();

    // Update cube position
    // cubeMesh.position.z = Math.cos(elapsedTime) * 1.5;
    // cubeMesh.position.x = Math.sin(elapsedTime) * 1.5;
    // cubeMesh.position.y = Math.abs(Math.sin(elapsedTime * 3)) * 2;

    // spotLight.intensity = Math.abs(10 * Math.sin(elapsedTime));

    // if (elapsedTime - lastColorChangeTime >= interval) {
    //   changeColor();
    //   lastColorChangeTime = elapsedTime; // تحديث الوقت الذي تم فيه تغيير اللون
    // }

    requestAnimationFrame(animateFrame);
    orbitControls.update();
    renderer.render(scene, camera);
  }
  animateFrame();
}

init();
