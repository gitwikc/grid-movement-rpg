import { Direction } from "grid-engine";
import { createDoors } from "../../../../util/doors";
import { Door } from "../../../../util/doors/types";
import * as gameKeys from "../../../../util/gameKeys";
import gameStore from "../../../../util/stores/gameStore";
import Classroom from "../../Classroom";

const doors: Door[] = [
  ...Classroom.CREATE_DOORS_TO_CLASSROOM(
    [
      [-1, 13],
      [-1, 14],
    ],
    gameKeys.scenes.floor5.c11a.key
  ),
  ...Classroom.CREATE_DOORS_TO_CLASSROOM(
    [
      [-1, 25],
      [-1, 26],
    ],
    gameKeys.scenes.floor5.c11c.key
  ),

  ...createDoors(
    [
      [16, 46],
      [17, 46],
    ],
    gameKeys.scenes.floor4.hallway.key,
    15,
    49,
    Direction.LEFT,
    () => {
      const obj = gameStore.getState().objectives;
      return !(obj.TEAM_SATTWIK && obj.ASK_HRISHI && obj.ASK_SAMIKSHA);
    }
  ),
];

export default doors;
