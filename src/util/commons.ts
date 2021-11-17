import { CharacterData, Position } from "grid-engine";
import { nanoid } from "nanoid";
import GameScene from "../scenes/GameScene";
import { Gender, House, spritesheets } from "../util/gameKeys";
import { getCharWalkingAnimationMap } from "./helpers";
import gameStore from "./stores/gameStore";

export const sattwikCharacterData = (scene: GameScene): CharacterData => ({
  id: "sattwik",
  sprite: scene.add.sprite(0, 0, spritesheets.sattwik.key).setScale(1.2),
  collides: true,
  speed: 4,
  walkingAnimationMapping: getCharWalkingAnimationMap(
    spritesheets.sattwik.index
  ),
});

export const sattwikFollowArya = (scene: GameScene): void => {
  if (gameStore.getState().objectives.TEAM_SATTWIK) {
    scene.gridEngine.setPosition(
      "sattwik",
      scene.gridEngine.getPosition("arya")
    );
    scene.gridEngine.turnTowards(
      "sattwik",
      scene.gridEngine.getFacingDirection("arya")
    );
    scene.gridEngine.follow("sattwik", "arya", 2, true);
  }
};

export const createStudentCharacter = (
  scene: GameScene,
  gender: Gender,
  house: House,
  position: Position
): CharacterData => ({
  id: `stu-${nanoid(10)}`,
  sprite: scene.add
    .sprite(
      0,
      0,
      gender === Gender.MALE
        ? spritesheets.studentM.key
        : spritesheets.studentF.key
    )
    .setScale(1.2),
  collides: true,
  startPosition: position,
  walkingAnimationMapping: getCharWalkingAnimationMap(house),
});
