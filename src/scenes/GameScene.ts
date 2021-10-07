// @ts-nocheck
import {
  CharacterData,
  Direction,
  GridEngineConfig,
  Position,
} from "grid-engine";
import getPlayerWalkingAnimationMap from "../util/walkAnim";
import playerWalkingAnimationMap from "../util/walkAnim";
import * as gameKeys from "../util/gameKeys";
import { Door, getDoorsForScene } from "../util/doors";

export default class GameScene extends Phaser.Scene {
  protected playerSprite: Phaser.GameObjects.Sprite;
  protected npcs: { [key: string]: Phaser.GameObjects.Sprite | null };
  protected map: Phaser.Tilemaps.Tilemap;

  protected spawnPosition: Position = { x: 0, y: 0 };
  protected spawnDirection: Direction = Direction.DOWN;

  protected doors: Door[];

  private controls;

  private readonly CAMERA_FOLLOW_SPEED: number = 0.4;

  constructor(
    private sceneData: gameKeys.SceneData,
    private playerSpriteData: gameKeys.SpriteData
  ) {
    super({ key: sceneData.key });
    console.log(this.sceneData);

    // Get the doors for the scene
    this.doors = getDoorsForScene(sceneData.key);
  }

  init(spawnPosition, direction) {
    this.spawnPosition = spawnPosition;
    this.spawnDirection = direction;
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
    // this.createNPCSprites(); Called in child class
    this.createPlayerSprite(); // Same for all sprites
    this.createMap(); // Same for all
    this.setupCamera(); // Same for all scenes
  }

  create(gridEngineConfig: GridEngineConfig) {
    this.cameras.main.fadeIn(300);

    // Add the player character (same for all scenes, do it here)
    const playerCharacter: CharacterData = {
      id: this.playerSpriteData.name,
      sprite: this.playerSprite,
      speed: 4,
      collides: true,
      startPosition: this.spawnPosition,
      facingDirection: this.spawnDirection,
      walkingAnimationMapping: getPlayerWalkingAnimationMap(
        this.playerSpriteData.spritesheet.index
      ),
    };
    gridEngineConfig.characters.push(playerCharacter);
    this.gridEngine.create(this.map, gridEngineConfig);

    // Listen for position change
    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) =>
        this.checkDialogueDoor(charId)
      );
    this.gridEngine
      .directionChanged()
      .subscribe(({ charId, direction }) => this.checkDialogueDoor(charId));
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
      this.gridEngine.setSpeed(this.playerSpriteData.name, 7);
    } else {
      this.gridEngine.setSpeed(this.playerSpriteData.name, 4);
    }
  }

  /**
   * Finds the door at a position in the scene
   * @param position The position at which the door is to be found in this scene
   * @returns A Door object, if any found
   */
  getDoorAtPosition(position: Position): Door | undefined {
    return this.doors?.filter(
      (door) => door.position.x === position.x && door.position.y === position.y
    )[0];
  }

  /**
   * Checks for the dialogue/door at the current facing
   * position of the player
   */
  checkDialogueDoor(charId: string) {
    if (charId === this.playerSpriteData.name) {
      //  Player character alwaya named player
      const playerFacingPosition = this.gridEngine.getFacingPosition(
        this.playerSpriteData.name
      );
      // console.log(playerFacingPosition);

      // TODO Check if a dialogue should be said

      // TODO Check if player @ door, open the other scene
      const doorAtCurrentPosition =
        this.getDoorAtPosition(playerFacingPosition);
      if (doorAtCurrentPosition) {
        const { dest } = doorAtCurrentPosition;

        this.cameras.main.fadeOut(300, 0, 0, 0, () => {
          this.scene.start(dest.sceneKey, dest.position);
          this.scene.stop();
        });
      }
    }
  }
}
