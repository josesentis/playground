var scene, container, camera, renderer;
var NBOXES = 100;
var BOX_SIZE = 80;
var BOX_HEIGHT = 500;
var NCOLS = 8;
var STREETSIZE = 100;

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
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap;
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
  camera.position.x = 300;
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
      map: texturePlane,
      side: THREE.DoubleSide,
      roughness: 0.9
    })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  scene.add(floor);

  // Adds buildings and streets
  var boxes = [];
  var streets = [];
  var height;
  var currentZ = 0;
  var cityWidth = NCOLS * BOX_SIZE + STREETSIZE * (NCOLS - 1);
  var cityDepth = NBOXES / NCOLS *  BOX_SIZE + STREETSIZE * (NBOXES / NCOLS - 1);

  var textureBuilding = textureLoader.load('building.jpg');
  textureBuilding.wrapS = textureBuilding.wrapT = THREE.RepeatWrapping;
  textureBuilding.anisotropy = 16;

  var textureStreet = textureLoader.load('street.jpg');
  textureStreet.wrapS = textureStreet.wrapT = THREE.RepeatWrapping;
  textureStreet.anisotropy = 16;

  for (var i = 0; i < NBOXES; i++) {
    height = Math.floor(Math.random() * BOX_HEIGHT) + 100;

    textureBuilding.repeat.set(1, height/BOX_SIZE);
    boxes[i] = new THREE.Mesh(
        new THREE.BoxBufferGeometry(BOX_SIZE, height, BOX_SIZE),
        new THREE.MeshStandardMaterial({
          map: textureBuilding,
          metalness: 0.25,
          roughness: 0.4
        }));

    boxes[i].position.x = (i % NCOLS) * (BOX_SIZE + STREETSIZE);
    boxes[i].position.y = height / 2;
    boxes[i].position.z = currentZ - cityDepth / 2;
    boxes[i].castShadow = true;

    streets[i] = new THREE.Mesh(
      new THREE.PlaneGeometry(STREETSIZE, BOX_SIZE),
      new THREE.MeshBasicMaterial({
        map: textureStreet,
        side: THREE.DoubleSide,
        roughness: 0.9
      })
    );

    streets[i].rotation.x = -Math.PI / 2;
    streets[i].receiveShadow = true;

    streets[i].position.x =
    (i % NCOLS) * (BOX_SIZE + STREETSIZE) + BOX_SIZE + (STREETSIZE - BOX_SIZE) / 2;
    streets[i].position.z = currentZ - cityDepth / 2;

    if (i % NCOLS === NCOLS - 1) {
      streets[i].visible = false;
      currentZ += BOX_SIZE + STREETSIZE;
    }
    var box = new THREE.BoxHelper(boxes[i], 0xffff00 );

    scene.add(box);
    scene.add(boxes[i]);
    scene.add(streets[i]);
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

  var shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
  scene.add(shadowHelper);

  // --- INTERACTION STUFF -----------------------------------------------------------
  var controls = new THREE.OrbitControls(camera, container);
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.2;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI * 85 / 180;
  // controls.enableZoom = false;
  // controls.enablePan = false;
};

var loop = function () {
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

init();
loop();