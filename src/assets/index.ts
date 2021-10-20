import GroundTileset from "./maps/tilesets/ground.png";
import InteriorTileset from "./maps/tilesets/interior.png";
import RoomBuilderTileset from "./maps/tilesets/room-builder.png";
import ThingsTileset from "./maps/tilesets/things.png";

import Map1Tilemap from "./maps/map1.json";
import Map2Tilemap from "./maps/map2.json";
import TestTilemap from "./maps/test.json";

import PlayerSpriteSheet from "./sprites/player.png";
import AshSpriteSheet from "./sprites/ash.png";
import CombinedSheet from "./sprites/spritesheet.png";

import DialogExclm from "./ui/dialog-exclm.png";
import DialogEllipsis from "./ui/dialog-ellps.png";

import AnoopSoni from "./ui/anoop-soni.jpg";

import Cursor from "../assets/ui/cursor.png";
import CursorDown from "../assets/ui/cursor-down.png";

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
  combined: CombinedSheet,
};

export const ui = {
  dialogueEllps: DialogEllipsis,
  dialogueExclm: DialogExclm,
  anoopSoni: AnoopSoni,
  cursor: Cursor,
  cursorDown: CursorDown,
};
