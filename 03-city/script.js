var scene, container, camera, renderer;
var NBOXES = 100;
var BOX_SIZE = 80;
var BOX_HEIGHT = 500;
var NCOLS = 8;
var STREETSIZE = 40;

var init = function () {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  container = document.querySelector('.container');
  var textureLoader = new THREE.TextureLoader();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.001,
    10000
  );
  camera.position.z = 1200;
  camera.position.y = 400;
  camera.position.x = 500;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  // --- ADD OBJECTS TO SCENE -------------------------------------------
  // Adds floor
  var texturePlane = textureLoader.load(
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/terrain/grasslight-big.jpg'
  );

  texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
  texturePlane.repeat.set(52, 52);

  var floor = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    new THREE.MeshStandardMaterial({
      color: 0xc5fad9,
      side: THREE.DoubleSide
    })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  scene.add(floor);

  // Adds buildings and streets
  var boxes = [];
  var height;
  var currentZ = 0;
  // var cityWidth = NCOLS * BOX_SIZE + STREETSIZE * (NCOLS - 1);
  var cityDepth = NBOXES / NCOLS *  BOX_SIZE + STREETSIZE * (NBOXES / NCOLS - 1);
  var bufferGeometry;
  var buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xf77fee });

  for (var i = 0; i < NBOXES; i++) {
    height = Math.floor(Math.random() * BOX_HEIGHT) + 100;

    bufferGeometry = new THREE.BoxGeometry(BOX_SIZE, height, BOX_SIZE);
    bufferGeometry.faces[0].color.setHex(0xdb66e4);
    bufferGeometry.colorsNeedUpdate = true

    boxes[i] = new THREE.Mesh(bufferGeometry, buildingMaterial);

    boxes[i].position.x = (i % NCOLS) * (BOX_SIZE + STREETSIZE * Math.random());
    boxes[i].position.y = height / 2;
    boxes[i].position.z = currentZ - cityDepth / 2;
    boxes[i].castShadow = true;

    if (i % NCOLS === NCOLS - 1) {
      currentZ += BOX_SIZE + STREETSIZE;
    }

    scene.add(boxes[i]);
  }

  // --- SETUP LIGHTS ----------------------------------------------------------------
  var ambient = new THREE.AmbientLight(0xeeeeee);
  scene.add(ambient);

  var sun = new THREE.DirectionalLight(0xfaf7d7, 0.5);
  sun.position.set(2000, 3000, 4000);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;

  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 7000;
  sun.shadow.camera.right = 1024;
  sun.shadow.camera.left = -1024;
  sun.shadow.camera.top = 1024;
  sun.shadow.camera.bottom = -1024;
  sun.shadow.mapSize.width = 1024;
  sun.shadow.mapSize.height = 1024;

  scene.add(sun);

  // var shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
  // scene.add(shadowHelper);

  // --- INTERACTION STUFF -----------------------------------------------------------
  var controls = new THREE.OrbitControls(camera, container);
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI * 85 / 180;
};

var loop = function () {
  camera.position.z = camera.position.z - 0.5;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

init();
loop();