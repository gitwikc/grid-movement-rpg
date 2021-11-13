import GameScene from "../../GameScene";
import * as gameKeys from "../../../util/gameKeys";
import { SceneInteraction } from "../../../util/interactions";
import Classroom from "../Classroom";

const sceneInteractions: SceneInteraction[] = [];

export default class C11A extends Classroom {
  constructor() {
    super(
      gameKeys.scenes.floor5.c11a,
      { x: 0, y: 13 },
      gameKeys.scenes.floor5.hallway.key,
      {
        name: "Arya",
        spritesheet: gameKeys.spritesheets.arya,
      }
    );
  }

  create() {
    super.create({
      characters: [],
      collisionTilePropertyName: "collides",
    });
  }
}
