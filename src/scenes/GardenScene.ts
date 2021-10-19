// @ts-nocheck
import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getPlayerWalkingAnimationMap from "../util/walkAnim";
import { charactersAreColliding } from "../util/helpers";
import { CharacterInteractions } from "../util/interactions";
import { Objective } from "../util/stores/gameStore";
import { DialogAction } from "./Dialogue";

const characterInteractions: CharacterInteractions = {
  ash: (scene, state) => {
    if (!state.objectives.MEET_ASH) {
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
          walkingAnimationMapping: getPlayerWalkingAnimationMap(
            gameKeys.spritesheets.ash.index
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
  }
}
