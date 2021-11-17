import { CharacterData, Direction } from "grid-engine";
import {
  createStudentCharacter,
  getOutOfStockInteraction,
  getStallInteraction,
  sattwikCharacterData,
  sattwikFollowArya,
} from "../../../util/commons";
import { Gender, House, scenes, spritesheets } from "../../../util/gameKeys";
import { Snack } from "../../../util/stores/festStore";
import Classroom from "../Classroom";
import Festroom from "../Festroom";

// export default class F1 extends Classroom {
//   constructor() {
//     super(
//       scenes.floor4.f1,
//       { x: 16, y: 13 },
//       scenes.floor4.hallway.key,
//       { name: "arya", spritesheet: spritesheets.arya },
//       {},
//       [
//         {
//           positions: [
//             { x: 12, y: 5 },
//             { x: 13, y: 5 },
//           ],
//           getInteraction: getStallInteraction(Snack.SPDP),
//         },
//         {
//           positions: [
//             { x: 6, y: 5 },
//             { x: 7, y: 5 },
//           ],
//           getInteraction: getOutOfStockInteraction,
//         },
//         {
//           positions: [
//             { x: 3, y: 9 },
//             { x: 3, y: 10 },
//           ],
//           getInteraction: getStallInteraction(Snack.PANI_PURI),
//         },
//         {
//           positions: [
//             { x: 3, y: 14 },
//             { x: 3, y: 15 },
//           ],
//           getInteraction: getOutOfStockInteraction,
//         },
//       ]
//     );
//   }

//   create() {
//     const characters: CharacterData[] = [
//       sattwikCharacterData(this),
//       {
//         ...createStudentCharacter(this, Gender.FEMALE, House.BLUE, {
//           x: 12,
//           y: 3,
//         }),
//         facingDirection: Direction.DOWN,
//       },
//       {
//         ...createStudentCharacter(this, Gender.MALE, House.GREEN, {
//           x: 6,
//           y: 3,
//         }),
//         facingDirection: Direction.DOWN,
//       },
//       {
//         ...createStudentCharacter(this, Gender.MALE, House.BLUE, {
//           x: 1,
//           y: 10,
//         }),
//         facingDirection: Direction.RIGHT,
//       },
//       {
//         ...createStudentCharacter(this, Gender.FEMALE, House.RED, {
//           x: 1,
//           y: 15,
//         }),
//         facingDirection: Direction.RIGHT,
//       },
//     ];

//     super.create({ characters, collisionTilePropertyName: "collides" });

//     sattwikFollowArya(this);
//   }
// }

export default class F1 extends Festroom {
  constructor() {
    super([
      {
        gender: Gender.FEMALE,
        house: House.RED,
        snack: Snack.SPDP,
      },
      {
        gender: Gender.MALE,
        house: House.GREEN,
      },
      {
        gender: Gender.MALE,
        house: House.BLUE,
        snack: Snack.PANI_PURI,
      },
      {
        gender: Gender.FEMALE,
        house: House.GREEN,
      },
    ]);
  }
}
