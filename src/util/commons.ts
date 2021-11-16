import { CharacterData } from "grid-engine";
import GameScene from "../scenes/GameScene";
import { spritesheets } from "../util/gameKeys";
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
    scene.gridEngine.follow("sattwik", "arya", 2, true);
  }
};
