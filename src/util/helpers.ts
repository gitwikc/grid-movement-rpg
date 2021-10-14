// @ts-nocheck
import { Direction, Position } from "grid-engine";
import GameScene from "../scenes/GameScene";

export const positionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

export const charactersAreColliding = (
  char1: string,
  char2: string,
  scene: GameScene
) => {
  const char1Facing: Position = scene.gridEngine.getFacingPosition(char1);
  const char2Facing: Position = scene.gridEngine.getFacingPosition(char2);
  const char1Position: Position = scene.gridEngine.getPosition(char1);
  const char2Position: Position = scene.gridEngine.getPosition(char2);

  return (
    positionsEqual(char1Facing, char2Position) ||
    positionsEqual(char2Facing, char1Position)
  );
};

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
