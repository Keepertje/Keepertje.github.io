import * as THREE from "three";

/** * 1. CONFIGURATION & SETUP
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/** * 2. STARFIELD (Data-Stream Style)
 */
function createStarfield() {
  const starCount = 5500;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Create a procedural glowing circle texture
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.5, "rgba(0, 200, 255, 0.3)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.PointsMaterial({
    size: 0.2,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}
const stars = createStarfield();
scene.add(stars);

/** * 4. ANIMATION LOOP
 */

let warpSpeed = 0.05; // Default fallback speed

// Hook into the LCARS slider
const powerSlider = document.getElementById("powerSlider");
if (powerSlider) {
  // Set initial speed based on slider's starting value
  // Cubing the value creates an exponential speed curve
  warpSpeed = Math.pow(parseFloat(powerSlider.value), 2) * 0.00001;

  // Update speed whenever the slider is dragged
  powerSlider.addEventListener("input", (e) => {
    warpSpeed = Math.pow(parseFloat(e.target.value), 2) * 0.00001;
    if (e.target.value > 40) {
      warpSpeed = Math.pow(parseFloat(e.target.value), 2) * 0.0001;
    }
  });
}

function animate() {
  // Move stars towards the camera to simulate forward travel
  const positions = stars.geometry.attributes.position.array;
  for (let i = 2; i < positions.length; i += 3) {
    positions[i] += warpSpeed; // Speed of forward travel

    // Wrap stars back around once they pass the camera (Z > 10)
    if (positions[i] > 10) {
      positions[i] -= 50; // Keeps the star distribution smooth
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

/** * 5. RESPONSIVENESS
 */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
