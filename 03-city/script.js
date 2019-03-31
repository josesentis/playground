/*
Lights
*/
var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(512, 512);
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap;

var container = document.querySelector('.container');

container.appendChild(renderer.domElement);

var scene = new THREE.Scene();
// var camera = new THREE.OrthographicCamera(-256,256,256,-256, 0.00001, 100000); // left, right, top, bottom
var camera = new THREE.PerspectiveCamera(75, 1, 0.001, 10000);
camera.position.z = 800;
camera.position.y = 400;
camera.position.x = -400;
camera.lookAt(new THREE.Vector3());
scene.add(camera);

// --- ADD OBJECTS TO SCENE -------------------------------------------
var material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.25,
  roughness: 0.4
});
// var geometry = new THREE.BoxGeometry(80,200,80);
// var box = new THREE.Mesh(geometry, material);
// scene.add(box);

var N_BOXES = 40;
var boxes = [];
var height;
var currentX,
  currentZ = 0;
var BOX_SIZE = 50;
var BOX_HEIGHT = 300;

for (var i = 0; i < N_BOXES; i++) {
  height = Math.floor(Math.random() * BOX_HEIGHT) + 50;

  boxes[i] = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material);

  boxes[i].position.x = ((i % 10) * BOX_SIZE) - (5 * BOX_SIZE);
  boxes[i].position.y = height / 2;
  boxes[i].position.z = currentZ;

  boxes[i].scale.x = BOX_SIZE;
  boxes[i].scale.y = height;
  boxes[i].scale.z = BOX_SIZE;

  boxes[i].height = height;
  boxes[i].delay = Math.random() * 2 * Math.PI;

  if (i % 5 === 4) {
    currentZ += BOX_SIZE;
  }

  scene.add(boxes[i]);
}

// var tl = new THREE.TextureLoader();
// var texture = tl.load('img/floor.jpg');
// texture.repeat.set(4, 4);
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// var floor = new THREE.Mesh(
//   new THREE.PlaneBufferGeometry(1024, 1024),
//   new THREE.MeshStandardMaterial({
//     color: 0xcccccc,
//     map: texture,
//     side: THREE.DoubleSide,
//     roughness: 0.9,
//     metalness: 0.6
//   })
// );

// floor.rotation.x = -Math.PI / 2;
// floor.receiveShadow = true;

// scene.add(floor);

// var torus = new THREE.Mesh(
//   new THREE.TorusKnotBufferGeometry(60, 14, 128, 128, 2, 5),
//   new THREE.MeshStandardMaterial({
//     color: 0x3464c9,
//     metalness: 0.25,
//     roughness: 0.4
//   })
// );
// torus.position.y = 140;
// scene.add(torus);
// torus.castShadow = true;

// --- SETUP LIGHTS ----------------------------------------------------------------
var ambient = new THREE.AmbientLight(0xeeeeee);
scene.add(ambient);

var sun = new THREE.DirectionalLight(0xfaf7d7, 1);
sun.position.set(500, 300, 0);
sun.target.position.set(0, 0, 0);
sun.castShadow = true;

sun.shadow.camera.near = 1;
sun.shadow.camera.far = 1000;
sun.shadow.camera.right = 512;
sun.shadow.camera.left = -512;
sun.shadow.camera.top = 512;
sun.shadow.camera.bottom = -512;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

scene.add(sun);

// var shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
// scene.add(shadowHelper);

// var spot = new THREE.SpotLight(0xff3333, 0.8, 500, Math.PI / 4);
// spot.castShadow = true;
// spot.penumbra = 0.8;
// spot.decay = 0.4;
// spot.position.set(-200, 300, -200);
// spot.target.position.set(0, 50, 0);
// scene.add(spot);

// var spotHelper = new THREE.SpotLightHelper(spot);
// scene.add(spotHelper);

// --- INTERACTION STUFF -----------------------------------------------------------
// var controls = new THREE.OrbitControls(camera, container);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.2;
// controls.enableDamping = true;
// controls.minPolarAngle = Math.PI / 4;
// controls.maxPolarAngle = (3 * Math.PI) / 4;
// controls.enableZoom = false;
// controls.enablePan = false;

// --- SETTINGS & GUI --------------------------------------------------------------
// var settings = {
//   showGui: true
// };

// if (settings.showGui) {
//   var gui = new dat.GUI({ width: 320 });
//   var f1 = gui.addFolder('Controls');
//   f1.add(controls, 'autoRotate').name('Auto Rotate Cam');
//   f1.add(controls, 'autoRotateSpeed', 0.1, 16).name('Auto Rotate Speed');
//   f1.add(controls, 'dampingFactor', 0.01, 0.5).name('Damping Factor');
//   f1.add(controls, 'autoRotate').name('Auto Rotate Cam');
//   f1.add(controls, 'enableZoom').name('Zoom');
//   f1.add(controls, 'enablePan').name('Pan');
//   // f1.open();
// }

// --- ANIMATION & RENDER STUFF ----------------------------------------------------

var clock = new THREE.Clock(true);

// function interact() {
//   controls.update();
// }

// function moveLights() {
//   var t = clock.getElapsedTime();
//   spot.position.set(-200 * Math.sin(t), 300, -200 * Math.cos(t));
//   spot.target.position.set(0, 50, 0);
//   spotHelper.update();
// }

function updateHeights() {
  var t = clock.getElapsedTime();

  for (var i = 0; i < N_BOXES; i++) {
    var height =
      boxes[i].height +
      boxes[i].height * 0.2 * Math.sin(t * 2 + boxes[i].delay);

    boxes[i].scale.y = height;
    boxes[i].position.y = height / 2;
  }
}

var animate = function() {
  requestAnimationFrame(animate);
  updateHeights();
  renderer.render(scene, camera);
};

animate();
