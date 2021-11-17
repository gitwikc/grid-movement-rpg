import { CharacterData, Direction } from "grid-engine";
import {
  createStudentCharacter,
  sattwikCharacterData,
  sattwikFollowArya,
} from "../../../util/commons";
import { Gender, House, scenes, spritesheets } from "../../../util/gameKeys";
import Classroom from "../Classroom";

export default class F1 extends Classroom {
  constructor() {
    super(
      scenes.floor4.f1,
      { x: 16, y: 13 },
      scenes.floor4.hallway.key,
      { name: "arya", spritesheet: spritesheets.arya },
      {},
      []
    );
  }

  create() {
    const characters: CharacterData[] = [
      sattwikCharacterData(this),
      {
        ...createStudentCharacter(this, Gender.FEMALE, House.BLUE, {
          x: 12,
          y: 3,
        }),
        facingDirection: Direction.DOWN,
      },
      {
        ...createStudentCharacter(this, Gender.MALE, House.GREEN, {
          x: 6,
          y: 3,
        }),
        facingDirection: Direction.DOWN,
      },
      {
        ...createStudentCharacter(this, Gender.MALE, House.BLUE, {
          x: 1,
          y: 10,
        }),
        facingDirection: Direction.RIGHT,
      },
      {
        ...createStudentCharacter(this, Gender.FEMALE, House.RED, {
          x: 1,
          y: 15,
        }),
        facingDirection: Direction.RIGHT,
      },
    ];

    super.create({ characters, collisionTilePropertyName: "collides" });

    sattwikFollowArya(this);
  }
}
