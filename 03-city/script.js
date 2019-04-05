var scene, container, camera, renderer;

var init = function() {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
  // var camera = new THREE.OrthographicCamera(-256,256,256,-256, 0.00001, 100000); // left, right, top, bottom
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.001,
    10000
  );
  camera.position.z = 800;
  camera.position.y = 400;
  camera.position.x = -400;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  // --- ADD OBJECTS TO SCENE -------------------------------------------
  // Adds floor
  var texturePlane = textureLoader.load(
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/terrain/grasslight-big.jpg'
  );

  texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
  texturePlane.repeat.set(1, 1);

  var floor = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
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
  var N_BOXES = 40;
  var BOX_SIZE = 50;
  var BOX_HEIGHT = 300;
  var NCOLS = 8;
  var STREETSIZE = 40;
  var boxes = [];
  var streets = [];
  var height;
  var currentZ = 0;
  var cityWidth = NCOLS * BOX_SIZE;

  var textureBuilding = textureLoader.load('building.jpg');
  textureBuilding.wrapS = textureBuilding.wrapT = THREE.RepeatWrapping;
  textureBuilding.repeat.set(4, 4);

  var textureStreet = textureLoader.load('street.jpg');
  textureStreet.wrapS = textureStreet.wrapT = THREE.RepeatWrapping;
  textureStreet.repeat.set(1, 1);

  var boxMaterial = new THREE.MeshStandardMaterial({
    map: textureBuilding,
    metalness: 0.25,
    roughness: 0.4
  });
  var boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

  for (var i = 0; i < N_BOXES; i++) {
    height = Math.floor(Math.random() * BOX_HEIGHT) + 50;

    boxes[i] = new THREE.Mesh(boxGeometry, boxMaterial);

    boxes[i].position.x = (i % NCOLS) * (BOX_SIZE + STREETSIZE) - cityWidth / 2;
    boxes[i].position.y = height / 2;
    boxes[i].position.z = currentZ;

    boxes[i].scale.x = BOX_SIZE;
    boxes[i].scale.y = height;
    boxes[i].scale.z = BOX_SIZE;

    boxes[i].height = height;
    boxes[i].delay = Math.random() * 2 * Math.PI;

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
      (i % NCOLS) * (BOX_SIZE + STREETSIZE) - cityWidth / 2 - STREETSIZE;
    streets[i].position.z = currentZ;

    if (i % NCOLS === 0) {
      streets[i].visible = false;
    }

    if (i % NCOLS === NCOLS - 1) {
      currentZ += BOX_SIZE + STREETSIZE;
    }

    scene.add(boxes[i]);
    scene.add(streets[i]);
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
  // controls.minPolarAngle = Math.PI / 4;
  // controls.maxPolarAngle = (3 * Math.PI) / 4;
  // controls.enableZoom = false;
  // controls.enablePan = false;

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
};

var updateHeights = function() {
  var t = clock.getElapsedTime();

  for (var i = 0; i < N_BOXES; i++) {
    var height =
      boxes[i].height +
      boxes[i].height * 0.2 * Math.sin(t * 2 + boxes[i].delay);

    boxes[i].scale.y = height;
    boxes[i].position.y = height / 2;
  }
};

var loop = function() {
  requestAnimationFrame(loop);
  // updateHeights();
  renderer.render(scene, camera);
};

init();
loop();
