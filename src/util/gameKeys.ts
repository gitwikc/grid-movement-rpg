import { Direction, Position } from "grid-engine";

export interface SpritesheetData {
  key: string;
  index: number;
}

export interface SpriteData {
  name: string;
  spritesheet: SpritesheetData;
}

export interface SceneData {
  key: string;
  tilemapKey: string;
}

export const tilesetImages = {
  ground: "tileset-ground",
  interior: "tileset-interior",
  roomBuilder: "tileset-room-builder",
  things: "tileset-things",
};

export const tilemaps = {
  map1: "tilemap-map1",
  map2: "tilemap-map2",
  test: "tilemap-test",
};

export const spritesheets = {
  player: {
    key: "spritesheet-player",
    index: 0,
  },
  ash: {
    key: "spritesheet-ash",
    index: 1,
  },
};

export const scenes = {
  garden: {
    key: "scene-garden",
    tilemapKey: tilemaps.map1,
  },
  library: {
    key: "scene-library",
    tilemapKey: tilemaps.test,
  },
  classroom: {
    key: "scene-classroom",
    tilemapKey: tilemaps.map2,
  },
};
