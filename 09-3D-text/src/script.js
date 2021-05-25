import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import gsap from 'gsap';

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axis helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Group
const group = new THREE.Group();
scene.add(group);

/**
 * Loading manager
 */
const loader = new THREE.LoadingManager();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loader);
const matcapTexture = textureLoader.load('textures/matcaps/7.png');

/**
 * Mesh
 */
let textMesh;
let donuts = [];

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader(loader);

const text = `
creative
frontend
developer
`;

fontLoader.load('./fonts/helvetiker_regular.typeface.json', font => {
  const textGeometry = new THREE.TextGeometry(
    text,
    {
      font,
      size: 0.5,
      height: 0.2,
      cuverSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    }
  );
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
  });
  // textMaterial.wireframe = true;
  textMesh = new THREE.Mesh(textGeometry, material);
  group.add(textMesh);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i <= 350; i++) {
    donuts[i] = new THREE.Mesh(donutGeometry, material);

    donuts[i].endposition = {
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 18,
      z: (Math.random() - 0.5) * 18
    }

    donuts[i].endrotation = {
      x: Math.random() * Math.PI,
      y: Math.random() * Math.PI
    }

    const scale = Math.random();
    donuts[i].scale.set(scale, scale, scale);

    group.add(donuts[i]);
  }
});

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 20;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock();

const init = () => {
  gsap.to(camera.position, {
    duration: 1,
    z: 10,
    onUpdate: function () {
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    ease: "power4.out"
  });

  for (let i = 0; i <= 350; i++) {
    gsap.to(donuts[i].position, {
      duration: 1,
      x: donuts[i].endposition.x,
      y: donuts[i].endposition.y,
      z: donuts[i].endposition.z,
      ease: "power4.out"
    });

    gsap.to(donuts[i].rotation, {
      duration: 1,
      x: donuts[i].endrotation.x,
      y: donuts[i].endrotation.y,
      ease: "power4.out"
    });
  }
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update camera on mouse move
  gsap.to(camera.position, {
    duration: 1,
    x: cursor.x * 10,
    y: cursor.y * 10,
    onUpdate: function () {
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });

  gsap.to(group.rotation, {
    duration: 25,
    x: Math.sin(elapsedTime),
    y: Math.cos(elapsedTime)
  });

  if (textMesh) {
    gsap.to(textMesh.rotation, {
      duration: 20,
      x: - Math.sin(elapsedTime),
      y: - Math.cos(elapsedTime)
    });
  }

  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

/**
 * Initialize
 */
loader.onLoad = () => {
  setTimeout(() => {
    init();
    tick();
  }, 500);
};
