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

export const scenes = {
  floor4: {
    hallway: {
      key: "scene-hallway4",
      tilemapKey: tilemaps.hallways.floor4,
    },
    f1: {
      key: "scene-f1",
      tilemapKey: tilemaps.rooms.festroom,
    },
    f2: {
      key: "scene-f2",
      tilemapKey: tilemaps.rooms.festroom,
    },
    f3: {
      key: "scene-f3",
      tilemapKey: tilemaps.rooms.festroom,
    },
    f4: {
      key: "scene-f4",
      tilemapKey: tilemaps.rooms.festroom,
    },
  },
  floor5: {
    hallway: {
      key: "scene-hallway5",
      tilemapKey: tilemaps.hallways.floor5,
    },
    c11a: {
      key: "scene-11a",
      tilemapKey: tilemaps.rooms.classroom,
    },
    c11c: {
      key: "scene-11c",
      tilemapKey: tilemaps.rooms.classroom,
    },
  },
};

export const uiScenes = {
  Dialogue: "ui-dialogue",
  EndScene: "scene-endscene",
};

export const uiImages = {
  dialogueExclaim: "dialog-exclm",
  dialogueEllipsis: "dialog-ellps",
  endImg: "end-img",
};

export const sounds = {
  gnjGun: "sound-gnj",
  rasoda: "sound-rasoda",
  coffinDanceMonkey: "sound-coffin-dance-monkey",
  treatYouBetter: "sound-treat-you-better",
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
