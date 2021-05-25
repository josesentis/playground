import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

import './style.css';
import createFence from './fence';
import createPath from './path';
import createGhosts from './ghosts';
import createGraves from './graves';
import createWindows from './windows';

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()
// gui.closed = true;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

grassColorTexture.repeat.set(8, 8); // Repeats 8 times
grassAmbientOcclusionTexture.repeat.set(8, 8); // Repeats 8 times
grassNormalTexture.repeat.set(8, 8); // Repeats 8 times
grassRoughnessTexture.repeat.set(8, 8); // Repeats 8 times

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
  })
)
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = - Math.PI / 2;
floor.position.y = 0;
scene.add(floor);

const floorBox = new THREE.Mesh(
  new THREE.BoxGeometry(20, 0.8, 20),
  new THREE.MeshStandardMaterial({ color: '#e0fd62' })
)
floorBox.position.y = -0.4001;
scene.add(floorBox);

const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 3 / 2;
house.add(walls);

// Windows
const { window1, window2, window3 } = createWindows();
house.add(window1, window2, window3);

// Hall
const hall = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 2.5, 0.75),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
)
hall.position.y = 2.5 / 2;
hall.position.z = 4 / 2 + 0.75 / 2;
house.add(hall);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 2 / 2;
door.position.z = 4 / 2 + 0.75 + 0.01;
house.add(door);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 1.5 / 2 + 3;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 32, 32);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.7, 0.2, 2.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.35, 0.35, 0.35);
bush2.position.set(1.25, 0.1, 3);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.3, 0.3, 0.3);
bush3.position.set(-0.9, 0.1, 2.95);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-1.7, 0.15, 2.3);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.15, 0.15, 0.15);
bush5.position.set(-1.25, 0.05, 2.95);

house.add(bush1, bush2, bush3, bush4, bush5);

/**
 * Graves
 */
const graves = createGraves();
scene.add(graves);

/**
 * Fence
 */
const fence = createFence();
scene.add(fence);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#BB91F2', 0.15);
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
// const moonLight = new THREE.DirectionalLight('#BB91F2', 0.15);
const moonLight = new THREE.DirectionalLight('#FFFFFF', 1);
moonLight.position.set(4, 5, - 2);
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001);
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001);
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001);
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.85, 2.7);
house.add(doorLight);

const door2Light = new THREE.PointLight('#ff7d46', 1.5, 5);
door2Light.position.set(0, 2.35, 3.45);
house.add(door2Light);

// Flash
const flash = new THREE.PointLight('#FAFBA5', 3, 540, 1.7);
flash.position.set(0, 15, 0);
scene.add(flash);

/**
 * Ghosts
*/
const { ghost1, ghost2, ghost3 } = createGhosts();
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
bush5.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.height = 256;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.camera.far = 7;

// Add elements to scene
const path = createPath();
scene.add(path);

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0
};

window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = - (event.clientY / window.innerHeight - 0.5);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update ghosts
  const ghost1Angle = elapsedTime * 0.2;
  ghost1.position.x = Math.cos(ghost1Angle) * (7 + Math.sin(elapsedTime) * 0.2);
  ghost1.position.z = Math.sin(ghost1Angle) * (7 + Math.sin(elapsedTime) * 0.2);
  ghost1.position.y = Math.sin(elapsedTime);

  const ghost2Angle = elapsedTime * 0.05;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = 1 + Math.sin(elapsedTime * 4);

  const ghost3Angle = - elapsedTime * 0.25;
  ghost3.position.x = Math.cos(ghost3Angle) * (6 + Math.sin(elapsedTime * 4));
  ghost3.position.z = Math.sin(ghost3Angle) * (6 + Math.sin(elapsedTime * 4));
  ghost3.position.y = Math.sin(elapsedTime * 3);

  // Update flash
  if (Math.random() > 0.93 || flash.power > 100) {
    if (flash.power < 100) {
      flash.position.set(
        Math.random() * 400,
        300 + Math.random() * 200,
        100
      );
    }
    flash.power = 50 + Math.random() * 500;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();