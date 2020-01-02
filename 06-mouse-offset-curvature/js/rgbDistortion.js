const STRENGTH = -0.25;
const VERTEX_SHADER = `
  uniform vec2 uOffset;

  varying vec2 vUv;

  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    float M_PI = 3.1415926535897932384626433832795;
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
  }

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;
const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;

  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

class ImageCurve {
  constructor(container = document.body) {
    this.container = container;

    this.setup();
    this.init();

    this.loadTexture().then(() => {
      this.isLoaded = true;

      this.loadImage();
    });
  }

  setup() {
    this.image = document.getElementById('image');

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio = window.devicePixelRatio;
    this.container.appendChild(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(40, this.viewport.aspectRatio, 0.1, 100);
    this.camera.position.set(0, 0, 3);

    //mouse
    this.mouse = new THREE.Vector2()

    //mouse
    this.mouse = new THREE.Vector2();

    // time
    this.timeSpeed = 2;
    this.time = 0;
    this.clock = new THREE.Clock();

    this.renderer.setAnimationLoop(this.render);
    this.createEventsListeners();
  }

  init() {
    this.position = new THREE.Vector3(0, 0, 0);
    this.scale = new THREE.Vector3(1, 1, 1);
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    this.uniforms = {
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      }
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  onPositionUpdate = () => {
    // compute offset
    let offset = this.plane.position
      .clone()
      .sub(this.position)
      .multiplyScalar(STRENGTH)
    this.uniforms.uOffset.value = offset;
  }

  render = () => {
    this.time += this.clock.getDelta() * this.timeSpeed
    this.renderer.render(this.scene, this.camera)
  }

  loadTexture() {
    this.item = { img: this.image };

    const THREEtextureLoader = new THREE.TextureLoader();

    return new Promise((resolve, reject) => {
      if (this.item.img) {
        THREEtextureLoader.load(
          // resource URL
          this.item.img.src,
          // onLoad callback
          image => {
            this.item.texture = image;
            resolve();
          },
          // onProgress callback currently not supported
          undefined,
          // onError callback
          error => {
            console.error('An error happened.', error)
            reject(error)
          }
        )
      }
    });
  }

  createEventsListeners = () => {
    this.container.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onMouseMove = event => {
    // get normalized mouse position on viewport
    this.mouse.x = (event.clientX / this.viewport.width) * 2 - 1
    this.mouse.y = -(event.clientY / this.viewport.height) * 2 + 1

    let x = this.mouse.x.map(-1, 1, -this.viewSize.width / 2, this.viewSize.width / 2);
    let y = this.mouse.y.map(-1, 1, -this.viewSize.height / 2, this.viewSize.height / 2);

    this.position = new THREE.Vector3(x, y, 0);

    TweenLite.to(this.plane.position, 1, {
      x: x,
      y: y,
      ease: Power4.easeOut,
      onUpdate: this.onPositionUpdate
    });
  }

  onWindowResize = () => {
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  get viewport() {
    let width = this.container.clientWidth
    let height = this.container.clientHeight
    let aspectRatio = width / height
    return {
      width,
      height,
      aspectRatio
    }
  }

  get viewSize() {
    // fit plane to screen
    // https://gist.github.com/ayamflow/96a1f554c3f88eef2f9d0024fc42940f

    let distance = this.camera.position.z
    let vFov = (this.camera.fov * Math.PI) / 180
    let height = 2 * Math.tan(vFov / 2) * distance
    let width = height * this.viewport.aspectRatio
    return { width, height, vFov }
  }

  loadImage() {
    if (!this.item.texture) return;

    let imageRatio =
      this.item.img.naturalWidth / this.item.img.naturalHeight
    this.scale = new THREE.Vector3(imageRatio, 1, 1)
    this.uniforms.uTexture.value = this.item.texture
    this.plane.scale.copy(this.scale)
  }
}
