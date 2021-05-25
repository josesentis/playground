import * as THREE from 'three';

const windowGeometry = new THREE.PlaneGeometry(1.5, 1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#26323f' });

const woodGeometry = new THREE.BoxGeometry(1.6, 0.15, 0.05);
const woodMaterial = new THREE.MeshStandardMaterial({ color: '#9e6839' });

const createWindow = () => {
  const fenetre = new THREE.Group();
  const woods = new THREE.Group();

  const base = new THREE.Mesh(windowGeometry, windowMaterial);
  fenetre.add(base);

  for (let i = 0; i < 6; i++) {
    const wood = new THREE.Mesh(woodGeometry, woodMaterial);

    wood.rotation.z = 0.05;
    wood.position.y = (0.15 + 0.01) * i;
    wood.scale.x = 0.9 + Math.random() * 0.1;
    wood.castShadow = true;

    woods.add(wood);
  }

  const crossWood = new THREE.Mesh(woodGeometry, woodMaterial);

  crossWood.position.y = 0.4;
  crossWood.position.z = 0.06;
  crossWood.rotation.z = Math.PI / 4;
  crossWood.castShadow = true;

  woods.add(crossWood);

  woods.position.y = -0.4;
  woods.position.z = 0.01;

  fenetre.add(woods);
  fenetre.position.y = 1.75;

  return fenetre;
}

const createWindows = () => {
  const window1 = createWindow();
  const window2 = createWindow();
  const window3 = createWindow();

  window1.position.x = 2.01;
  window1.rotation.y = Math.PI / 2;

  window2.position.z = -2.01;
  window2.rotation.y = Math.PI;

  window3.position.x = -2.01;
  window3.rotation.y = - Math.PI / 2;
  /**
   * Shadows
   */
  // ghost1.castShadow = true;
  // ghost2.castShadow = true;

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
