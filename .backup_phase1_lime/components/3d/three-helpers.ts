import * as THREE from "three";

/**
 * Creates a procedural diamond knurling texture using HTML5 Canvas
 * Used for realistic barbell and dumbbell metal grip friction
 */
export function createKnurlingTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture({} as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 2;
    for (let i = -256; i < 512; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 256, 256);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(i, 256);
      ctx.lineTo(i + 256, 0);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 16);
  return texture;
}

/**
 * Procedural DUMBBELL Mesh - Ultra realistic metallic finish
 */
export function createProceduralDumbbell(): THREE.Group {
  const group = new THREE.Group();

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xefefef,
    metalness: 0.96,
    roughness: 0.18,
  });

  const knurlingTexture = createKnurlingTexture();
  const gripMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.92,
    roughness: 0.32,
    bumpMap: knurlingTexture,
    bumpScale: 0.05,
  });

  const weightHeadMaterial = new THREE.MeshStandardMaterial({
    color: 0x141414,
    metalness: 0.65,
    roughness: 0.35,
  });

  const accentRingMaterial = new THREE.MeshStandardMaterial({
    color: 0xD7FF00,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0xD7FF00,
    emissiveIntensity: 0.3,
  });

  // Handle shaft
  const handleGeo = new THREE.CylinderGeometry(0.22, 0.22, 3.2, 32);
  const handleMesh = new THREE.Mesh(handleGeo, gripMaterial);
  handleMesh.rotation.z = Math.PI / 2;
  group.add(handleMesh);

  // Inner chrome collars
  const collarGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.2, 32);
  const leftCollar = new THREE.Mesh(collarGeo, chromeMaterial);
  leftCollar.rotation.z = Math.PI / 2;
  leftCollar.position.x = -1.2;
  group.add(leftCollar);

  const rightCollar = new THREE.Mesh(collarGeo, chromeMaterial);
  rightCollar.rotation.z = Math.PI / 2;
  rightCollar.position.x = 1.2;
  group.add(rightCollar);

  // Hexagonal weight heads
  const headGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.9, 6);
  const accentGeo = new THREE.CylinderGeometry(1.22, 1.22, 0.08, 6);

  // Left head
  const leftHead = new THREE.Mesh(headGeo, weightHeadMaterial);
  leftHead.rotation.z = Math.PI / 2;
  leftHead.position.x = -1.75;
  group.add(leftHead);

  const leftAccent = new THREE.Mesh(accentGeo, accentRingMaterial);
  leftAccent.rotation.z = Math.PI / 2;
  leftAccent.position.x = -1.75;
  group.add(leftAccent);

  // Left outer cap
  const leftCap = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 32), chromeMaterial);
  leftCap.rotation.z = Math.PI / 2;
  leftCap.position.x = -2.25;
  group.add(leftCap);

  // Right head
  const rightHead = new THREE.Mesh(headGeo, weightHeadMaterial);
  rightHead.rotation.z = Math.PI / 2;
  rightHead.position.x = 1.75;
  group.add(rightHead);

  const rightAccent = new THREE.Mesh(accentGeo, accentRingMaterial);
  rightAccent.rotation.z = Math.PI / 2;
  rightAccent.position.x = 1.75;
  group.add(rightAccent);

  // Right outer cap
  const rightCap = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 32), chromeMaterial);
  rightCap.rotation.z = Math.PI / 2;
  rightCap.position.x = 2.25;
  group.add(rightCap);

  return group;
}

/**
 * Procedural BARBELL Mesh
 */
export function createProceduralBarbell(): THREE.Group {
  const group = new THREE.Group();

  const barMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5e7eb,
    metalness: 0.96,
    roughness: 0.18,
  });

  const knurlMaterial = new THREE.MeshStandardMaterial({
    color: 0xb5b9be,
    metalness: 0.92,
    roughness: 0.35,
  });

  const plateMaterial45 = new THREE.MeshStandardMaterial({
    color: 0x141414,
    metalness: 0.65,
    roughness: 0.35,
  });

  const plateMaterial25 = new THREE.MeshStandardMaterial({
    color: 0xD7FF00,
    metalness: 0.8,
    roughness: 0.25,
    emissive: 0xD7FF00,
    emissiveIntensity: 0.2,
  });

  // Long Bar
  const barGeo = new THREE.CylinderGeometry(0.12, 0.12, 8.5, 32);
  const bar = new THREE.Mesh(barGeo, barMaterial);
  bar.rotation.z = Math.PI / 2;
  group.add(bar);

  // Grip knurl zones
  const knurl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 1.4, 32), knurlMaterial);
  knurl1.rotation.z = Math.PI / 2;
  knurl1.position.x = -1.1;
  group.add(knurl1);

  const knurl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 1.4, 32), knurlMaterial);
  knurl2.rotation.z = Math.PI / 2;
  knurl2.position.x = 1.1;
  group.add(knurl2);

  // Sleeves
  const sleeveGeo = new THREE.CylinderGeometry(0.24, 0.24, 2.2, 32);
  const leftSleeve = new THREE.Mesh(sleeveGeo, barMaterial);
  leftSleeve.rotation.z = Math.PI / 2;
  leftSleeve.position.x = -3.2;
  group.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(sleeveGeo, barMaterial);
  rightSleeve.rotation.z = Math.PI / 2;
  rightSleeve.position.x = 3.2;
  group.add(rightSleeve);

  // Plate stacks left
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.25, 36), plateMaterial45);
  p1.rotation.z = Math.PI / 2;
  p1.position.x = -2.6;
  group.add(p1);

  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.25, 36), plateMaterial45);
  p2.rotation.z = Math.PI / 2;
  p2.position.x = -2.9;
  group.add(p2);

  const p3 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.18, 36), plateMaterial25);
  p3.rotation.z = Math.PI / 2;
  p3.position.x = -3.2;
  group.add(p3);

  // Plate stacks right
  const p4 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.25, 36), plateMaterial45);
  p4.rotation.z = Math.PI / 2;
  p4.position.x = 2.6;
  group.add(p4);

  const p5 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.25, 36), plateMaterial45);
  p5.rotation.z = Math.PI / 2;
  p5.position.x = 2.9;
  group.add(p5);

  const p6 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.18, 36), plateMaterial25);
  p6.rotation.z = Math.PI / 2;
  p6.position.x = 3.2;
  group.add(p6);

  return group;
}

/**
 * Procedural KETTLEBELL Mesh
 */
export function createProceduralKettlebell(): THREE.Group {
  const group = new THREE.Group();

  const bellMaterial = new THREE.MeshStandardMaterial({
    color: 0x141414,
    metalness: 0.75,
    roughness: 0.35,
  });

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5e7eb,
    metalness: 0.96,
    roughness: 0.18,
  });

  const bandMaterial = new THREE.MeshStandardMaterial({
    color: 0xD7FF00,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0xD7FF00,
    emissiveIntensity: 0.25,
  });

  // Spherical Bell Body
  const bodyGeo = new THREE.SphereGeometry(1.3, 36, 36);
  const body = new THREE.Mesh(bodyGeo, bellMaterial);
  body.position.y = -0.3;
  body.scale.set(1, 0.95, 1);
  group.add(body);

  // Flat base
  const baseGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.15, 32);
  const base = new THREE.Mesh(baseGeo, bellMaterial);
  base.position.y = -1.45;
  group.add(base);

  // Colored identification band
  const bandGeo = new THREE.TorusGeometry(1.31, 0.05, 16, 64);
  const band = new THREE.Mesh(bandGeo, bandMaterial);
  band.rotation.x = Math.PI / 2;
  band.position.y = -0.2;
  group.add(band);

  // Handle Horns
  const hornGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.9, 24);
  const leftHorn = new THREE.Mesh(hornGeo, handleMaterial);
  leftHorn.position.set(-0.7, 0.9, 0);
  group.add(leftHorn);

  const rightHorn = new THREE.Mesh(hornGeo, handleMaterial);
  rightHorn.position.set(0.7, 0.9, 0);
  group.add(rightHorn);

  // Top Handle arch
  const topHandleGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 24);
  const topHandle = new THREE.Mesh(topHandleGeo, handleMaterial);
  topHandle.rotation.z = Math.PI / 2;
  topHandle.position.set(0, 1.35, 0);
  group.add(topHandle);

  return group;
}

/**
 * Procedural WEIGHT PLATE Mesh
 */
export function createProceduralWeightPlate(): THREE.Group {
  const group = new THREE.Group();

  const urethaneMaterial = new THREE.MeshStandardMaterial({
    color: 0x141414,
    metalness: 0.65,
    roughness: 0.35,
  });

  const centerSteelHub = new THREE.MeshStandardMaterial({
    color: 0xe5e7eb,
    metalness: 0.96,
    roughness: 0.18,
  });

  const accentRimMaterial = new THREE.MeshStandardMaterial({
    color: 0xD7FF00,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0xD7FF00,
    emissiveIntensity: 0.25,
  });

  // Outer rubber disk
  const outerDiskGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.32, 48);
  const outerDisk = new THREE.Mesh(outerDiskGeo, urethaneMaterial);
  outerDisk.rotation.x = Math.PI / 2;
  group.add(outerDisk);

  // Outer beveled rim
  const rimGeo = new THREE.TorusGeometry(2.1, 0.08, 16, 64);
  const rim = new THREE.Mesh(rimGeo, accentRimMaterial);
  group.add(rim);

  // Center stainless hub
  const hubGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.36, 36);
  const hub = new THREE.Mesh(hubGeo, centerSteelHub);
  hub.rotation.x = Math.PI / 2;
  group.add(hub);

  // Olympic hole
  const holeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 32);
  const hole = new THREE.Mesh(holeGeo, new THREE.MeshBasicMaterial({ color: 0x080808 }));
  hole.rotation.x = Math.PI / 2;
  group.add(hole);

  // Recessed inner circle accent
  const innerRingGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 64);
  const innerRing = new THREE.Mesh(innerRingGeo, accentRimMaterial);
  group.add(innerRing);

  return group;
}
