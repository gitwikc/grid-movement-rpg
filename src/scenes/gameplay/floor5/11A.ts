import GameScene from "../../GameScene";
import * as gameKeys from "../../../util/gameKeys";
import { SceneInteraction } from "../../../util/interactions";
import Classroom from "../Classroom";
import { CharacterData } from "grid-engine";
import { sattwikCharacterData, sattwikFollowArya } from "../../../util/commons";

const sceneInteractions: SceneInteraction[] = [];

export default class C11A extends Classroom {
  constructor() {
    super(
      gameKeys.scenes.floor5.c11a,
      { x: 0, y: 13 },
      gameKeys.scenes.floor5.hallway.key,
      {
        name: "arya",
        spritesheet: gameKeys.spritesheets.arya,
      }
    );
  }

  create() {
    const characters: CharacterData[] = [];
    if (this.gameStore().objectives.TEAM_SATTWIK)
      characters.push(sattwikCharacterData(this));
    super.create({
      characters,
      collisionTilePropertyName: "collides",
    });

    sattwikFollowArya(this);
  }
}
