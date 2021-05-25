import * as THREE from 'three';

const MAX_PATH_LENGTH = 10;
const MAX_PATH_WIDTH = 1.4;
const COBBLESTONE_SEPARATION = 0.05;
const COBBLE_Z = 0.2;

const createPath = () => {
  // Path
  const path = new THREE.Group();
  path.position.y = 0.001;

  // Color under the cobblestones
  const pathWay = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, MAX_PATH_LENGTH),
    new THREE.MeshStandardMaterial({ color: '#444941' })
  );
  pathWay.rotation.x = - Math.PI * 0.5;
  pathWay.position.z = MAX_PATH_LENGTH / 2;
  pathWay.receiveShadow = true;

  path.add(pathWay);

  // Adds cobblestones
  const cobbleStoneGeometry = new THREE.BoxGeometry(1, 0.1, COBBLE_Z);
  const cobbleStoneMaterial = new THREE.MeshStandardMaterial({ color: '#d0d1c5' });

  let cobblestonePosition = {
    x: - MAX_PATH_WIDTH / 2,
    z: 0
  }
  let remainingRowSpace = MAX_PATH_WIDTH;
  let rowNum = 0;
  let i = 0;
  let lastRow = false;
  let spaceAvailable = true;

  while (spaceAvailable) {
    const cobbleStone = new THREE.Mesh(cobbleStoneGeometry, cobbleStoneMaterial);
    const ownPosition = cobblestonePosition;
    let ownSize = 0.3 + Math.random() * 0.15;
    let rowChange = false;
    let rowDirection = 1;

    if (ownSize > remainingRowSpace) {
      ownSize = remainingRowSpace;
      rowChange = true;
    }

    if (rowNum % 2 === 1) rowDirection = -1;

    cobbleStone.scale.x = ownSize;
    cobbleStone.position.x = ownPosition.x + (ownSize / 2 * rowDirection);
    cobbleStone.position.z = ownPosition.z + 0.1;
    cobbleStone.rotation.x = (Math.random() - 0.5) * 0.15;
    cobbleStone.rotation.z = (Math.random() - 0.5) * 0.15;
    cobbleStone.castShadow = true;

    if (cobbleStone.position.z + COBBLE_Z >= MAX_PATH_LENGTH) lastRow = true;

    // Before next iteration
    if (rowChange && lastRow) spaceAvailable = false;
    else if (rowChange) {
      ownSize = remainingRowSpace;
      cobblestonePosition.z += 0.2 + COBBLESTONE_SEPARATION;
      cobblestonePosition.x = (MAX_PATH_WIDTH / 2 * rowDirection);
      remainingRowSpace = MAX_PATH_WIDTH;

      rowNum += 1;
    } else {
      cobblestonePosition.x += (ownSize + COBBLESTONE_SEPARATION) * rowDirection;
      remainingRowSpace -= ownSize + COBBLESTONE_SEPARATION;
    }

    path.add(cobbleStone);
    i++;
  }

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 32, 32);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush1.scale.set(0.15, 0.15, 0.15);
  bush1.position.set(- MAX_PATH_WIDTH / 2 - 0.1, 0.05, 6);

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.scale.set(0.15, 0.15, 0.15);
  bush2.position.set(MAX_PATH_WIDTH / 2 + 0.1, 0.04, 8);

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.scale.set(0.1, 0.1, 0.1);
  bush3.position.set(MAX_PATH_WIDTH / 2 + 0.05, 0.04, 8.2);

  path.add(bush1, bush2, bush3);

  return path;
};

export default createPath;
