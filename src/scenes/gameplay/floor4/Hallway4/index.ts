// @ts-nocheck
import { CharacterData, Direction } from "grid-engine";
import {
  createStudentCharacter,
  sattwikCharacterData,
  sattwikFollowArya,
} from "../../../../util/commons";
import * as gameKeys from "../../../../util/gameKeys";
import {
  getCharWalkingAnimationMap,
  getRandomGender,
  getRandomHouse,
} from "../../../../util/helpers";
import { DialogAction } from "../../../Dialogue";
import GameScene from "../../../GameScene";
import { getRandomComment } from "./cInt";
import doors from "./doors";
import sceneInteractions from "./sInt";

export default class Hallway4 extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.floor4.hallway,
      {
        name: "arya",
        spritesheet: gameKeys.spritesheets.arya,
      },
      doors,
      {},
      sceneInteractions
    );
  }

  createNPCSprites() {
    // TODO Create NPCs here
  }

  create() {
    const characters: CharacterData[] = [];
    if (this.gameStore().objectives.TEAM_SATTWIK)
      characters.push(sattwikCharacterData(this));

    // Token counter
    characters.push({
      id: "token-girl",
      sprite: this.add
        .sprite(0, 0, gameKeys.spritesheets.studentF.key)
        .setScale(1.2),
      walkingAnimationMapping: getCharWalkingAnimationMap(gameKeys.House.RED),
      collides: true,
      startPosition: { x: 14, y: 4 },
      facingDirection: Direction.LEFT,
    });

    // TODO Add other NPCs
    for (var i = 0; i < 20; i++)
      characters.push(
        createStudentCharacter(
          this,
          Math.random() > 0.5 ? gameKeys.Gender.MALE : gameKeys.Gender.FEMALE,
          Math.floor(Math.random() * 4),
          {
            x: Math.floor(Math.random() * 11) + 2,
            y: Math.floor(Math.random() * 58) + 18,
          }
        )
      );

    super.create({
      characters,
      collisionTilePropertyName: "collides",
    });

    sattwikFollowArya(this);

    // Random movement and comments for NPCs
    const npcIds = this.gridEngine
      .getAllCharacters()
      .filter((c: string) => c.startsWith("stu-"));

    npcIds.forEach((c: string) => {
      this.gridEngine.moveRandomly(
        c,
        Math.floor(Math.random() * 400),
        Math.floor(Math.random() * 5) + 3
      );
      this.characterInteractions[c] = (scene, state) => ({
        action: DialogAction.NORMAL,
        dialogueSets: [{ speaker: "Student", content: getRandomComment() }],
      });
    });
  }
}
