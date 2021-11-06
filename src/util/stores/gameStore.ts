import { Position } from "grid-engine";
import create from "zustand/vanilla";
import { devtools } from "zustand/middleware";

// Declare in format OBJECTIVE_NAME = "OBJECTIVE_NAME"
export enum Objective {}

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

const gameStore = create<GameState>(
  devtools((set) => ({
    objectives: {
      // Set all objectives to false at init
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
  }))
);

export default gameStore;
