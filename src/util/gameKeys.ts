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

export const spritesheets = {};

export const scenes: { [key: string]: SceneData } = {};

export const uiScenes = {
  Dialogue: "ui-dialogue",
};

export const uiImages = {
  dialogueExclaim: "dialog-exclm",
  dialogueEllipsis: "dialog-ellps",
};
