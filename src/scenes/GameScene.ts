import { Direction, GridEngineConfig } from "grid-engine";
import { Grid } from "matter";

export default class GameScene extends Phaser.Scene {
  private playerSprite!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private map!: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({
      key: "GameScene",
      active: false,
      visible: false,
    });
  }

  createPlayerSprite(): void {
    // Create player sprite
    this.playerSprite = this.physics.add.sprite(0, 0, "player-spritesheet", 0);
    this.playerSprite.setDepth(3);
  }

  createMap(): void {
    // Create map and tilesets for scene
    this.map = this.make.tilemap({ key: "map1-tilemap" });
    const tilesets = [
      this.map.addTilesetImage("ground", "ground-tileset"),
      this.map.addTilesetImage("things", "things-tileset"),
    ];

    // Create layers from map
    this.map.layers.forEach((layerData, i) => {
      const layer = this.map.createLayer(layerData.name, tilesets);
      layer.setDepth(i);
    });
  }
  setupCamera(): void {
    // Configure camera to folow playerSprite
    this.cameras.main.startFollow(this.playerSprite);
    this.cameras.main.setRoundPixels(true);

    // World and camera bounds
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  create() {
    this.createPlayerSprite();
    this.createMap();
    this.setupCamera();

    // GridEngine config
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: this.playerSprite,
          walkingAnimationMapping: {
            up: {
              leftFoot: 15,
              standing: 12,
              rightFoot: 13,
            },
            right: {
              leftFoot: 9,
              standing: 8,
              rightFoot: 10,
            },
            down: {
              leftFoot: 3,
              standing: 0,
              rightFoot: 1,
            },
            left: {
              leftFoot: 7,
              standing: 4,
              rightFoot: 5,
            },
          },
          startPosition: { x: 9, y: 11 },
          facingDirection: Direction.DOWN,
          collides: true,
        },
      ],
      collisionTilePropertyName: "collides",
      numberOfDirections: 4,
    };
    this.gridEngine.create(this.map, gridEngineConfig);
  }

  update(time: number, delta: number) {}
}
