import { uiImages, uiScenes } from "../util/gameKeys";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super(uiScenes.EndScene);
  }

  create() {
    this.cameras.main.fadeIn(100, 0, 0, 0, () => {
      const image = this.add.image(0, 0, uiImages.endImg).setScale(0.3);
      image.setOrigin(0, 0);
    });
  }
}
