import Phaser from "phaser";
import { GridEngine } from "grid-engine";
import BootScene from "./scenes/BootScene";
import Dialogue from "./scenes/Dialogue";
import { ui } from "./assets";

const app = document.getElementById("app")!;
app.onmousedown = () => {
  app.style.cursor = `url(${ui.cursorDown}), auto`;
};
app.onmouseup = () => {
  window.setTimeout(() => {
    app.style.cursor = `url(${ui.cursor}), auto`;
  }, 120);
};

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

  // Add all scenes to be used here
  scene: [BootScene, Dialogue],
});
