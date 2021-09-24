import GroundTileset from "./maps/tilesets/ground.png";
import InteriorTileset from "./maps/tilesets/interior.png";
import RoomBuilderTileset from "./maps/tilesets/room-builder.png";
import ThingsTileset from "./maps/tilesets/things.png";

import Map1Tilemap from "./maps/map1.json";
import Map2Tilemap from "./maps/map2.json";
import TestTilemap from "./maps/test.json";

import PlayerSpriteSheet from "./sprites/player.png";
import AshSpriteSheet from "./sprites/ash-walking-fire-red.png";

export const tilesets = {
  ground: GroundTileset,
  interior: InteriorTileset,
  roomBuilder: RoomBuilderTileset,
  things: ThingsTileset,
};

export const tiledTilemaps = {
  map1: Map1Tilemap,
  map2: Map2Tilemap,
  test: TestTilemap,
};

export const spritesheets = {
  player: PlayerSpriteSheet,
  ash: AshSpriteSheet,
};

// const ASSETS = "src/assets";
// const MAPS = `${ASSETS}/maps`;
// const SPRITES = `${ASSETS}/sprites`;

// export const getTilesetImage = (tilesetImageName: string) =>
//   `${MAPS}/tilesets/${tilesetImageName}.png`;

// export const getTilemapTiledJSON = (tilemapTiledJSON_Name: string) =>
//   `${MAPS}/${tilemapTiledJSON_Name}.json`;

// export const getSpritesheet = (spritesheetName: string) =>
//   `${SPRITES}/${spritesheetName}.png`;
