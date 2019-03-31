(function() {
  var scene = new THREE.Scene();
  var aspect = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspect, 1, 500);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometryCube = new THREE.BoxGeometry(1, 1, 1);
  //var geometryThorus = new THREE.TorusGeometry(1, .5, 10, 100);
  //var geometrySphere = new THREE.SphereGeometry(1.3, 50, 32);
  var material = new THREE.MeshNormalMaterial();
  var shape = new THREE.Mesh(geometryCube, material);

  scene.add(shape);
  camera.position.z = 4;
  shape.rotation.x = 0.3;

  var render = function() {
    requestAnimationFrame(render);
    shape.rotation.y += 0.01;
    //shape.rotation.x += 0.003;
    renderer.render(scene, camera);
  };

  render();
})();
