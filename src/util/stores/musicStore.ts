import create from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { sounds } from "../gameKeys";

interface MusicState {
  current?: Phaser.Sound.BaseSound;
  index?: number;
  playNext: (scene: Phaser.Scene) => void;
}

const musicStore = create<MusicState>(
  devtools((set) => ({
    index: -1,
    playNext: (scene) =>
      set((state) => {
        const bgms = Object.values(sounds).filter((_v, i) => i > 0);
        const i = (state.index! + 1) % bgms!.length;
        state.current?.stop();
        state.current?.destroy();
        const nextMusic = scene.sound.add(bgms![i], {
          volume: 0.3,
          loop: true,
        });
        nextMusic.play();

        return {
          index: i,
          current: nextMusic,
        };
      }),
  }))
);

export default musicStore;
