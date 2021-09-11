export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
      active: false,
      visible: false,
    });
  }

  create() {
    // Create player sprite
    const playerSprite = this.add.sprite(0, 0, "player-spritesheet", 0);
    playerSprite.setDepth(3);

    // Create map and tilesets for scene
    const gardenMap = this.make.tilemap({ key: "map1-tilemap" });
    const tilesets = [
      gardenMap.addTilesetImage("ground", "ground-tileset"),
      gardenMap.addTilesetImage("things", "things-tileset"),
    ];

    // Create layers from map
    gardenMap.layers.forEach((layerData, i) => {
      const layer = gardenMap.createLayer(layerData.name, tilesets);
      layer.setDepth(i);
    });

    // Configure camera to folow playerSprite
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.setRoundPixels(true);

    // World and camera bounds
    this.physics.world.setBounds(
      0,
      0,
      gardenMap.widthInPixels,
      gardenMap.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      gardenMap.widthInPixels,
      gardenMap.heightInPixels
    );
  }

  update(time: number, delta: number) {}
}
