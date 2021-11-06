import { Direction, Position } from "grid-engine";
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

const doors: SceneDoor[] = [];

export const getDoorsForScene = (sceneKey: string): Door[] =>
  doors.filter((door: SceneDoor) => door.sceneKey === sceneKey)[0]?.doors;
