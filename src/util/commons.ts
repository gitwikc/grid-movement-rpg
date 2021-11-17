import { CharacterData, Position } from "grid-engine";
import { nanoid } from "nanoid";
import { DialogAction } from "../scenes/Dialogue";
import GameScene from "../scenes/GameScene";
import { Gender, House, spritesheets } from "../util/gameKeys";
import { getCharWalkingAnimationMap } from "./helpers";
import { Interaction } from "./interactions";
import festStore, { Snack } from "./stores/festStore";
import gameStore, { GameState, Objective } from "./stores/gameStore";

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
    scene.gridEngine.follow("sattwik", "arya", 1, true);
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

export const getStallInteraction =
  (snack: Snack) =>
  (scene: GameScene, state: GameState): Interaction => {
    const fest = festStore.getState();

    if (fest.snacksEaten.indexOf(snack) === -1) {
      if (fest.tokens > 0)
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [
            { speaker: "Arya & Sattwik", content: [`Do ${snack} dena`] },
            {
              speaker: "Arya",
              content: [
                "*Uses mad negotiation skill*",
                "$$CHA-CHING!$$ Saste mein milega bro hehe!",
              ],
            },
            {
              speaker: `${snack} seller`,
              content: [
                "Token please",
                "OK 2 min",
                "...",
                "...",
                "yeh lo ban gaya!",
              ],
            },
            {
              speaker: "Arya",
              content: ["*...yum...*"],
            },
            {
              speaker: "Sattwik",
              content: ["*...yum...*"],
            },
          ],
          callback: () => {
            fest.useToken(snack);
            if (
              festStore.getState().snacksEaten.length ===
              Object.keys(Snack).length
            ) {
              state.completeObjective(Objective.EAT_SNACKS);

              scene.launchDialogue(DialogAction.EXCLAIM, [
                {
                  speaker: "Sattwik",
                  content: [
                    "Yayy!!! Bhai sab kha liya",
                    "Pet full ho gaya",
                    "Chal class mein lautke baat karte",
                  ],
                },
              ]);
            }
          },
        };
      else
        return {
          action: DialogAction.NORMAL,
          dialogueSets: [
            {
              speaker: `${snack} seller`,
              content: [
                "Kya re langar laga hai kya re?",
                "Phokat ka nahi milta idhar kuch",
                "Nikal! <█┘",
              ],
            },
            {
              speaker: "Arya",
              content: ["Gajab bezzati hai"],
            },
          ],
        };
    } else if (!state.objectives.EAT_SNACKS)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Sattwik",
            content: [`Bhai ${snack} to kha liya`, "Kuch aur khaate hai chal"],
          },
        ],
      };
    else {
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Sattwik",
            content: [
              "Bro pet full.. Ab aur nahi khaate rehnde uff....",
              "Chal class mein chalke baat karte",
            ],
          },
        ],
      };
    }
  };

export const getOutOfStockInteraction = (
  scene: GameScene,
  state: GameState
): Interaction => ({
  action: DialogAction.NORMAL,
  dialogueSets: [
    {
      speaker: "Student",
      content: [
        "Out of stock hai abhi",
        "Abhi maal nahi milenga chalo aagey badho",
      ],
    },
  ],
});
