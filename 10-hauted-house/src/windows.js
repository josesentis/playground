import * as THREE from 'three';

const windowGeometry = new THREE.PlaneGeometry(1.5, 1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#26323f' })

const createWindow = () => {
  const fenetre = new THREE.Group();

  const base = new THREE.Mesh(windowGeometry, windowMaterial);
  fenetre.add(base);

  fenetre.position.y = 1.75;

  return fenetre;
}

const createWindows = () => {
  const window1 = createWindow();
  const window2 = createWindow();
  const window3 = createWindow();

  window1.position.x = 2.01;
  // window1.position.z = 2.01;
  window1.rotation.y = Math.PI / 2;

  /**
   * Shadows
   */
  // ghost1.castShadow = true;
  // ghost2.castShadow = true;
  // ghost3.castShadow = true;

  // ghost1.shadow.mapSize.height = 256;
  // ghost1.shadow.mapSize.width = 256;
  // ghost1.shadow.camera.far = 7;

  // ghost2.shadow.mapSize.height = 256;
  // ghost2.shadow.mapSize.width = 256;
  // ghost2.shadow.camera.far = 7;

  // ghost3.shadow.mapSize.height = 256;
  // ghost3.shadow.mapSize.width = 256;
  // ghost3.shadow.camera.far = 7;

  return { window1, window2, window3 };
};

export default createWindows;
