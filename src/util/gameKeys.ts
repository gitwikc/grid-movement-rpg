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
  hallways: {
    floor4: "tilemap-floor4",
    floor5: "tilemap-floor5",
  },
  rooms: {
    classroom: "tilemaps-classroom",
    festroom: "tilemaps-festroom",
  },
};

export const spritesheets = {
  arya: { key: "spritesheet-arya", index: 0 },
  sattwik: { key: "spritesheet-sattwik", index: 0 },
  studentF: { key: "spritesheet-studentF" },
  studentM: { key: "spritesheet-studentM" },
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
