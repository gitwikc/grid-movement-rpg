// @ts-nocheck
import { Direction, Position } from "grid-engine";
import { DialogAction } from "../scenes/Dialogue";
import GameScene from "../scenes/GameScene";
import { Gender, House, SpritesheetData, spritesheets } from "./gameKeys";
import { SceneInteraction } from "./interactions";
import { CharacterData } from "grid-engine";

/**
 * Checks equality of pos.x and pos.y for two Positions
 *
 * @param pos1 Position 1
 * @param pos2 Position 2
 * @returns If the two positions are the same
 */
export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

/**
 * Checks for collision of two characters.
 * Here, checks if character 1 is facing towards character 2.
 * Use for checking if a dialogue should be spoken with the NPC.
 *
 * @param char1 Character 1 *usu. MC / User controlled character*
 * @param char2 Character 2 *usu. Side character / NPC*
 * @param scene The scene in which the two characters are. (Pass curreny scene)
 * @returns `true` if character 1 is facing towards character 2
 */
export const charactersAreColliding = (
  char1: string,
  char2: string,
  scene: GameScene
) => {
  const char1Facing: Position = scene.gridEngine.getFacingPosition(char1);
  const char2Facing: Position = scene.gridEngine.getFacingPosition(char2);
  const char1Position: Position = scene.gridEngine.getPosition(char1);
  const char2Position: Position = scene.gridEngine.getPosition(char2);

  return positionsEqual(char1Facing, char2Position);
};

/**
 * Turns two characters to face each other.
 *
 * @param scene The scene in which the 2 characters are *usu. current scene*
 * @param char1 Character 1
 * @param char2 Character 2
 */
export const charactersF2F = (
  scene: GameScene,
  char1: string,
  char2: string
): void => {
  const char1Facing: Position = scene.gridEngine.getFacingPosition(char1);
  const char2Facing: Position = scene.gridEngine.getFacingPosition(char2);
  const char1Position: Position = scene.gridEngine.getPosition(char1);
  const char2Position: Position = scene.gridEngine.getPosition(char2);
  const char1Direction: Direction = scene.gridEngine.getFacingDirection(char1);
  const char2Direction: Direction = scene.gridEngine.getFacingDirection(char2);

  const oppositeDirections: { [key in Direction]: Direction } = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
  };

  if (positionsEqual(char1Facing, char2Position))
    scene.gridEngine.turnTowards(char2, oppositeDirections[char1Direction]);
  else if (positionsEqual(char2Facing, char1Position))
    scene.gridEngine.turnTowards(char1, oppositeDirections[char2Direction]);
};

/**
 * Create a SceneInteraction with a signboard
 *
 * @param positions The Positions at which the signboard tiles are
 * @param content The stuff written on the signboard
 * @returns A SceneInteraction with the signboard
 */
export function createSignboardInteraction(
  positions: Position[],
  content: string[]
): SceneInteraction {
  return {
    positions,
    getInteraction: (scene, state) => ({
      action: DialogAction.NORMAL,
      dialogueSets: [{ speaker: "Signboard", content }],
    }),
  };
}

/**
 * Create a walking animation map for a character
 *
 * @param charIndex The index of the character in its spritesheet
 * @returns walking animation map for character as specified in grid-engine
 */
export const getCharWalkingAnimationMap = (charIndex: number = 0) => ({
  up: {
    leftFoot: charIndex * 16 + 15,
    standing: charIndex * 16 + 12,
    rightFoot: charIndex * 16 + 13,
  },
  right: {
    leftFoot: charIndex * 16 + 10,
    standing: charIndex * 16 + 9,
    rightFoot: charIndex * 16 + 8,
  },
  down: {
    leftFoot: charIndex * 16 + 3,
    standing: charIndex * 16 + 0,
    rightFoot: charIndex * 16 + 1,
  },
  left: {
    leftFoot: charIndex * 16 + 7,
    standing: charIndex * 16 + 4,
    rightFoot: charIndex * 16 + 5,
  },
});

export const createStudentCharacterConfig = (
  id: string,
  sprite: Phaser.GameObjects.Sprite,
  house: House,
  position: Position = { x: 0, y: 0 },
  direction: Direction = Direction.DOWN
): CharacterData => ({
  id,
  sprite,
  collides: true,
  speed: 4,
  startPosition: position,
  facingDirection: direction,
  walkingAnimationMapping: getCharWalkingAnimationMap(house),
});
