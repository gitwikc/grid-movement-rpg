import { Position } from "grid-engine";
import create from "zustand/vanilla";

export enum Objective {
  MEET_ASH = "MEET_ASH",
  CHECK_PC = "CHECK_PC",
  FIND_PHONE = "FIND_PHONE",
}

export interface GameState {
  objectives: { [key in Objective]: boolean };
  completeObjective: (objective: Objective) => void;
  currentScene: string;
  setCurrentScene: (sceneKey: string) => void;
  playerPosition: Position;
  setPlayerPosition: (position: Position) => void;
  playerFacingPosition: Position;
  setPlayerFacingPosition: (position: Position) => void;
}

const gameStore = create<GameState>((set) => ({
  // OBJECTIVES
  objectives: {
    MEET_ASH: false,
    CHECK_PC: false,
    FIND_PHONE: false,
  },
  completeObjective: (objective: Objective) =>
    set((state) => {
      const objectives = { ...state.objectives };
      objectives[objective] = true;
      return { objectives };
    }),

  // SCENE & PLAYER
  currentScene: "",
  setCurrentScene: (sceneKey: string) => {
    console.log(`Setting current scene to "${sceneKey}""`);
    set({ currentScene: sceneKey });
  },
  playerPosition: { x: 0, y: 0 },
  setPlayerPosition: (playerPosition: Position) => {
    set({ playerPosition });
  },
  playerFacingPosition: { x: 0, y: 0 },
  setPlayerFacingPosition: (playerFacingPosition: Position) => {
    set({ playerFacingPosition });
  },
}));

export default gameStore;
