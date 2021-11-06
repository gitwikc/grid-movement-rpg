// @ts-nocheck
import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getCharWalkingAnimationMap from "../util/walkAnim";
import { SceneInteraction, CharacterInteractions } from "../util/interactions";
import { DialogAction } from "./Dialogue";
import { GameState, Objective } from "../util/stores/gameStore";

const sceneInteractions: SceneInteraction[] = [
  {
    positions: [{ x: 29, y: 14 }],
    getInteraction: (scene: GameScene, state: GameState) => {
      if (state.objectives.MEET_ASH) {
        if (state.objectives.CHECK_PC) {
          return {
            action: DialogAction.NORMAL,
            dialogueSets: [
              {
                speaker: "Player",
                content: [
                  "Brilliant! Ash, you're lucky the school has CCTVs in the classrooms. How easy it was, finding your phone",
                  "(...Although there's weird watermarks on this CCTV clip... Must be the school website)",
                ],
              },
              {
                speaker: "Ash",
                content: ["Come on, let's go!"],
              },
            ],
          };
        } else {
          // state.completeObjective(Objective.CHECK_PC);
          return {
            action: DialogAction.EXCLAIM,
            dialogueSets: [
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
            ],

            callback: () => {
              state.completeObjective(Objective.CHECK_PC);
            },
          };
        }
      } else
        return {
          action: DialogAction.NORMAL,
          dialogueSets: [
            {
              speaker: "Player",
              content: [
                "Now isn't the time to use the computer",
                "I should go out and get some fresh air",
              ],
            },
          ],
        };
    },
  },
];

const characterInteractions: CharacterInteractions = {
  ash: (scene, state) => {
    if (state.objectives.CHECK_PC) {
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Ash",
            content: [
              "Yes! We know where my phone is, now!",
              "Let's go get it quickly!",
            ],
          },
        ],
      };
    } else {
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Player",
            content: ["Don't worry, we'll find your phone soon."],
          },
          { speaker: "Ash", content: ["Thanks for helping me"] },
        ],
      };
    }
  },
};

export default class LibraryScene extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.library,
      {
        name: "player",
        spritesheet: gameKeys.spritesheets.player,
      },
      characterInteractions,
      sceneInteractions
    );
  }

  createNPCSprites() {
    this.npcs = {
      ash: this.add
        .sprite(0, 0, gameKeys.spritesheets.ash.key, 0)
        .setScale(1.1),
    };
  }

  create() {
    this.createNPCSprites();
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "ash",
          sprite: this.npcs.ash,
          collides: true,
          speed: 4,
          walkingAnimationMapping: getCharWalkingAnimationMap(
            gameKeys.spritesheets.ash.index
          ),
          facingDirection: Direction.DOWN,
        },
      ],
      collisionTilePropertyName: "collides",
    };

    super.create(gridEngineConfig);

    // Ash follows player
    if (this.gameStore().objectives.MEET_ASH) {
      this.gridEngine.setPosition("ash", this.gridEngine.getPosition("player"));
      this.gridEngine.follow("ash", "player", 1, true);
    } else {
      console.log("Removing ash");
      this.gridEngine.removeCharacter("ash");
      this.npcs["ash"]?.destroy();
    }
  }
}
