// @ts-nocheck
import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getCharWalkingAnimationMap from "../util/walkAnim";
import { charactersAreColliding } from "../util/helpers";
import { CharacterInteractions } from "../util/interactions";
import { Objective } from "../util/stores/gameStore";
import { DialogAction } from "./Dialogue";

const characterInteractions: CharacterInteractions = {
  ash: (scene, state) => {
    if (!state.objectives.MEET_ASH) {
      // state.completeObjective(Objective.MEET_ASH);
      return {
        action: DialogAction.EXCLAIM,
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
          state.completeObjective(Objective.MEET_ASH);
          scene.gridEngine.follow("ash", "player", 1, true);
        },
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

  gary: (scene, state) => {
    if (!state.objectives.MEET_ASH) {
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Gary",
            content: [
              "Class hasn't started yet. You can have a look around",
              "I am Gary, by the way.",
              "It's a great day, but for that gloomy guy out there",
              "I bet he has lost something and is sulking about it",
              "Looks like a loser to me! HAHA!",
            ],
          },
          {
            speaker: "Player",
            content: ["Poor fellow... Let me ask him what happened"],
          },
        ],
      };
    } else {
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Ash",
            content: [
              "Mister... umm... Have you seen a phone around here somewhere?",
            ],
          },
          {
            speaker: "Gary",
            content: [
              "Looking for a lost item, huh?",
              "You guys better have a look at the CCTV recs",
            ],
          },
          {
            speaker: "Ash & Player",
            content: ["Recordings? Where?"],
          },
          {
            speaker: "Gary",
            content: [
              "There's a PC in the library, you fools!",
              "Of course that's where you need to search",
            ],
          },
        ],
      };
    }
  },
};

export default class GardenScene extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.garden,
      {
        name: "player",
        spritesheet: gameKeys.spritesheets.player,
      },
      characterInteractions
    );
  }

  createNPCSprites() {
    // TODO Init list of npc sprites
    this.npcs = {
      ash: this.add.sprite(0, 0, gameKeys.spritesheets.ash.key),
      gary: this.add.sprite(0, 0, gameKeys.spritesheets.gary.key),
    };
  }

  create() {
    // TODO Create gridEngineConfig
    this.createNPCSprites();
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "ash",
          sprite: this.npcs.ash!,
          collides: true,
          speed: 4,
          startPosition: { x: 15, y: 7 },
          facingDirection: Direction.DOWN,
          walkingAnimationMapping: getCharWalkingAnimationMap(
            gameKeys.spritesheets.ash.index
          ),
        },
        {
          id: "gary",
          sprite: this.npcs.gary,
          collides: true,
          startPosition: { x: 15, y: 4 },
          facingDirection: Direction.DOWN,
          walkingAnimationMapping: getCharWalkingAnimationMap(
            gameKeys.spritesheets.gary.index
          ),
        },
      ],
      collisionTilePropertyName: "collides",
    };
    super.create(gridEngineConfig);
    /* Extra stuff for gridEngine like
     * NPC follows player
     * Random movement of NPCs
     */
    if (this.gameStore().objectives.MEET_ASH) {
      this.gridEngine.setPosition("ash", this.gridEngine.getPosition("player"));
      this.gridEngine.follow("ash", "player", 1, true);
    }
    if (this.gameStore().objectives.CHECK_PC) {
      this.gridEngine.removeCharacter("gary");
      this.npcs["gary"]?.destroy();
    }
  }
}
