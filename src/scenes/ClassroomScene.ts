// @ts-nocheck
import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getCharWalkingAnimationMap from "../util/walkAnim";
import { CharacterInteractions, SceneInteraction } from "../util/interactions";
import { DialogAction } from "./Dialogue";

const characterInteractions: CharacterInteractions = {
  ash: (scene, state) => {
    return {
      action: DialogAction.NORMAL,
      dialogueSets: [{ speaker: "Ash", content: ["Ah, almost there!"] }],
    };
  },
  gary: (scene, state) => {
    return {
      action: DialogAction.NORMAL,
      dialogueSets: [
        {
          speaker: "Gary",
          content: [
            "Oh, it's you two again.",
            "Go find your thingy... Now outta my way!",
          ],
        },
        {
          speaker: "Player",
          content: ["Why is he so rude to us?"],
        },
      ],
    };
  },
};

const sceneInteractions: SceneInteraction[] = [
  {
    positions: [{ x: 3, y: 2 }],
    getInteraction: (scene, state) => {
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: [
          {
            speaker: "Player",
            content: ["Here's the dustbin", "...But I don't see your phone"],
          },
          {
            speaker: "Ash",
            content: [
              "Maybe bend down to see",
              "It might be hidden in the pile of papers",
            ],
          },
          { speaker: "Player", content: ["Alright... Ok let's see..."] },
          {
            speaker: "Ash",
            content: ["... ... ...", "...", "... ...", "*unzipping sounds*"],
          },
          {
            speaker: "Player",
            content: [
              "OH MY GOD",
              "What are you doing step Ash?",
              "*grunts* Leave me!",
            ],
          },
          {
            speaker: "Ash",
            content: [
              "YOU FOOOOL!!!",
              "You thought Gary was some kinda bully?",
              "HA! He's my pardnah!",
              "The phone was just a trap to get you here...",
              "Didn't you just see Gary hurry out holding something?",
              "Honestly, I was a bit scared you might notice the watermark in the CCTV Recs",
              "They weren't for security purposes. In fact, this classroom was abandoned 3 years ago!",
              "Now I and Gary use it as our studio",
            ],
          },
          {
            speaker: "Player",
            content: ["UUHHH... *grunt*", "S-studio? Wha-"],
          },
          {
            speaker: "Ash",
            content: ["You're gonna be really FAMOUS soon... HAA!!!"],
          },
          { speaker: "Player", content: ["AAAAAAAAHHHHHH!!!! HELP MEEEE!!!"] },
        ],
        callback: () => {
          scene.scene.start(gameKeys.scenes.endscene.key);
        },
      };
    },
  },
];

export default class ClassroomScene extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.classroom,
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
      gary: this.add.sprite(0, 0, gameKeys.spritesheets.gary.key, 0),
    };
  }

  create() {
    this.createNPCSprites();
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "ash",
          sprite: this.npcs.ash!,
          collides: true,
          startPosition: { x: 0, y: 0 },
          speed: 4,
          walkingAnimationMapping: getCharWalkingAnimationMap(
            gameKeys.spritesheets.ash.index
          ),
          facingDirection: Direction.DOWN,
        },
        {
          id: "gary",
          sprite: this.npcs.gary!,
          collides: true,
          startPosition: { x: 7, y: 5 },
          speed: 5,
          walkingAnimationMapping: getCharWalkingAnimationMap(
            gameKeys.spritesheets.gary.index
          ),
        },
      ],
      collisionTilePropertyName: "collides",
    };

    super.create(gridEngineConfig);

    // Ash follows player
    if (this.gameStore().objectives.MEET_ASH) {
      this.gridEngine.setPosition("ash", this.gridEngine.getPosition("player"));
      this.gridEngine.follow("ash", "player", 1, true);

      this.gridEngine
        .positionChangeFinished()
        .subscribe(({ charId, exitTile, enterTile }) => {
          if (exitTile.x < 15 && enterTile.x >= 16) {
          }
        });
    }
    this.gridEngine
      .moveTo(
        "gary",
        { x: 18, y: 0 },
        {
          noPathFoundStrategy: "CLOSEST_REACHABLE",
          pathBlockedStrategy: "WAIT",
        }
      )
      .subscribe(({ result }) => {
        if (result === "SUCCESS") {
          this.gridEngine.removeCharacter("gary");
          this.npcs.gary.destroy();
        }
      });
  }
}
