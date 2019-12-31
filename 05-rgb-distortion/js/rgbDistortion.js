class RGBShiftEffect extends EffectShell {
  constructor(container = document.body, options = {}) {
    super(container);

    if (!this.container) return;

    options.strength = options.strength || 0.25;
    this.options = options;

    this.vertexShader = `
      uniform vec2 uOffset;
      uniform float uDeformationToggle;

      varying vec2 vUv;

      vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
        float M_PI = 3.1415926535897932384626433832795;
        position.x = position.x + (sin(uv.y * M_PI) * offset.x * uDeformationToggle);
        position.y = position.y + (sin(uv.x * M_PI) * offset.y * uDeformationToggle);
        return position;
      }

      void main() {
        vUv = uv;
        vec3 newPosition = position;
        newPosition = deformationCurve(position,uv,uOffset);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
      }
    `;

    this.fragmentShader = `
      uniform sampler2D uTexture;
      // uniform float uAlpha;
      uniform vec2 uOffset;

      varying vec2 vUv;

      vec3 rgbShift(sampler2D texture, vec2 uv, vec2 offset) {
        float r = texture2D(uTexture,vUv + uOffset).r;
        vec2 gb = texture2D(uTexture,vUv).gb;
        return vec3(r,gb);
      }

      void main() {
        vec3 color = rgbShift(uTexture,vUv,uOffset);
        gl_FragColor = vec4(color, 1);
      }
    `;

    this.init();
  }

  init() {
    this.position = new THREE.Vector3(0, 0, 0);
    this.scale = new THREE.Vector3(1, 1, 1);
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    this.uniforms = {
      uTime: {
        value: 0
      },
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uDeformationToggle: {
        value: 0
      }
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  onPositionUpdate() {
    // compute offset
    let offset = this.plane.position
      .clone()
      .sub(this.position)
      .multiplyScalar(-this.options.strength)
    this.uniforms.uOffset.value = offset
  }
}
