import Phaser from "phaser";
import { GridEngine } from "grid-engine";
import BootScene from "./scenes/BootScene";
import ClassroomScene from "./scenes/ClassroomScene";
import Dialogue from "./scenes/Dialogue";
import GardenScene from "./scenes/GardenScene";
import LibraryScene from "./scenes/LibraryScene";

// @ts-ignore
const game = new Phaser.Game({
  width: 640,
  height: 480,
  type: Phaser.AUTO,
  dom: {
    createContainer: true,
  },
  parent: "app",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [{ key: "gridEngine", plugin: GridEngine, mapping: "gridEngine" }],
  },
  backgroundColor: 0x46c6f7,
  roundPixels: true,
  pixelArt: true,
  scene: [BootScene, GardenScene, LibraryScene, ClassroomScene, Dialogue],
});
