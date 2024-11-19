import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Load particle texture
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("/star_06.png");

// Particle Geometry and Material
const particlesGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true,
  vertexColors: true,
  alphaMap: starTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const count = 5000; // Number of particles
const positions = new Float32Array(count * 3); // Store x, y, z for each particle
const colors = new Float32Array(count * 3); // Store r, g, b for each particle
const velocities = new Float32Array(count * 3); // Store velocities for each particle

for (let i = 0; i < count; i++) {
  const i3 = i * 3;

  // Initial positions (start at the center)
  positions[i3] = 0; // x
  positions[i3 + 1] = 0; // y
  positions[i3 + 2] = 0; // z

  // Random initial velocities for outward movement
  velocities[i3] = (Math.random() - 0.5) * 2; // x velocity
  velocities[i3 + 1] = (Math.random() - 0.5) * 2; // y velocity
  velocities[i3 + 2] = (Math.random() - 0.5) * 2; // z velocity

  // Random colors for each particle
  colors[i3] = Math.random(); // r
  colors[i3 + 1] = Math.random(); // g
  colors[i3 + 2] = Math.random(); // b
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 50;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit Controls
const orbitControl = new OrbitControls(camera, renderer.domElement);

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Function
const clock = new THREE.Clock();
function animatLoopFrame() {
  const elapsedTime = clock.getElapsedTime();
  const positions = particlesGeometry.attributes.position.array;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Update positions based on velocities (outward movement)
    positions[i3] += velocities[i3] * 0.1; // x
    positions[i3 + 1] += velocities[i3 + 1] * 0.1; // y
    positions[i3 + 2] += velocities[i3 + 2] * 0.1; // z

    // Optional: Reset particles after they move too far
    if (
      Math.abs(positions[i3]) > 50 ||
      Math.abs(positions[i3 + 1]) > 50 ||
      Math.abs(positions[i3 + 2]) > 50
    ) {
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
    }
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  // Render scene
  orbitControl.update();
  renderer.render(scene, camera);

  // Request the next frame
  window.requestAnimationFrame(animatLoopFrame);
}

animatLoopFrame();
