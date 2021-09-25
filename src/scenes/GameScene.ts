// @ts-nocheck
import { Direction, GridEngineConfig } from "grid-engine";
import playerWalkingAnimationMap from "../util/walkAnim";

enum NPCs {
  ash = "ash",
  gary = "gary",
}

export default class GameScene extends Phaser.Scene {
  private playerSprite!: Phaser.GameObjects.Sprite;
  private map!: Phaser.Tilemaps.Tilemap;

  private npcs!: { [key in NPCs]: Phaser.GameObjects.Sprite | null };

  private controls!: object;

  private readonly CAMERA_FOLLOW_SPEED: number = 0.4;

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
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  createPlayerSprite(): void {
    // Create player sprite
    this.playerSprite = this.add.sprite(0, 0, "player-spritesheet", 0);
  }

  createNPCSprites(): void {
    // Create NPC Sprites
    this.npcs = {
      ash: this.add.sprite(0, 0, "ash-spritesheet", 0),
      gary: null,
    };

    this.npcs.ash?.setScale(1.1);
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

  preload() {
    this.createControlKeys();
    this.createPlayerSprite();
    this.createNPCSprites();
    this.createMap();
    this.setupCamera();
  }

  create() {
    // GridEngine config
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: this.playerSprite,
          walkingAnimationMapping: playerWalkingAnimationMap,
          startPosition: { x: 16, y: 8 },
          facingDirection: Direction.DOWN,
          collides: true,
        },
        {
          id: "ash",
          sprite: this.npcs.ash!,
          walkingAnimationMapping: playerWalkingAnimationMap,
          startPosition: { x: 13, y: 7 },
          facingDirection: Direction.RIGHT,
          collides: true,
        },
      ],
      collisionTilePropertyName: "collides",
    };
    this.gridEngine.create(this.map, gridEngineConfig);

    // Listen for position change
    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        if (charId === "player") {
          const facing = this.gridEngine.getFacingPosition("player");
          // console.log(`${charId} is facing ${JSON.stringify(facing)}`);

          if (facing.x === 6 && facing.y === 11) {
            this.scene.launch("Dialogue", {
              meta: { root: this },
              dialogueSets: [
                {
                  speaker: "May",
                  content: ["Whoa! Look at that pot", "I wonder what's in it"],
                },
                {
                  speaker: "Potter",
                  content: [
                    "Those are special ones that heal health by 3",
                    "Each costs $5",
                  ],
                },
                {
                  speaker: "May",
                  content: ["Noice", "(May come in handy later)"],
                },
              ],
            });
            this.scene.pause();
          }
        }
      });

    // Ash follows player
    this.gridEngine.follow("ash", "player", 1, true);
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

    if (this.controls.space.isDown) {
      this.gridEngine.setSpeed("player", 7);
    } else {
      this.gridEngine.setSpeed("player", 4);
    }
  }
}
