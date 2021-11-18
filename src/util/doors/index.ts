import { Direction } from "grid-engine";
import { GameState } from "../stores/gameStore";
import { Door } from "./types";

/**
 * Creates a door
 *
 * @param x0 X Position of door in current scene
 * @param y0 Y Position of door in current scene
 * @param destSceneKey Key of destination scene to which the door leads
 * @param x1 X Position of entry in destination scene
 * @param y1 Y Position of entry in destination scene
 * @param direction Direction of entry
 * @param isLocked Is this door locked?
 * @param updateState Function to update state when player enters this door
 * @returns A Door
 */
export const createDoor = (
  x0: number,
  y0: number,
  destSceneKey: string,
  x1: number,
  y1: number,
  direction: Direction = Direction.DOWN,
  isLocked: (state: GameState) => boolean = () => false,
  updateState?: (state: GameState) => void
): Door => ({
  position: { x: x0, y: y0 },
  dest: { sceneKey: destSceneKey, position: { x: x1, y: y1 }, direction },
  isLocked,
  updateState,
});

/**
 * Create a bigger Door than spans more than one tile.
 * Pass in Positions of all the tiles which are part of the door
 *
 * @param positions Positions in current scene whic are part of this door
 * @param destSceneKey Key of destination scene to which the door leads
 * @param x1 X Position of entry in destination scene
 * @param y1 Y Position of entry in destination scene
 * @param direction Direction of entry
 * @param locked Is this door locked?
 * @param updateState Function to update state when player enters this door
 * @returns Array of Doors
 */
export const createDoors = (
  positions: number[][],
  destSceneKey: string,
  x1: number,
  y1: number,
  direction: Direction = Direction.DOWN,
  isLocked: (state: GameState) => boolean = () => false,
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
      isLocked,
      updateState
    )
  );


