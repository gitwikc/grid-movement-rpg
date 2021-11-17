import { Direction } from "grid-engine";
import { createDoors } from "../../../../util/doors";
import { Door } from "../../../../util/doors/types";
import * as gameKeys from "../../../../util/gameKeys";
import Classroom from "../../Classroom";

const doors: Door[] = [
  ...createDoors(
    [
      [16, 49],
      [17, 49],
    ],
    gameKeys.scenes.floor5.hallway.key,
    15,
    46,
    Direction.LEFT
  ),

  ...Classroom.CREATE_DOORS_TO_CLASSROOM(
    [
      [18, 13],
      [18, 14],
    ],
    gameKeys.scenes.floor4.f1.key
  ),
];

export default doors;
