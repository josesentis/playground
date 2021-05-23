import * as THREE from 'three';

const names = ['Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha', 'Olivia', 'Patricia', 'Isla', 'Bethany', 'Sophia', 'Jennifer', 'Emily', 'Elizabeth', 'Isabella', 'Elizabeth', 'Poppy', 'Joanne', 'Ava', 'Linda', 'Ava', 'Megan', 'Mia', 'Barbara', 'Isabella', 'Victoria', 'Emily', 'Susan', 'Jessica', 'Lauren', 'Abigail', 'Margaret', 'Lily', 'Michelle', 'Madison', 'Jessica', 'Sophie', 'Tracy', 'Charlotte', 'Sarah'];

const generateAngle = () => {
  const angle = Math.random() * Math.PI * 2;

  if (angle < 0.26 || angle > 6.02) generateAngle();
  else return angle;
};

const createGraves = () => {
  // Graves
  const graves = new THREE.Group();

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });
  const crossVerticalGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
  const crossHorizontalGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.3);

  // Adds crosses
  for (let i = 0; i < 25; i++) {
    const angle = generateAngle();
    const radius = 4.5 + Math.random() * 5.5;
    const x = Math.sin(angle) * radius;
    const y = 0.3 + Math.random() * 0.2;
    const z = Math.cos(angle) * radius;

    const crossPart1 = new THREE.Mesh(crossVerticalGeometry, graveMaterial);
    const crossPart2 = new THREE.Mesh(crossHorizontalGeometry, graveMaterial);
    crossPart1.castShadow = true;
    crossPart2.castShadow = true;
    crossPart2.position.y = 0.1;

    const cross = new THREE.Group();
    cross.position.set(x, y, z);
    cross.rotation.y = (Math.random() - 0.5) * 0.4;
    cross.rotation.z = (Math.random() - 0.5) * 0.4;
    cross.add(crossPart1, crossPart2);

    graves.add(cross);
  }

  // Adds graves
  for (let i = 0; i < 35; i++) {
    const angle = generateAngle();
    const radius = 4.5 + Math.random() * 5;
    const x = Math.sin(angle) * radius;
    const y = 0.3 + Math.random() * 0.1;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(
      graveGeometry,
      graveMaterial
    );
    grave.position.set(x, y, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;

    graves.add(grave);
  }

  return graves;
};

export default createGraves;
