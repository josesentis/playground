import * as THREE from 'three';

const createPath = () => {
  console.log('Create path');

  // Path
  const path = new THREE.Group();

  const pathWay = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 10),
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
  path.rotation.x = - Math.PI * 0.5;
  path.position.y = 0.01;
  path.position.z = 5;

  path.add(pathWay);

  // pathWay.castShadow = true;
  pathWay.receiveShadow = true;

  return path;
};

export default createPath;
