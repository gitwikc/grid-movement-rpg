import { Direction } from "./Direction";
import GridPhysics from "./GridPhysics";

export default class GridControls {
  constructor(
    private input: Phaser.Input.InputPlugin,
    private gridPhysics: GridPhysics
  ) {}

  update() {
    const controls = this.input.keyboard.createCursorKeys();

    if (controls.left.isDown) {
      this.gridPhysics.movePlayer(Direction.LEFT);
    } else if (controls.right.isDown) {
      this.gridPhysics.movePlayer(Direction.RIGHT);
    } else if (controls.up.isDown) {
      this.gridPhysics.movePlayer(Direction.UP);
    } else if (controls.down.isDown) {
      this.gridPhysics.movePlayer(Direction.DOWN);
    } else {
      this.gridPhysics.startMoving(Direction.NONE);
    }
  }
}
