(function() {
  var scene, aspect, camera, renderer;

  var init = function() {
    scene = new THREE.Scene();
    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, aspect, 1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    var textureLoader = new THREE.TextureLoader();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    // Adds cube
    var textureCube = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif'
    );
    var geometryCube = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ map: textureCube });
    var shape = new THREE.Mesh(geometryCube, material);

    shape.position.y = 0.5;

    // Adds floor
    var texturePlane = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/terrain/grasslight-big.jpg'
    );

    texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
    texturePlane.repeat.set(512, 512);

    var geometryPlane = new THREE.PlaneGeometry(2000, 2000, 8, 8);
    var materialPlane = new THREE.MeshBasicMaterial({
      map: texturePlane,
      side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometryPlane, materialPlane);

    plane.rotateX(-Math.PI / 2);

    scene.add(shape);
    scene.add(plane);

    camera.position.set(-1, 1, 6);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  };

  var loop = function() {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
  };

  init();
  loop();
})();
