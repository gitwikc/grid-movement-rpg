// @ts-nocheck
import { Direction, GridEngineConfig } from "grid-engine";
import getPlayerWalkingAnimationMap from "../util/walkAnim";
import playerWalkingAnimationMap from "../util/walkAnim";
import * as gameKeys from "../util/gameKeys";

export default class GameScene extends Phaser.Scene {
  protected playerSprite: Phaser.GameObjects.Sprite;
  protected npcs: { [key: string]: Phaser.GameObjects.Sprite | null };
  protected map: Phaser.Tilemaps.Tilemap;

  private controls;

  private readonly CAMERA_FOLLOW_SPEED: number = 0.4;

  constructor(
    private sceneData: gameKeys.SceneData,
    private playerSpriteData: gameKeys.SpriteData
  ) {
    super({ key: sceneData.key });
    console.log(this.sceneData);
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
    this.playerSprite = this.add.sprite(
      0,
      0,
      this.playerSpriteData.spritesheet.key,
      0
    );
  }

  /**
   * This is gonna be overridden
   */
  createNPCSprites(): void {}

  createMap(): void {
    // Create map and tilesets for scene
    this.map = this.make.tilemap({ key: this.sceneData.tilemapKey });

    // Just loading up all tileset imags available
    const tilesets = [
      this.map.addTilesetImage("ground", gameKeys.tilesetImages.ground),
      this.map.addTilesetImage("things", gameKeys.tilesetImages.things),
      this.map.addTilesetImage("furniture", gameKeys.tilesetImages.interior),
      this.map.addTilesetImage("room", gameKeys.tilesetImages.roomBuilder),
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
    this.createControlKeys(); // Same for all scenes
    this.createNPCSprites(); // Overridden
    this.createPlayerSprite(); // Same for all sprites
    this.createMap(); // Same for all
    this.setupCamera(); // Same for all scenes
  }

  create(gridEngineConfig: GridEngineConfig) {
    // GridEngine config
    // const usedToBeTheGEConfig = {
    //   characters: [
    //     {
    //       id: gameKeys.spritesheets.player.name,
    //       sprite: this.playerSprite,
    //       walkingAnimationMapping: getPlayerWalkingAnimationMap(0),
    //       startPosition: { x: 16, y: 8 },
    //       facingDirection: Direction.DOWN,
    //       collides: true,
    //     },
    //     {
    //       id: gameKeys.spritesheets.ash.name,
    //       sprite: this.npcs.ash,
    //       walkingAnimationMapping: getPlayerWalkingAnimationMap(1),
    //       startPosition: { x: 13, y: 7 },
    //       facingDirection: Direction.RIGHT,
    //       collides: true,
    //     },
    //   ],
    //   collisionTilePropertyName: "collides",
    // };
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

    // Do this stuff in the child class
    // Ash follows player
    // this.gridEngine.follow(
    //   gameKeys.spritesheets.ash.name,
    //   gameKeys.spritesheets.player.name,
    //   1,
    //   true
    // );
  }

  update(time: number, delta: number) {
    if (this.controls.down.isDown) {
      this.gridEngine.move(this.playerSpriteData.name, Direction.DOWN);
    } else if (this.controls.up.isDown) {
      this.gridEngine.move(this.playerSpriteData.name, Direction.UP);
    } else if (this.controls.left.isDown) {
      this.gridEngine.move(this.playerSpriteData.name, Direction.LEFT);
    } else if (this.controls.right.isDown) {
      this.gridEngine.move(this.playerSpriteData.name, Direction.RIGHT);
    }

    if (this.controls.space.isDown) {
      this.gridEngine.setSpeed("player", 7);
    } else {
      this.gridEngine.setSpeed("player", 4);
    }
  }
}
