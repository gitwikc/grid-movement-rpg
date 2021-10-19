// @ts-nocheck

import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getCharWalkingAnimationMap from "../util/walkAnim";

export default class ClassroomScene extends GameScene {
  constructor() {
    super(gameKeys.scenes.classroom, {
      name: "player",
      spritesheet: gameKeys.spritesheets.player,
    });
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
          sprite: this.npcs.ash!,
          collides: true,
          startPosition: { x: 0, y: 0 },
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
    }
  }
}
