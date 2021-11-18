import { sounds } from "../../../../util/gameKeys";
import { SceneInteraction } from "../../../../util/interactions";
import musicStore from "../../../../util/stores/musicStore";
import { DialogAction } from "../../../Dialogue";

const sceneInteractions: SceneInteraction[] = [
  {
    positions: [{ x: 15, y: 1 }],
    getInteraction: (scene, _state) => {
      const music = musicStore.getState();
      const bgms = Object.values(sounds)
        .filter((_v, i) => i > 0)
        .map((s) => `${s.substring(s.indexOf("-") + 1)}.mp3`);
      const i = music.index;

      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Arya",
            content: ["Charge hora na phone?", "... ... ha thik hai"],
          },
          {
            speaker: "OPPO F1",
            content: [
              `NOW PLAYING >>> ${bgms[i!]}`,
              "Playing next song...",
              `>>> ${bgms[(i! + 1) % bgms.length]}`,
            ],
          },
        ],
        callback: () => music.playNext(scene),
      };
    },
  },
];

export default sceneInteractions;
