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

export const tilemaps = {};

export const spritesheets = {
  arya: "spritesheet-arya",
  sattwik: "spritesheet-sattwik",
  studentF: "spritesheet-studentF",
  studentM: "spritesheet-studentM",
};

export const scenes = {};

export const uiScenes = {
  Dialogue: "ui-dialogue",
};

export const uiImages = {
  dialogueExclaim: "dialog-exclm",
  dialogueEllipsis: "dialog-ellps",
};

/**
 * Enumerator House for spritesheet index
 * Pass this in getCharWalkingAnimationMap as index
 */
export enum House {
  YELLOW = 0,
  RED = 1,
  BLUE = 2,
  GREEN = 3,
}

export enum Gender {
  FEMALE,
  MALE,
}
