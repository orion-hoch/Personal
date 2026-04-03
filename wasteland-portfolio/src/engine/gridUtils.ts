// Convert 2D grid coordinates to 3D world positions
// Grid is MAP_SIZE x MAP_SIZE, centered at origin

import { MAP_SIZE } from '../data/mapData';
import type { BuildingDef } from './types';

/** Spacing between tile centers in 3D units */
export const TILE_SPACING = 2;

/** Convert grid (col, row) to 3D world (x, y, z) on the XZ plane */
export function gridTo3D(col: number, row: number, y: number = 0): [number, number, number] {
  const x = (col - MAP_SIZE / 2) * TILE_SPACING;
  const z = (row - MAP_SIZE / 2) * TILE_SPACING;
  return [x, y, z];
}

export function getBuildingAnchor(building: Pick<BuildingDef, 'gridCol' | 'gridRow' | 'width' | 'height' | 'anchorCol' | 'anchorRow'>): [number, number] {
  return [
    building.anchorCol ?? building.gridCol + building.width / 2,
    building.anchorRow ?? building.gridRow + building.height / 2,
  ];
}

/** Total world size of the ground plane */
export const GROUND_SIZE = MAP_SIZE * TILE_SPACING;
