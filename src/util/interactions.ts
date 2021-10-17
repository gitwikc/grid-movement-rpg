// @ts-nocheck

import { Position } from "grid-engine";
import { GameState, Objective } from "./stores/gameStore";
import * as gameKeys from "../util/gameKeys";
import { DialogAction, dialogueSet } from "../scenes/Dialogue";
import { positionsEqual } from "./helpers";
import GameScene from "../scenes/GameScene";

export interface Interaction {
  positions: Position[];
  getDialogues: (state: GameState) => dialogueSet[] | undefined;
}

export interface SceneInteractions {
  sceneKey: string;
  interactions: Interaction[];
}

export interface CharacterInteractions {
  [key: string]: (
    scene: GameScene,
    state: GameState
  ) => {
    action: DialogAction;
    dialogueSets?: dialogueSet[];
    callback?: (...args: any) => any;
  };
}

const interactions: SceneInteractions[] = [
  {
    sceneKey: gameKeys.scenes.library.key,
    interactions: [
      {
        positions: [{ x: 29, y: 14 }],
        getDialogues: (state: GameState) => {
          if (state.objectives.MEET_ASH) {
            state.completeObjective(Objective.CHECK_PC);
            return [
              {
                speaker: "Player",
                content: [
                  "Let's see the CCTV footage to see if we can find your phone",
                  "I am sure it'll be some help at least",
                ],
              },
              {
                speaker: "PC",
                content: [
                  "ZZZZ... ZZZZ... Brrrr...",
                  "Accessing footage",
                  "...",
                  "Query complete!",
                ],
              },
              {
                speaker: "Ash",
                content: ["I wonder if my phone fell in the garden"],
              },
              {
                speaker: "Player",
                content: [
                  "Hmm... No signs of it there",
                  "...",
                  "OH LOOK! It fell in the classroom dustbin while you were dumping something",
                  "Let's go get your phone, Ash!",
                ],
              },
              {
                speaker: "Ash",
                content: ["*sigh* Yes!", "Let's go!!"],
              },
            ];
          } else {
            return [
              {
                speaker: "Player",
                content: [
                  "Perhaps this is not the time to use the PC",
                  "I should go into the garden to get some fresh air",
                ],
              },
            ];
          }
        },
      },
    ],
  },
];

export const getInteractionFor = (
  sceneKey: string,
  position: Position
): Interaction | undefined => {
  let reqInteraction: Interaction | undefined;
  interactions
    .filter((sceneInteraction) => sceneInteraction.sceneKey === sceneKey)[0] // The interactions in the scene
    ?.interactions.forEach((interaction) =>
      interaction.positions.forEach((p) => {
        if (positionsEqual(p, position)) reqInteraction = interaction;
      })
    );
  return reqInteraction;
};

const characterInteractions: CharacterInteraction[] = [
  {
    charId: "ash",
    getActions: (scene, state) => {
      if (!state.objectives.MEET_ASH) {
        state.completeObjective(Objective.MEET_ASH);
        return {
          dialogueSets: [
            {
              speaker: "ash",
              content: [
                "Excuse me, have you seen a flip phone somewhere?",
                "It's my lucky charm and I seem to have lost it",
                "Surely, I had it in my pocket in the morning...",
              ],
            },
            {
              speaker: "player",
              content: [
                "Well, I have some time before class starts.",
                "I could help you find it",
              ],
            },
            {
              speaker: "ash",
              content: ["Oh, thank you! Let's search together"],
            },
          ],
          callback: () => {
            scene.gridEngine.startFollow("ash", "player", 1, true);
          },
        };
      }
    },
  },
];
