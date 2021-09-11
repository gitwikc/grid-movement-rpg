import GridControls from "../util/GridControls";
import GridPhysics from "../util/GridPhysics";
import { Player } from "../util/Player";

export default class GameScene extends Phaser.Scene {
  static readonly TILE_SIZE = 48;

  private gridControls!: GridControls;
  private gridPhysics!: GridPhysics;

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

    // Create Player object for playerSprite
    const player = new Player(playerSprite, new Phaser.Math.Vector2(2, 6));

    // Create grid controls and grid physics
    this.gridPhysics = new GridPhysics(player);
    this.gridControls = new GridControls(this.input, this.gridPhysics);
  }

  update(time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }
}
