import { GridEngine } from "grid-engine";
import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import Dialogue from "./scenes/Dialogue";
import GardenScene from "./scenes/GardenScene";

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
  scene: [BootScene, GardenScene, Dialogue],
});
