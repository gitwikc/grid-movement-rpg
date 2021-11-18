import * as gameKeys from "../../../../util/gameKeys";
import Classroom from "../../Classroom";
import {
  createStudentCharacterConfig,
  getCharWalkingAnimationMap,
} from "../../../../util/helpers";
import { Direction } from "grid-engine";
import characterInteractions from "./cInt";
import { sattwikFollowArya } from "../../../../util/commons";

export default class C11C extends Classroom {
  constructor() {
    super(
      gameKeys.scenes.floor5.c11c,
      { x: 1, y: 25 },
      gameKeys.scenes.floor5.hallway.key,
      {
        name: "arya",
        spritesheet: gameKeys.spritesheets.arya,
      },
      characterInteractions
    );
  }

  createNPCSprites() {
    this.npcs = {
      sattwik: this.add.sprite(0, 0, gameKeys.spritesheets.sattwik.key),

      hrishi: this.add.sprite(0, 0, gameKeys.spritesheets.studentM.key),
      rishi: this.add.sprite(0, 0, gameKeys.spritesheets.studentM.key),
      sanskar: this.add.sprite(0, 0, gameKeys.spritesheets.studentM.key),
      neel: this.add.sprite(0, 0, gameKeys.spritesheets.studentM.key),

      samiksha: this.add.sprite(0, 0, gameKeys.spritesheets.studentF.key),
      nandika: this.add.sprite(0, 0, gameKeys.spritesheets.studentF.key),
      riddhi: this.add.sprite(0, 0, gameKeys.spritesheets.studentF.key),
    };
  }
  create() {
    this.createNPCSprites();
    super.create({
      characters: [
        createStudentCharacterConfig(
          "hrishi",
          this.npcs.hrishi!,
          gameKeys.House.YELLOW,
          { x: 14, y: 16 },
          Direction.RIGHT
        ),
        createStudentCharacterConfig(
          "rishi",
          this.npcs.rishi!,
          gameKeys.House.GREEN,
          { x: 13, y: 8 },
          Direction.UP
        ),
        createStudentCharacterConfig(
          "sanskar",
          this.npcs.sanskar!,
          gameKeys.House.YELLOW,
          { x: 15, y: 16 },
          Direction.LEFT
        ),
        createStudentCharacterConfig(
          "neel",
          this.npcs.neel!,
          gameKeys.House.YELLOW,
          { x: 14, y: 15 },
          Direction.DOWN
        ),
        createStudentCharacterConfig(
          "samiksha",
          this.npcs.samiksha!,
          gameKeys.House.RED,
          { x: 5, y: 7 },
          Direction.LEFT
        ),
        createStudentCharacterConfig(
          "nandika",
          this.npcs.nandika!,
          gameKeys.House.RED,
          { x: 2, y: 9 },
          Direction.RIGHT
        ),
        createStudentCharacterConfig(
          "riddhi",
          this.npcs.riddhi!,
          gameKeys.House.YELLOW,
          { x: 4, y: 8 },
          Direction.DOWN
        ),
        {
          id: "sattwik",
          sprite: this.npcs.sattwik!,
          startPosition: { x: 10, y: 15 },
          speed: 4,
          collides: true,
          walkingAnimationMapping: getCharWalkingAnimationMap(0),
        },
      ],
      collisionTilePropertyName: "collides",
    });

    // Sattwik follows if on the team
    sattwikFollowArya(this);
  }
}
