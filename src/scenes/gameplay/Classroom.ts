import { Direction, Position } from "grid-engine";
import { createDoors } from "../../util/doors";
import { Door } from "../../util/doors/types";
import * as gameKeys from "../../util/gameKeys";
import {
  CharacterInteractions,
  SceneInteraction,
} from "../../util/interactions";
import GameScene from "../GameScene";

export default class Classroom extends GameScene {
  static readonly CLASSROOM_DOOR_POSITIONS = [
    [17, 1],
    [18, 1],
  ];

  static CREATE_DOORS_TO_CLASSROOM(
    positions: number[][],
    classroomSceneKey: string
  ): Door[] {
    return createDoors(positions, classroomSceneKey, 17, 2, Direction.DOWN);
  }

  constructor(
    sceneData: gameKeys.SceneData,
    exitDestPosition: Position,
    exitDestSceneKey: string,
    playerSpriteData: gameKeys.SpriteData,
    characterInteractions?: CharacterInteractions,
    sceneInteractions?: SceneInteraction[]
  ) {
    super(
      sceneData,
      playerSpriteData,
      createDoors(
        Classroom.CLASSROOM_DOOR_POSITIONS,
        exitDestSceneKey,
        exitDestPosition.x,
        exitDestPosition.y
      ),
      characterInteractions,
      sceneInteractions
    );
  }
}
