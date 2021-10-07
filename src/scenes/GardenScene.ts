// @ts-nocheck

import GameScene from "./GameScene";
import * as gameKeys from "../util/gameKeys";
import { Direction, GridEngineConfig } from "grid-engine";
import getPlayerWalkingAnimationMap from "../util/walkAnim";

export default class GardenScene extends GameScene {
  constructor() {
    super(gameKeys.scenes.garden, {
      name: "player",
      spritesheet: gameKeys.spritesheets.player,
    });
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
    // const { x: playerX, y: playerY } = this.gridEngine.getPosition("player");
    this.gridEngine.setPosition("ash", this.gridEngine.getPosition("player"));
    this.gridEngine.follow("ash", "player", 1, true);
  }
}
