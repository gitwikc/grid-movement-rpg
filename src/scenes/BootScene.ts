import { Position } from "grid-engine";
import { spritesheets, tiledTilemaps, tilesets, ui } from "../assets";
import * as gameKeys from "../util/gameKeys";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  createSpriteConfig(
    index: number
  ): Phaser.Types.Loader.FileTypes.ImageFrameConfig {
    return {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: index * 16,
      endFrame: index * 16 + 15,
    };
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

    // Load the spritesheets
    Object.keys(gameKeys.spritesheets).forEach((key) => {
      // @ts-ignore
      const spritesheet = gameKeys.spritesheets[key];
      this.load.spritesheet(
        spritesheet.key,
        spritesheets.combined,
        this.createSpriteConfig(spritesheet.index)
      );
    });

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
