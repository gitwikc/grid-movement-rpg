// @ts-ignore
import { Direction } from "grid-engine";

const getPlayerWalkingAnimationMap = (playerIndex: number = 0) => ({
  up: {
    leftFoot: playerIndex * 16 + 15,
    standing: playerIndex * 16 + 12,
    rightFoot: playerIndex * 16 + 13,
  },
  right: {
    leftFoot: playerIndex * 16 + 9,
    standing: playerIndex * 16 + 8,
    rightFoot: playerIndex * 16 + 11,
  },
  down: {
    leftFoot: playerIndex * 16 + 3,
    standing: playerIndex * 16 + 0,
    rightFoot: playerIndex * 16 + 1,
  },
  left: {
    leftFoot: playerIndex * 16 + 7,
    standing: playerIndex * 16 + 4,
    rightFoot: playerIndex * 16 + 5,
  },
});

export default getPlayerWalkingAnimationMap;
