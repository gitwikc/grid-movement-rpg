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
  callback?: () => void;
}

export interface SceneInteraction {
  positions: Position[];
  getInteraction: (scene: GameScene, state: GameState) => Interaction;
}

export interface CharacterInteractions {
  [key: string]: (scene: GameScene, state: GameState) => Interaction;
}

/**
 * Get the scene interaction at a given position from a set of scene interactions.
 *
 * @param interactions The scene interactions set for the current scene
 * @param position The position at which an interaction is to be searched for
 * @returns A SceneInteraction, if any or undefined
 */
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
