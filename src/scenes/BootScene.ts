import { Position } from "grid-engine";
import { tilesets, ui, spritesheets, tiledTilemaps } from "../assets";
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
    this.load.tilemapTiledJSON(
      gameKeys.tilemaps.hallways.floor4,
      tiledTilemaps.hallways.floor4
    );
    this.load.tilemapTiledJSON(
      gameKeys.tilemaps.hallways.floor5,
      tiledTilemaps.hallways.floor5
    );
    this.load.tilemapTiledJSON(
      gameKeys.tilemaps.rooms.classroom,
      tiledTilemaps.rooms.classroom
    );
    this.load.tilemapTiledJSON(
      gameKeys.tilemaps.rooms.festroom,
      tiledTilemaps.rooms.festroom
    );

    // Load the spritesheets
    this.load.spritesheet(
      gameKeys.spritesheets.arya.key,
      spritesheets.arya,
      this.createSpriteConfig(gameKeys.spritesheets.arya.index)
    );
    this.load.spritesheet(
      gameKeys.spritesheets.sattwik.key,
      spritesheets.sattwik,
      this.createSpriteConfig(gameKeys.spritesheets.sattwik.index)
    );
    this.load.spritesheet(
      gameKeys.spritesheets.studentF.key,
      spritesheets.studentF,
      { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet(
      gameKeys.spritesheets.studentM.key,
      spritesheets.studentM,
      { frameWidth: 64, frameHeight: 64 }
    );

    // Load UI components
    this.load.image(gameKeys.uiImages.dialogueEllipsis, ui.dialogueEllps);
    this.load.image(gameKeys.uiImages.dialogueExclaim, ui.dialogueExclm);

    // Load other assets
  }

  create() {
    const spawnPosition: Position = {
      x: 13,
      y: 45,
    };

    this.scene.start(gameKeys.scenes.floor5.hallway.key, {
      spawnPosition,
    });
  }
}
