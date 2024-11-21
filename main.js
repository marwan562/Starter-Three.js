import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

/**
 * Cube
 */
const material = new THREE.MeshBasicMaterial({ color: "red" });
const geometry = new THREE.BoxGeometry();

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 4;
scene.add(camera);

/**
 * Renderer
 */
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(MAX_PIXEL_RATIO);

/**
 * Orbit Controls
 */
const orbitControl = new OrbitControls(camera, renderer.domElement);

/**
 * Handle mouse move
 */
let mouseMoved = false;
let currentObject;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouseMoved = true
  if (mouseMoved) {
    // Update the raycaster based on the mouse position and camera
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with the cube
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
      // Get the intersected object
      const intersectedObject = intersects[0].object;

      // Only update if it's a new object
      if (currentObject !== intersectedObject) {
        // Reset the previous object
        if (currentObject) {
          currentObject.scale.set(1, 1, 1);
          currentObject.material.color.set("red");
        }

        // Highlight the newly hovered object
        currentObject = intersectedObject;
        currentObject.scale.set(1.5, 1.5, 1.5);
        currentObject.material.color.set("blue");
        document.body.style.cursor = "pointer";
      }
    } else {
      // Reset the object when no intersection occurs
      if (currentObject) {
        currentObject.scale.set(0.5, 0.5, 0.5);
        currentObject.material.color.set("yellow");
        currentObject = null;
      }
      document.body.style.cursor = "default";
    }
  }
}

window.addEventListener("mousemove", onMouseMove);

/**
 * Animate
 */
const clock = new THREE.Clock();

function animate() {
  window.requestAnimationFrame(animate);

  // Render the scene
  renderer.render(scene, camera);
}
animate();
