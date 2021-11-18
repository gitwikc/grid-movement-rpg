import GroundTileset from "./maps/tilesets/ground.png";
import InteriorTileset from "./maps/tilesets/interior.png";
import RoomBuilderTileset from "./maps/tilesets/room-builder.png";
import ThingsTileset from "./maps/tilesets/things.png";

// Import TILEMAP JSONS
import TilemapFloor4 from "./maps/hallways/floor-4.json";
import TilemapFloor5 from "./maps/hallways/floor-5.json";
import TilemapClassroom from "./maps/rooms/classroom.json";
import TilemapsFestroom from "./maps/rooms/festroom.json";

// Import SPRITESHEETS
import SpritesheetArya from "./spritesheets/arya.png";
import SpritesheetSattwik from "./spritesheets/sattwik.png";
import SpritesheetStudentF from "./spritesheets/student-f.png";
import SpritesheetStudentM from "./spritesheets/student-m.png";

import DialogExclm from "./ui/dialog-exclm.png";
import DialogEllipsis from "./ui/dialog-ellps.png";

// Import Music
import GnjGun from "./sounds/ooo.mp3";
import TreatYouBetter from "./sounds/treat-you-better.mp3";
import Rasoda from "./sounds/rasoda.mp3";
import CoffinDanceMonkey from "./sounds/coffin-dance-monkey.mp3";

import Cursor from "../assets/ui/cursor.png";
import CursorDown from "../assets/ui/cursor-down.png";
import EndImg from "../assets/ui/end-img.png";

export const tilesets = {
  ground: GroundTileset,
  interior: InteriorTileset,
  roomBuilder: RoomBuilderTileset,
  things: ThingsTileset,
};

export const tiledTilemaps = {
  // Tiled Tilemap JSON names
  hallways: {
    floor4: TilemapFloor4,
    floor5: TilemapFloor5,
  },
  rooms: {
    classroom: TilemapClassroom,
    festroom: TilemapsFestroom,
  },
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
  endImg: EndImg,
};

export const sounds = {
  gnjGun: GnjGun,
  treatYouBetter: TreatYouBetter,
  rasoda: Rasoda,
  coffinDanceMonkey: CoffinDanceMonkey,
};
