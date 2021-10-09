import { Position } from "grid-engine";
import create from "zustand/vanilla";

const sceneStore = create((set) => ({
  currentScene: "",
  setCurrentScene: (sceneKey: string) => {
    console.log(`Setting current scene to "${sceneKey}""`);
    set({ currentScene: sceneKey });
  },

  playerPosition: { x: 0, y: 0 },
  setPlayerPosition: (playerPosition: Position) => set({ playerPosition }),

  playerFacingPosition: { x: 0, y: 0 },
  setPlayerFacingPosition: (playerFacingPosition: Position) =>
    set({ playerFacingPosition }),
}));

export default sceneStore;
