// @ts-ignore
import { Direction } from "grid-engine";

const playerWalkingAnimationMap = {
  up: {
    leftFoot: 15,
    standing: 12,
    rightFoot: 13,
  },
  right: {
    leftFoot: 9,
    standing: 8,
    rightFoot: 11,
  },
  down: {
    leftFoot: 3,
    standing: 0,
    rightFoot: 1,
  },
  left: {
    leftFoot: 7,
    standing: 4,
    rightFoot: 5,
  },
};

export default playerWalkingAnimationMap;
