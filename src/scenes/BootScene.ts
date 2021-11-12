import { Position } from "grid-engine";
import { tilesets, ui, spritesheets } from "../assets";
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

    // Load the spritesheets
    this.load.spritesheet(gameKeys.spritesheets.arya, spritesheets.arya);
    this.load.spritesheet(gameKeys.spritesheets.sattwik, spritesheets.sattwik);
    this.load.spritesheet(
      gameKeys.spritesheets.studentF,
      spritesheets.studentF
    );
    this.load.spritesheet(
      gameKeys.spritesheets.studentM,
      spritesheets.studentM
    );

    // Load UI components
    this.load.image(gameKeys.uiImages.dialogueEllipsis, ui.dialogueEllps);
    this.load.image(gameKeys.uiImages.dialogueExclaim, ui.dialogueExclm);

    // Load other assets
  }

  create() {
    const spawnPosition: Position = {
      x: 0,
      y: 0,
    };
    this.scene.start("KEY_TO_STARTING_SCENE", spawnPosition);
  }
}
