// @ts-nocheck

import { Position } from "grid-engine";
import { GameState, Objective } from "./stores/gameStore";
import * as gameKeys from "../util/gameKeys";
import { DialogAction, dialogueSet } from "../scenes/Dialogue";
import { positionsEqual } from "./helpers";
import GameScene from "../scenes/GameScene";

export interface Interaction {
  action?: DialogAction;
  dialogueSets?: dialogueSet[];
  callback?: (...args: any) => any;
}

export interface SceneInteraction {
  positions: Position[];
  getInteraction: (scene: GameScene, state: GameState) => Interaction;
}

export interface CharacterInteractions {
  [key: string]: (scene: GameScene, state: GameState) => Interaction;
}

export const getSceneInteraction = (
  interactions: SceneInteraction[],
  position: Position
): SceneInteraction | undefined => {
  let reqInteraction: SceneInteraction | undefined;
  interactions.forEach((interaction) =>
    interaction.positions.forEach((p) => {
      if (positionsEqual(p, position)) reqInteraction = interaction;
    })
  );
  return reqInteraction;
};
