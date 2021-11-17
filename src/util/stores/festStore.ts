import create from "zustand/vanilla";
import { devtools } from "zustand/middleware";

export enum Snack {
  SAMOSA = "Samosa",
  SPRING_ROLL = "Spring roll",
  KULFI = "Kulfi",
  FRUIT_CHAAT = "Fruit chaat",
  SPDP = "SPDP",
  PANI_PURI = "Pani puri",
}

export interface FestState {
  tokens: number;
  refillTokens: () => void;
  useToken: (snack: Snack) => void;
  snacksEaten: Snack[];
}

const festStore = create<FestState>(
  devtools((set) => ({
    tokens: 0,
    refillTokens: () => set({ tokens: 3 }),
    snacksEaten: [],
    useToken: (snack) =>
      set((state) => ({
        snacksEaten: [...state.snacksEaten, snack],
        tokens: state.tokens - 1,
      })),
  }))
);

export default festStore;
