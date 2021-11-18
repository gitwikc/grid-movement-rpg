// @ts-nocheck
import { createSignboardInteraction } from "../../../../util/helpers";
import { SceneInteraction } from "../../../../util/interactions";
import festStore from "../../../../util/stores/festStore";
import { Objective } from "../../../../util/stores/gameStore";
import { DialogAction } from "../../../Dialogue";

const sceneInteractions: SceneInteraction[] = [
  // Signboards
  createSignboardInteraction([{ x: 10, y: 6 }], ["Token counter"]),
  createSignboardInteraction(
    [{ x: 16, y: 12 }],
    ["Food Fest Room 1", "SPDP, Pani puri"]
  ),
  createSignboardInteraction(
    [{ x: 16, y: 19 }],
    ["Food Fest Room 2", "Fruit chat, Kulfi"]
  ),
  createSignboardInteraction([{ x: 1, y: 24 }], ["Food Fest Room 3", "Samosa"]),
  createSignboardInteraction(
    [{ x: 1, y: 37 }],
    ["Food Fest Room 4", "Spring roll"]
  ),
  createSignboardInteraction([{ x: 15, y: 45 }], ["To 3rd Floor"]),
  createSignboardInteraction([{ x: 15, y: 48 }], ["To 5th Floor"]),

  // Token counter
  {
    positions: [{ x: 13, y: 4 }],
    getInteraction: (scene, state) => {
      const fest = festStore.getState();
      if (fest.tokens > 0)
        return {
          action: DialogAction.NORMAL,
          dialogueSets: [
            {
              speaker: "Token girl",
              content: [`You have ${fest.tokens} tokens`],
            },
          ],
        };
      else if (!state.objectives.COUNTER_TOKENS)
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [
            { speaker: "Arya & Sattwik", content: ["Tokens please"] },
            {
              speaker: "Token girl",
              content: ["Here you go", "3 tokens", "Enjoy the fest!"],
            },
          ],
          callback: () => {
            fest.refillTokens();
            state.completeObjective(Objective.COUNTER_TOKENS);
          },
        };
      else
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [
            {
              speaker: "Token girl",
              content: [
                "Sorry, we are out of tokens right now.",
                "Some boys bought all the remaining tokens a while ago",
              ],
            },
          ],
        };
    },
  },
];

export default sceneInteractions;
