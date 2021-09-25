import { spritesheets, tiledTilemaps, tilesets } from "../assets";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Load tileset images
    this.load.image("ground-tileset", tilesets.ground);
    this.load.image("interior-tileset", tilesets.interior);
    this.load.image("room-builder-tileset", tilesets.roomBuilder);
    this.load.image("things-tileset", tilesets.things);

    // Load Tiled tilemap JSONs
    this.load.tilemapTiledJSON("map1-tilemap", tiledTilemaps.map1);
    this.load.tilemapTiledJSON("map2-tilemap", tiledTilemaps.map2);
    this.load.tilemapTiledJSON("test-tilemap", tiledTilemaps.test);

    // Load the player spritesheet
    const characterFrame = {
      frameWidth: 64,
      frameHeight: 64,
    };
    this.load.spritesheet(
      "player-spritesheet",
      spritesheets.player,
      characterFrame
    );

    // Load NPC spritesheets
    this.load.spritesheet(
      "ash-spritesheet",
      spritesheets.player,
      characterFrame
    );
  }

  create() {
    this.scene.start("GameScene");
  }
}
