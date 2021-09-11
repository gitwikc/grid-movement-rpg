import { GridEngine } from "grid-engine";
import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";

const game = new Phaser.Game({
  width: 640,
  height: 480,
  type: Phaser.AUTO,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [{ key: "gridEngine", plugin: GridEngine, mapping: "gridEngine" }],
  },
  backgroundColor: 0x26262d,
  parent: "app",
  roundPixels: true,
  pixelArt: true,
  scene: [BootScene, GameScene],
});
