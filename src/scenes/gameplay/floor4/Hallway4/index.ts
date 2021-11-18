// @ts-nocheck
import { CharacterData, Direction } from "grid-engine";
import {
  createStudentCharacter,
  sattwikCharacterData,
  sattwikFollowArya,
} from "../../../../util/commons";
import * as gameKeys from "../../../../util/gameKeys";
import {
  getCharWalkingAnimationMap,
  getRandomGender,
  getRandomHouse,
} from "../../../../util/helpers";
import festStore from "../../../../util/stores/festStore";
import { DialogAction } from "../../../Dialogue";
import GameScene from "../../../GameScene";
import { getRandomComment } from "./cInt";
import doors from "./doors";
import sceneInteractions from "./sInt";

export default class Hallway4 extends GameScene {
  constructor() {
    super(
      gameKeys.scenes.floor4.hallway,
      {
        name: "arya",
        spritesheet: gameKeys.spritesheets.arya,
      },
      doors,
      {},
      sceneInteractions
    );
  }

  createNPCSprites() {
    // TODO Create NPCs here
  }

  create() {
    const characters: CharacterData[] = [];
    if (this.gameStore().objectives.TEAM_SATTWIK)
      characters.push(sattwikCharacterData(this));

    // Token counter
    characters.push({
      id: "token-girl",
      sprite: this.add
        .sprite(0, 0, gameKeys.spritesheets.studentF.key)
        .setScale(1.2),
      walkingAnimationMapping: getCharWalkingAnimationMap(gameKeys.House.RED),
      collides: true,
      startPosition: { x: 14, y: 4 },
      facingDirection: Direction.LEFT,
    });

    // TODO Add other NPCs
    for (var i = 0; i < 20; i++)
      characters.push(
        createStudentCharacter(
          this,
          Math.random() > 0.5 ? gameKeys.Gender.MALE : gameKeys.Gender.FEMALE,
          Math.floor(Math.random() * 4),
          {
            x: Math.floor(Math.random() * 11) + 2,
            y: Math.floor(Math.random() * 58) + 18,
          }
        )
      );

    // Black market token boys
    characters.push({
      ...createStudentCharacter(
        this,
        gameKeys.Gender.MALE,
        gameKeys.House.RED,
        {
          x: 5,
          y: 61,
        }
      ),
      id: "nig-1",
      facingDirection: Direction.UP,
    });
    characters.push({
      ...createStudentCharacter(
        this,
        gameKeys.Gender.MALE,
        gameKeys.House.YELLOW,
        {
          x: 6,
          y: 62,
        }
      ),
      id: "nig-2",
      facingDirection: Direction.UP,
    });
    characters.push({
      ...createStudentCharacter(
        this,
        gameKeys.Gender.MALE,
        gameKeys.House.GREEN,
        {
          x: 5,
          y: 63,
        }
      ),
      id: "nig-3",
      facingDirection: Direction.UP,
    });
    characters.push({
      ...createStudentCharacter(
        this,
        gameKeys.Gender.MALE,
        gameKeys.House.BLUE,
        {
          x: 4,
          y: 62,
        }
      ),
      id: "nig-4",
      facingDirection: Direction.UP,
    });

    super.create({
      characters,
      collisionTilePropertyName: "collides",
    });

    sattwikFollowArya(this);

    // Random movement and comments for NPCs
    const npcIds = this.gridEngine
      .getAllCharacters()
      .filter((c: string) => c.startsWith("stu-"));

    npcIds.forEach((c: string) => {
      this.gridEngine.moveRandomly(
        c,
        Math.floor(Math.random() * 400),
        Math.floor(Math.random() * 5) + 3
      );
      this.characterInteractions[c] = (scene, state) => ({
        action: DialogAction.NORMAL,
        dialogueSets: [{ speaker: "Student", content: getRandomComment() }],
      });
    });

    this.characterInteractions["nig-1"] = (scene, state) => {
      const fest = festStore.getState();
      if (state.objectives.COUNTER_TOKENS && fest.tokens === 0)
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [
            {
              speaker: "Hood Leader",
              content: [
                "Welcome to the hood, bruh.",
                "We're the Black Market N-",
              ],
            },
            {
              speaker: "Arya",
              content: ["Bakwaas mat kar!", "Kya chalra ye sab?"],
            },
            {
              speaker: "Hood Leader",
              content: [
                "It's stonks for the hood bruh",
                "THIS IS BUSINESSSS...",
                "Sab fayde mein rahenge bro koi jhagda nahi chahiye hume",
                "Tum humse token lo, tum fest enj-",
              ],
            },
            {
              speaker: "Sattwik",
              content: [
                "Tera hood leke hadd yaha se",
                "Malum na hum tere seniors?",
                "Bol rahe hain padhai likhai karo",
                "Prefect-vefect bano school ko sambhalo...",
                "Lekin nahi... Tumhe stonks karna hai",
              ],
            },
            {
              speaker: "Arya",
              content: [
                "Mere paas ek scheme hai.",
                "25 second mein khatam trouble",
                "Humko ye tokens dedo chupchap maamla khatam",
              ],
            },
            {
              speaker: "Hood Leader",
              content: [
                "Ruko gang discussion time",
                "...",
                "hmm...",
                "ha...",
                "Thik hai. Deal manzur. Ye lo token",
              ],
            },
          ],
          callback: () => fest.refillTokens(),
        };
    };
  }
}
