import GameScene from "../scenes/GameScene";
import { Direction } from "./Direction";
import { Player } from "./Player";

export default class GridPhysics {
  private movementDirection: Direction;
  private speedPixelsPerSecond: number = GameScene.TILE_SIZE * 4;
  private movementDirectionVectors: {
    [key in Direction]: Phaser.Math.Vector2;
  } = {
    [Direction.UP]: Phaser.Math.Vector2.UP,
    [Direction.DOWN]: Phaser.Math.Vector2.DOWN,
    [Direction.LEFT]: Phaser.Math.Vector2.LEFT,
    [Direction.RIGHT]: Phaser.Math.Vector2.RIGHT,
    [Direction.NONE]: Phaser.Math.Vector2.ZERO,
  };
  private tileSizePixelsWalked: number = 0;

  constructor(private player: Player) {
    this.movementDirection = Direction.NONE;
  }

  movePlayer(direction: Direction): void {
    if (!this.isMoving()) {
      this.startMoving(direction);
    }
  }

  isMoving(): boolean {
    return this.movementDirection !== Direction.NONE;
  }

  startMoving(direction: Direction): void {
    this.movementDirection = direction;
  }

  stopMoving(): void {
    this.movementDirection = Direction.NONE;
  }

  updatePlayerPosition(delta: number): void {
    const pixelsToMoveThisUpdate = this.getPixelsToMoveThisUpdate(delta);

    if (this.willCrossTileBorderThisUpdate(pixelsToMoveThisUpdate)) {
      this.movePlayerSprite(GameScene.TILE_SIZE - this.tileSizePixelsWalked);
      this.stopMoving();
    } else {
      this.movePlayerSprite(pixelsToMoveThisUpdate);
    }
  }

  movePlayerSprite(pixelsToMoveThisUpdate: number): void {
    const directionVec =
      this.movementDirectionVectors[this.movementDirection].clone();
    const movementDistance = directionVec.multiply(
      new Phaser.Math.Vector2(pixelsToMoveThisUpdate)
    );
    const newPlayerPosition = this.player.getPosition().add(movementDistance);
    this.player.setPosition(newPlayerPosition);

    this.tileSizePixelsWalked += pixelsToMoveThisUpdate;
    this.tileSizePixelsWalked %= GameScene.TILE_SIZE;
  }

  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: number
  ): boolean {
    return (
      this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= GameScene.TILE_SIZE
    );
  }

  getPixelsToMoveThisUpdate(delta: number): number {
    return this.speedPixelsPerSecond * delta * 1e-3;
  }

  update(delta: number): void {
    if (this.isMoving()) {
      this.updatePlayerPosition(delta);
    }
  }
}
