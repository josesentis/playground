var vertexShader = `
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
        newPosition = deformationCurve(position,uv,uOffset);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
`;

var fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uAlpha;
    uniform vec2 uOffset;

    varying vec2 vUv;

    vec3 rgbShift(sampler2D texture, vec2 uv, vec2 offset) {
        float r = texture2D(uTexture,vUv + uOffset).r;
        vec2 gb = texture2D(uTexture,vUv).gb;
        return vec3(r,gb);
    }

    void main() {
        vec3 color = rgbShift(uTexture,vUv,uOffset);
        gl_FragColor = vec4(color,uAlpha);
    }
`;

var loadScene = function() {
    // scene
    var scene = new THREE.Scene();

    // aspect
    var aspect = window.innerWidth / window.innerHeight;

    // camera
    var camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.z = 4;

    // renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio = window.devicePixelRatio;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //mouse
    var mouse = new THREE.Vector2()

    // time
    var timeSpeed = 2;
    var time = 0;
    var clock = new THREE.Clock();

    var position = new THREE.Vector3(0, 0, 0);
    var scale = new THREE.Vector3(1, 1, 1);
    var geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    var uniforms = {
      uTime: {
        value: 0
      },
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uAlpha: {
        value: 1
      }
    };
    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true
    });

    plane = new THREE.Mesh(geometry, material)
    scene.add(plane);

    var render = function() {
        // called every frame
        time += clock.getDelta() * timeSpeed;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
//
    // var render = function() {
    //   requestAnimationFrame(render);
    //   renderer.render(scene, camera);
    // };

    // render();
    // const effect = new RGBShiftEffect(container, itemsWrapper, { strength: 0.25 });
}

(function() {
    // Preload images
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('img'), resolve);
        });
    };

    preloadImages().then(() => {
        // Remove the loader
        document.body.classList.remove('loading');
        loadScene();
    });
})();

