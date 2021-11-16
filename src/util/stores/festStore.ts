import create from "zustand";

export enum Snack {
  SAMOSA = "SAMOSA",
  SPRING_ROLL = "SPRING_ROLL",
  KULFI = "KULFI",
  FRUIT_CHAAT = "FRUIT_CHAAT",
  SPDP = "SPDP",
  PANI_PURI = "PANI_PURI",
}

export interface FestState {
  tokens: number;
  refillTokens: () => void;
  useToken: (snack: Snack) => void;
  snacksEaten: Snack[];
}

const festStore = create<FestState>((set) => ({
  tokens: 0,
  refillTokens: () => set({ tokens: 3 }),
  snacksEaten: [],
  useToken: (snack) =>
    set((state) => ({ snacksEaten: [...state.snacksEaten, snack] })),
}));

export default festStore;
