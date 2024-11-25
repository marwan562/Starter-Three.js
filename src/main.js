import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Correct path for OrbitControls

const scene = new THREE.Scene();

// Vertex Shader
const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Fragment Shader
const fragmentShader = `
    uniform float u_time; // Time uniform for animation

    void main() {
        gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0); // Animate the red component with time
    }
`;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 5.0 }, // Initialize the time uniform

  }
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  35
);
camera.position.z = 5;
scene.add(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Initialize the OrbitControls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;

// Animation loop to update the time uniform
function animate() {
  // Update the time uniform
  cubeMaterial.uniforms.u_time.value = performance.now() * 0.001; // Convert to seconds

  // Update controls and render the scene
  orbitControl.update();
  renderer.render(scene, camera);

  // Request the next frame
  window.requestAnimationFrame(animate);
}

animate();

// Handle resizing of the window
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
