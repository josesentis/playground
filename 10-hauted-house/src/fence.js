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

  fence.add(frontPole1, frontPole2);

  return fence;
};

export default createFence;
