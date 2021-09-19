import { Direction, GridEngineConfig } from "grid-engine";

export default class GameScene extends Phaser.Scene {
  private playerSprite!: Phaser.GameObjects.Sprite;
  private map!: Phaser.Tilemaps.Tilemap;

  private controls;

  private readonly CAMERA_FOLLOW_SPEED: number = 0.5;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  createControlKeys(): void {
    this.controls = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  createPlayerSprite(): void {
    // Create player sprite
    this.playerSprite = this.add.sprite(0, 0, "player-spritesheet", 0);
    this.playerSprite.setDepth(0); // Literally set to 0 but render over all other layers!
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
    this.cameras.main.setLerp(
      this.CAMERA_FOLLOW_SPEED,
      this.CAMERA_FOLLOW_SPEED
    );
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
    this.createControlKeys();
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
              rightFoot: 11,
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
          startPosition: { x: 16, y: 8 },
          facingDirection: Direction.DOWN,
          collides: true,
        },
      ],
      collisionTilePropertyName: "collides",
    };
    this.gridEngine.create(this.map, gridEngineConfig);
  }

  update(time: number, delta: number) {
    if (this.controls.down.isDown) {
      this.gridEngine.move("player", Direction.DOWN);
    } else if (this.controls.up.isDown) {
      this.gridEngine.move("player", Direction.UP);
    } else if (this.controls.left.isDown) {
      this.gridEngine.move("player", Direction.LEFT);
    } else if (this.controls.right.isDown) {
      this.gridEngine.move("player", Direction.RIGHT);
    }
  }
}
