// @ts-nocheck
import { sounds } from "../../../../util/gameKeys";
import { createSignboardInteraction } from "../../../../util/helpers";
import { SceneInteraction } from "../../../../util/interactions";
import musicStore from "../../../../util/stores/musicStore";
import { DialogAction } from "../../../Dialogue";

const sceneInteractions: SceneInteraction[] = [
  {
    positions: [
      { x: 6, y: 2 },
      { x: 7, y: 2 },
      { x: 8, y: 2 },
      { x: 9, y: 2 },
      { x: 10, y: 2 },
      { x: 11, y: 2 },
    ],
    getInteraction: (scene, state) => ({
      action: DialogAction.NORMAL,
      dialogueSets: [
        {
          speaker: "Arya",
          content: ["Wah kya scene hai!", "WAH KYA SCENE HAI!!!"],
        },
      ],
    }),
  },

  {
    positions: [{ x: 13, y: 4 }],
    getInteraction: (scene, state) => ({
      action: DialogAction.NORMAL,
      dialogueSets: [
        {
          speaker: "Arya",
          content: [
            "Ma'am ke table pe kya hai dekhte...",
            "12th valo ke test paper! Ayo!",
          ],
        },
      ],
    }),
  },

  createSignboardInteraction(
    [{ x: 10, y: 6 }],
    ["Mrs. Lily, Supervisor, Higher Secondary Section"]
  ),

  createSignboardInteraction([{ x: 1, y: 12 }], ["11 A"]),
  createSignboardInteraction([{ x: 16, y: 12 }], ["12 C"]),
  createSignboardInteraction([{ x: 1, y: 24 }], ["11 C"]),
  createSignboardInteraction([{ x: 16, y: 19 }], ["11 B"]),
  createSignboardInteraction([{ x: 1, y: 37 }], ["12 B"]),
  createSignboardInteraction([{ x: 16, y: 59 }], ["11 D"]),

  createSignboardInteraction(
    [{ x: 16, y: 30 }],
    ["Teachers' room", "No entry for students without permission"]
  ),
  createSignboardInteraction([{ x: 15, y: 45 }], ["To 4th floor"]),
  createSignboardInteraction([{ x: 15, y: 48 }], ["To Terrace [LOCKED]"]),
  createSignboardInteraction([{ x: 1, y: 68 }], ["Girls' Washroom"]),
  createSignboardInteraction([{ x: 16, y: 68 }], ["Boys' Washroom"]),

  {
    positions: [
      { x: 18, y: 69 },
      { x: 18, y: 70 },
    ],
    getInteraction: (scene, state) => {
      if (!state.objectives.TEAM_SATTWIK)
        return {
          action: DialogAction.NORMAL,
          dialogueSets: [
            {
              speaker: "Arya",
              content: [
                "Toilet to locked hai",
                "Yeh kya awaaz hai?",
                "Packet khol rahe hain? Nikalta baba...",
              ],
            },
          ],
        };
      else
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [
            {
              speaker: "Arya",
              content: [
                "Bro pichhli baar aya tha kuch ajib ho raha tha yaha",
                "Packet vacket kholre the",
              ],
            },
            {
              speaker: "Sattwik",
              content: [
                "Andar se locked hai...",
                "AREY! Ye dhua kya hai? Kahi yeh...",
                "...",
              ],
            },
            { speaker: "Arya", content: ["Arey yeh smell to...", "..."] },
            { speaker: "Sattwik & Arya", content: ["OOOH NOOOOOOOOOOO!!!!!"] },
          ],
          callback: () => {
            scene.cameras.main.shake(250, 0.02, true, () => {
              const c = document.querySelector(
                "#app > canvas"
              ) as HTMLCanvasElement;
              c.style.animationName = "drunk";

              const bgMusic = musicStore.getState();
              bgMusic.current?.stop();

              const music = scene.sound.add(sounds.gnjGun);
              music.play({ volume: 0.3 });

              music.once("complete", () => {
                c.style.animationName = "";
                bgMusic.current?.play();
              });
            });
          },
        };
    },
  },
];

export default sceneInteractions;
