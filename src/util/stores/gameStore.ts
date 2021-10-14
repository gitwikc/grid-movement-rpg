import create from "zustand/vanilla";

export enum Objective {
  MEET_ASH = "MEET_ASH",
  CHECK_PC = "CHECK_PC",
  FIND_PHONE = "FIND_PHONE",
}

export interface GameState {
  objectives: { [key in Objective]: boolean };
  completeObjective: (objective: Objective) => void;
}

const gameStore = create<GameState>((set) => ({
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
}));

export default gameStore;
