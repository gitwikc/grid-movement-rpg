import { createSignboardInteraction } from "../../../../util/helpers";
import { SceneInteraction } from "../../../../util/interactions";
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
];

export default sceneInteractions;
