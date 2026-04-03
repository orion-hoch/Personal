import { useMemo } from 'react';
import * as THREE from 'three';
import { generateMap } from '../data/mapData';
import { generateTile } from '../engine/tiles';
import { GROUND_SIZE } from '../engine/gridUtils';
import { MAP_SIZE } from '../data/mapData';

/** Size of each tile when rendered top-down for the ground texture */
const TEX_TILE_SIZE = 64;
const TEX_SIZE = MAP_SIZE * TEX_TILE_SIZE;

export default function Ground() {
  const texture = useMemo(() => {
    const tileMap = generateMap();
    const canvas = document.createElement('canvas');
    canvas.width = TEX_SIZE;
    canvas.height = TEX_SIZE;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    // Render each tile as a top-down square onto the ground texture
    // We reuse the isometric tile generator but just draw the colors as flat squares
    for (let row = 0; row < MAP_SIZE; row++) {
      for (let col = 0; col < MAP_SIZE; col++) {
        const tileType = tileMap[row][col];
        const variant = (col * 7 + row * 13) % 50;
        const tileCanvas = generateTile(tileType, variant);

        // The tile canvas is 128x64 isometric diamond. We'll sample the center region
        // and stretch it into a square, or more simply: draw the tile canvas scaled into the square cell
        ctx.drawImage(
          tileCanvas,
          0, 0, tileCanvas.width, tileCanvas.height,
          col * TEX_TILE_SIZE, row * TEX_TILE_SIZE, TEX_TILE_SIZE, TEX_TILE_SIZE,
        );
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
}
