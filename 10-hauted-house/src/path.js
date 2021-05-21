import * as THREE from 'three';

const MAX_PATH_LENGTH = 10;
const MAX_PATH_WIDTH = 1.4;
const COBBLESTONE_SEPARATION = 0.05;

const createPath = () => {
  // Path
  const path = new THREE.Group();
  path.position.y = 0.001;

  // Color under the cobblestones
  const pathWay = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, MAX_PATH_LENGTH),
    new THREE.MeshStandardMaterial({ color: '#444941' })
    // new THREE.MeshStandardMaterial({
    //   map: grassColorTexture,
    //   aoMap: grassAmbientOcclusionTexture,
    //   normalMap: grassNormalTexture,
    //   roughnessMap: grassRoughnessTexture
    // })
  );

  // pathWay.geometry.setAttribute(
  //   'uv2',
  //   new THREE.Float32BufferAttribute(pathWay.geometry.attributes.uv.array, 2)
  // );
  pathWay.rotation.x = - Math.PI * 0.5;
  pathWay.position.z = 5;

  path.add(pathWay);

  // pathWay.castShadow = true;
  pathWay.receiveShadow = true;

  // Adds cobblestones
  const cobbleStoneGeometry = new THREE.BoxGeometry(1, 0.1, 0.2);
  const cobbleStoneMaterial = new THREE.MeshStandardMaterial({ color: '#d0d1c5' });

  let cobblestonePosition = {
    x: - MAX_PATH_WIDTH / 2,
    z: 0
  }
  let remainingRowSpace = MAX_PATH_WIDTH;

  for (let i = 0; i < 150; i++) {
    console.log('INITIAL --------------- ', i);

    const cobbleStone = new THREE.Mesh(
      cobbleStoneGeometry,
      cobbleStoneMaterial
    );

    const ownPosition = cobblestonePosition;
    let ownSize = 0.3 + Math.random() * 0.15;
    let rowChange = false;

    console.log('Size:', ownSize);
    console.log('Remaining Space:', remainingRowSpace);
    console.log('Position:', ownPosition);

    if (ownSize > remainingRowSpace) {
      ownSize = remainingRowSpace;
      rowChange = true;
    }

    cobbleStone.scale.x = ownSize;
    cobbleStone.position.x = ownPosition.x + ownSize / 2;
    cobbleStone.position.z = ownPosition.z + 0.1;
    cobbleStone.rotation.x = (Math.random() - 0.5) * 0.1;
    cobbleStone.rotation.z = (Math.random() - 0.5) * 0.1;
    cobbleStone.castShadow = true;

    // Before next iteration
    // if (ownSize > remainingRowSpace) cobblestonePosition.z += 0.2 + COBBLESTONE_SEPARATION;

    // Changes this condition and make it more automatic

    if (rowChange) {
      ownSize = remainingRowSpace;
      cobblestonePosition.z += 0.2 + COBBLESTONE_SEPARATION;
      cobblestonePosition.x = - MAX_PATH_WIDTH / 2;
      remainingRowSpace = MAX_PATH_WIDTH;
    } else {
      cobblestonePosition.x += ownSize + COBBLESTONE_SEPARATION;
      remainingRowSpace -= ownSize + COBBLESTONE_SEPARATION;
    }

    path.add(cobbleStone);
    console.log('END --------------- ', i);
  }

  return path;
};

export default createPath;
