import { Direction, Position } from "grid-engine";
import * as gameKeys from "../util/gameKeys";
import { positionsEqual } from "./helpers";
import { GameState } from "./stores/gameStore";

export interface Door {
  position: Position;
  dest: {
    sceneKey: string;
    position: Position;
    direction: Direction;
  };
  locked: boolean;
  updateState?: (state: GameState) => void;
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
  direction: Direction = Direction.DOWN,
  locked: boolean = false,
  updateState?: (state: GameState) => void
): Door => ({
  position: { x: x0, y: y0 },
  dest: { sceneKey: destSceneKey, position: { x: x1, y: y1 }, direction },
  locked,
  updateState,
});

const createDoors = (
  positions: number[][],
  destSceneKey: string,
  x1: number,
  y1: number,
  direction: Direction = Direction.DOWN,
  locked: boolean = false,
  updateState?: (state: GameState) => void
): Door[] =>
  positions.map((position) =>
    createDoor(
      position[0],
      position[1],
      destSceneKey,
      x1,
      y1,
      direction,
      locked,
      updateState
    )
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
        4,
        Direction.DOWN,
        false,
        (state) => {
          if (state.objectives.MEET_ASH && state.objectives.CHECK_PC) {
            const classMainDoors = doors
              .find((door) => door.sceneKey === gameKeys.scenes.classroom.key)
              ?.doors.filter(
                (door) =>
                  positionsEqual(door.position, { x: 17, y: 1 }) ||
                  positionsEqual(door.position, { x: 18, y: 1 })
              );
            classMainDoors?.forEach((door) => (door.locked = true));
          }
        }
      ),
    ],
  },
];

export const getDoorsForScene = (sceneKey: string): Door[] =>
  doors.filter((door: SceneDoor) => door.sceneKey === sceneKey)[0]?.doors;
