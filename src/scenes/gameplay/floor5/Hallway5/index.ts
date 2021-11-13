import * as gameKeys from "../../../../util/gameKeys";
import GameScene from "../../../GameScene";
import doors from "./doors";
import sceneInteractions from "./sInt";

export default class Hallway5 extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.floor5.hallway,
      {
        name: "arya",
        spritesheet: gameKeys.spritesheets.arya,
      },
      doors,
      undefined,
      sceneInteractions
    );
    console.log(doors);
  }

  create() {
    super.create({
      characters: [],
      collisionTilePropertyName: "collides",
    });
  }
}
