import { Position } from "grid-engine";
import { spritesheets, tiledTilemaps, tilesets, ui } from "../assets";
import * as gameKeys from "../util/gameKeys";
// import AshSpriteSheet from "../assets/sprites/ash.png";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Load tileset images
    this.load.image(gameKeys.tilesetImages.ground, tilesets.ground);
    this.load.image(gameKeys.tilesetImages.interior, tilesets.interior);
    this.load.image(gameKeys.tilesetImages.roomBuilder, tilesets.roomBuilder);
    this.load.image(gameKeys.tilesetImages.things, tilesets.things);

    // Load Tiled tilemap JSONs
    this.load.tilemapTiledJSON(gameKeys.tilemaps.map1, tiledTilemaps.map1);
    this.load.tilemapTiledJSON(gameKeys.tilemaps.map2, tiledTilemaps.map2);
    this.load.tilemapTiledJSON(gameKeys.tilemaps.test, tiledTilemaps.test);

    // Load the player spritesheet
    const characterFrame = {
      frameWidth: 64,
      frameHeight: 64,
    };
    this.load.spritesheet(
      gameKeys.spritesheets.ash.key,
      spritesheets.combined,
      {
        ...characterFrame,
        startFrame: 15,
        endFrame: 31,
      }
    );
    this.load.spritesheet(
      gameKeys.spritesheets.player.key,
      spritesheets.combined,
      {
        ...characterFrame,
        startFrame: 0,
        endFrame: 15,
      }
    );

    // Load UI components
    this.load.image(gameKeys.uiImages.dialogueEllipsis, ui.dialogueEllps);
    this.load.image(gameKeys.uiImages.dialogueExclaim, ui.dialogueExclm);
  }

  create() {
    const spawnPosition: Position = {
      x: 23,
      y: 14,
    };
    this.scene.start(gameKeys.scenes.library.key, spawnPosition);
  }
}
