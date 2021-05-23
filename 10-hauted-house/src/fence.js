import * as THREE from 'three';

const poleGeometry = new THREE.BoxGeometry(1, 1, 1);
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });
const tiangleGeometry = new THREE.ConeGeometry(0.2, 0.2, 4);
const tiangleMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

const createLateral = () => {
  const lateral = new THREE.Mesh(poleGeometry, poleMaterial);
  lateral.scale.x = 20 - 0.75;
  lateral.scale.y = 0.15;
  lateral.scale.z = 0.1;

  return lateral;
};

const createPole = (x = 1, y = 1, z = 1) => {
  const poleGroup = new THREE.Group();
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.scale.x = 0.2 * x;
  pole.scale.y = y;
  pole.scale.z = 0.2 * z;
  pole.position.y = 1 / 2;
  pole.castShadow = true;

  const triangle = new THREE.Mesh(tiangleGeometry, tiangleMaterial);
  triangle.position.y = 1.1;
  triangle.rotation.y = Math.PI / 4;
  triangle.castShadow = true;

  poleGroup.add(pole, triangle);
  poleGroup.scale.set(x, y, z);

  return poleGroup;
}

const createFence = () => {
  const fence = new THREE.Group();

  // pole
  const frontPole1 = createPole();
  frontPole1.position.x = -1.5;
  frontPole1.position.z = (20 - 0.75) / 2;

  const frontPole2 = createPole();
  frontPole2.position.x = 1.5;
  frontPole2.position.z = (20 - 0.75) / 2;

  const cornerPole1 = createPole();
  cornerPole1.position.x = (20 - 0.75) / 2;
  cornerPole1.position.z = (20 - 0.75) / 2;

  const cornerPole2 = createPole();
  cornerPole2.position.x = - (20 - 0.75) / 2;
  cornerPole2.position.z = (20 - 0.75) / 2;

  const cornerPole3 = createPole();
  cornerPole3.position.x = - (20 - 0.75) / 2;
  cornerPole3.position.z = - (20 - 0.75) / 2;

  const cornerPole4 = createPole();
  cornerPole4.position.x = (20 - 0.75) / 2;
  cornerPole4.position.z = - (20 - 0.75) / 2;

  fence.add(frontPole1, frontPole2, cornerPole1, cornerPole2, cornerPole3, cornerPole4);

  const lateral1Top = createLateral();
  lateral1Top.position.x = - (20 - 0.75) / 2;
  lateral1Top.position.y = 0.7;
  lateral1Top.rotation.y = Math.PI / 2;

  const lateral1Bottom = createLateral();
  lateral1Bottom.position.x = - (20 - 0.75) / 2;
  lateral1Bottom.position.y = 0.4;
  lateral1Bottom.rotation.y = Math.PI / 2;

  fence.add(lateral1Top, lateral1Bottom);

  const lateral2Top = createLateral();
  lateral2Top.position.z = - (20 - 0.75) / 2;
  lateral2Top.position.y = 0.7;

  const lateral2Bottom = createLateral();
  lateral2Bottom.position.z = - (20 - 0.75) / 2;
  lateral2Bottom.position.y = 0.4;

  fence.add(lateral2Top, lateral2Bottom);

  const lateral3Top = createLateral();
  lateral3Top.position.x = (20 - 0.75) / 2;
  lateral3Top.position.y = 0.7;
  lateral3Top.rotation.y = Math.PI / 2;

  const lateral3Bottom = createLateral();
  lateral3Bottom.position.x = (20 - 0.75) / 2;
  lateral3Bottom.position.y = 0.4;
  lateral3Bottom.rotation.y = Math.PI / 2;

  fence.add(lateral3Top, lateral3Bottom);

  const lateral4Top = createLateral();
  lateral4Top.position.x = - 5.6;
  lateral4Top.position.z = (20 - 0.75) / 2;
  lateral4Top.position.y = 0.7;
  lateral4Top.scale.x = 8.2;

  const lateral4Bottom = createLateral();
  lateral4Bottom.position.x = - 5.6;
  lateral4Bottom.position.z = (20 - 0.75) / 2;
  lateral4Bottom.position.y = 0.4;
  lateral4Bottom.scale.x = 8.2;

  fence.add(lateral4Top, lateral4Bottom);

  const lateral5Top = createLateral();
  lateral5Top.position.x = 5.6;
  lateral5Top.position.z = (20 - 0.75) / 2;
  lateral5Top.position.y = 0.7;
  lateral5Top.scale.x = 8.2;

  const lateral5Bottom = createLateral();
  lateral5Bottom.position.x = 5.6;
  lateral5Bottom.position.z = (20 - 0.75) / 2;
  lateral5Bottom.position.y = 0.4;
  lateral5Bottom.scale.x = 8.2;

  fence.add(lateral5Top, lateral5Bottom);

  return fence;
};

export default createFence;
