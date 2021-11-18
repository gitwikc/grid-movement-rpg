import { CharacterData } from "grid-engine";
import {
  sattwikCharacterData,
  sattwikFollowArya,
} from "../../../../util/commons";
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
    const characters: CharacterData[] = [];
    if (this.gameStore().objectives.TEAM_SATTWIK)
      characters.push(sattwikCharacterData(this));
    super.create({
      characters,
      collisionTilePropertyName: "collides",
    });

    // Sattwik follows if on the team
    sattwikFollowArya(this);
  }
}
