import GroundTileset from "./maps/tilesets/ground.png";
import InteriorTileset from "./maps/tilesets/interior.png";
import RoomBuilderTileset from "./maps/tilesets/room-builder.png";
import ThingsTileset from "./maps/tilesets/things.png";

// Import TILEMAP JSONS

// Import SPRITESHEETS
import SpritesheetArya from "./spritesheets/arya.png";
import SpritesheetSattwik from "./spritesheets.sattwik.png";
import SpritesheetStudentF from "./spritesheets/student-f.png";
import SpritesheetStudentM from "./spritesheets/student-m.png";

import DialogExclm from "./ui/dialog-exclm.png";
import DialogEllipsis from "./ui/dialog-ellps.png";

// Import EXTRA ASSETS

import Cursor from "../assets/ui/cursor.png";
import CursorDown from "../assets/ui/cursor-down.png";

export const tilesets = {
  ground: GroundTileset,
  interior: InteriorTileset,
  roomBuilder: RoomBuilderTileset,
  things: ThingsTileset,
};

export const tiledTilemaps = {
  // Tiled Tilemap JSON names
};

export const spritesheets = {
  // Spritesheet names
  arya: SpritesheetArya,
  sattwik: SpritesheetSattwik,
  studentF: SpritesheetStudentF,
  studentM: SpritesheetStudentM,
};

export const ui = {
  dialogueEllps: DialogEllipsis,
  dialogueExclm: DialogExclm,
  cursor: Cursor,
  cursorDown: CursorDown,
};
