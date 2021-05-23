import * as THREE from 'three';

const poleGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
const poleMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });
const tiangleGeometry = new THREE.ConeGeometry(0.2, 0.2, 4);
const tiangleMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

// Roof
// const roof = new THREE.Mesh(
// );
// roof.position.y = 1.5 / 2 + 3;
// roof.rotation.y = Math.PI / 4;
// house.add(roof);

const createPole = (x = 1, y = 1, z = 1) => {
  const poleGroup = new THREE.Group();
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
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

  return fence;
};

export default createFence;
