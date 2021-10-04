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

  createNPCs() {
    // TODO Init list of npc sprites
  }

  create() {
    // TODO Create gridEngineConfig
    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: this.playerSprite,
          collides: true,
          startPosition: { x: 16, y: 8 },
          speed: 4,
          facingDirection: Direction.DOWN,
          walkingAnimationMapping: getPlayerWalkingAnimationMap(
            gameKeys.spritesheets.player.index
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
  }
}
