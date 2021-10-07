import { Direction, Position } from "grid-engine";
import * as gameKeys from "../util/gameKeys";

export interface Door {
  position: Position;
  dest: {
    sceneKey: string;
    position: Position;
    direction: Direction;
  };
}

export interface SceneDoor {
  sceneKey: string;
  doors: Door[];
}

const createDoor = (
  x0: number,
  y0: number,
  destSceneKey: string,
  x1: number,
  y1: number,
  direction: Direction = Direction.DOWN
): Door => ({
  position: { x: x0, y: y0 },
  dest: { sceneKey: destSceneKey, position: { x: x1, y: y1 }, direction },
});

const createDoors = (
  positions: number[][],
  destSceneKey: string,
  x1: number,
  y1: number,
  direction: Direction = Direction.DOWN
): Door[] =>
  positions.map((position) =>
    createDoor(position[0], position[1], destSceneKey, x1, y1, direction)
  );

const doors: SceneDoor[] = [
  {
    sceneKey: gameKeys.scenes.library.key,
    doors: [createDoor(25, 28, gameKeys.scenes.garden.key, 2, 6)],
  },

  {
    sceneKey: gameKeys.scenes.garden.key,
    doors: [
      createDoor(2, 5, gameKeys.scenes.library.key, 25, 27, Direction.UP),
      createDoor(15, 3, gameKeys.scenes.classroom.key, 18, 2),
    ],
  },

  {
    sceneKey: gameKeys.scenes.classroom.key,
    doors: [
      ...createDoors(
        [
          [17, 1],
          [18, 1],
        ],
        gameKeys.scenes.garden.key,
        15,
        4
      ),
    ],
  },
];

export const getDoorsForScene = (sceneKey: string): Door[] =>
  doors.filter((door: SceneDoor) => door.sceneKey === sceneKey)[0]?.doors;
