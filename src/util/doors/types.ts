import { Direction, Position } from "grid-engine";
import { GameState } from "../stores/gameStore";

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
