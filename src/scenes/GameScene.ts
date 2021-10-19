// @ts-nocheck
import {
  CharacterData,
  Direction,
  GridEngineConfig,
  Position,
} from "grid-engine";
import getCharWalkingAnimationMap from "../util/walkAnim";
import playerWalkingAnimationMap from "../util/walkAnim";
import * as gameKeys from "../util/gameKeys";
import { Door, getDoorsForScene } from "../util/doors";
import gameStore from "../util/stores/gameStore";
import {
  CharacterInteractions,
  getSceneInteraction,
  Interaction,
  SceneInteraction,
} from "../util/interactions";
import { DialogAction, dialogueSet } from "./Dialogue";
import { charactersAreColliding, charactersF2F } from "../util/helpers";

export default class GameScene extends Phaser.Scene {
  protected playerSprite: Phaser.GameObjects.Sprite;
  protected npcs: { [key: string]: Phaser.GameObjects.Sprite | null };
  protected map: Phaser.Tilemaps.Tilemap;

  protected spawnPosition: Position = { x: 0, y: 0 };
  protected spawnDirection: Direction = Direction.DOWN;

  protected doors: Door[];

  protected gameStore = gameStore.getState;

  private controls;

  private readonly CAMERA_FOLLOW_SPEED: number = 0.4;

  constructor(
    private sceneData: gameKeys.SceneData,
    private playerSpriteData: gameKeys.SpriteData,
    private characterInteractions?: CharacterInteractions,
    private sceneInteractions?: SceneInteraction[]
  ) {
    super({ key: sceneData.key });
    this.doors = getDoorsForScene(sceneData.key);
  }

  init(spawnPosition: Position, direction: Direction) {
    this.spawnPosition = spawnPosition;
    this.spawnDirection = direction;
    this.gameStore().setCurrentScene(this.scene.key);

    console.log(this.gameStore());
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

  get playerPos() {
    return {
      x: Math.round(this.playerSprite.x),
      y: Math.round(this.playerSprite.y),
    };
  }

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
      walkingAnimationMapping: getCharWalkingAnimationMap(
        this.playerSpriteData.spritesheet.index
      ),
    };
    gridEngineConfig.characters.push(playerCharacter);
    this.gridEngine.create(this.map, gridEngineConfig);

    // Listen for position change
    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) =>
        this.checkDialogueDoor({ charId, exitTile, enterTile })
      );
    this.gridEngine.directionChanged().subscribe(({ charId, direction }) =>
      this.checkDialogueDoor({
        charId,
        direction,
      })
    );
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
  checkDialogueDoor({
    charId,
    exitTile,
    enterTile,
    direction,
  }: {
    charId: string;
    exitTile?: Position;
    enterTile?: Position;
    direction?: Direction;
  }): void {
    if (charId === this.playerSpriteData.name) {
      // Update player position in state
      if (enterTile) {
        this.gameStore().setPlayerPosition(enterTile);
      }

      const playerFacingPosition = this.gridEngine.getFacingPosition(
        this.playerSpriteData.name
      );
      this.gameStore().setPlayerFacingPosition(playerFacingPosition);

      // Check if a dialogue should be said (non-character collision)
      if (this.sceneInteractions) {
        const interaction = getSceneInteraction(
          this.sceneInteractions,
          playerFacingPosition
        )?.getInteraction(this, this.gameStore());
        if (interaction)
          this.launchDialogue(interaction.action, interaction.dialogueSets);
        if (interaction?.callback) interaction.callback();
      }

      // Check for character interaction
      if (this.characterInteractions) this.checkCharacterInteractions();

      // Check if player @ door, open the other scene
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

  checkCharacterInteractions(): void {
    console.log(this.characterInteractions);
    this.gridEngine.getAllCharacters().forEach((charId: string) => {
      if (
        charactersAreColliding(this.playerSpriteData.name, charId, this) &&
        this.characterInteractions[charId]
      ) {
        const characterInteraction = this.characterInteractions[charId](
          this,
          this.gameStore()
        );
        if (characterInteraction?.dialogueSets) {
          charactersF2F(this, this.playerSpriteData.name, charId);
          this.launchDialogue(
            characterInteraction.action,
            characterInteraction.dialogueSets
          );
        }
        if (characterInteraction?.callback) characterInteraction.callback();
      }
    });
  }

  launchDialogue(action: DialogAction, dialogueSets: dialogueSet[]): void {
    this.scene.launch(gameKeys.uiScenes.Dialogue, {
      meta: { root: this },
      dialogueSets,
    });
    const bubble = this.add.image(
      this.playerSprite.x + 32,
      this.playerSprite.y - 8,
      action === DialogAction.EXCLAIM
        ? gameKeys.uiImages.dialogueExclaim
        : gameKeys.uiImages.dialogueEllipsis
    );
    bubble.setScale(1.5);
    bubble.setDepth(999);
    this.events.on("resume", () => {
      bubble.destroy();
    });
    this.scene.pause();
  }
}
