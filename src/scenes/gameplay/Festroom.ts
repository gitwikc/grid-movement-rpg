import { CharacterData, Direction, Position } from "grid-engine";
import { SceneData, spritesheets } from "../../util/gameKeys";
import {
  getStallInteraction,
  getOutOfStockInteraction,
  sattwikCharacterData,
  createStudentCharacter,
  sattwikFollowArya,
} from "../../util/commons";
import { scenes, Gender, House } from "../../util/gameKeys";
import { Snack } from "../../util/stores/festStore";
import Classroom from "./Classroom";
import { DialogAction } from "../Dialogue";

export interface Seller {
  gender: Gender;
  house: House;
  snack?: Snack;
}

export default class Festroom extends Classroom {
  protected static STALL_POSITIONS: Position[][] = [
    [
      { x: 12, y: 5 },
      { x: 13, y: 5 },
    ],
    [
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ],
    [
      { x: 3, y: 9 },
      { x: 3, y: 10 },
    ],
    [
      { x: 3, y: 14 },
      { x: 3, y: 15 },
    ],
  ];

  protected static SELLER_POSITIONS: Position[] = [
    {
      x: 12,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
    {
      x: 1,
      y: 10,
    },
    {
      x: 1,
      y: 15,
    },
  ];

  constructor(
    sceneData: SceneData,
    exitPosition: Position,
    protected sellers: Seller[]
  ) {
    super(
      sceneData,
      exitPosition,
      scenes.floor4.hallway.key,
      { name: "arya", spritesheet: spritesheets.arya },
      {
        sattwik: (scene, state) => ({
          action: DialogAction.NORMAL,
          dialogueSets: [
            { speaker: "Sattwik", content: ["Khana hi khana..."] },
          ],
        }),
      },
      sellers.map((seller, i) => ({
        positions: Festroom.STALL_POSITIONS[i],
        getInteraction: seller.snack
          ? getStallInteraction(seller.snack)
          : getOutOfStockInteraction,
      }))
    );
  }

  create() {
    const characters: CharacterData[] = [
      sattwikCharacterData(this),
      ...this.sellers.map((seller, i) => ({
        ...createStudentCharacter(
          this,
          seller.gender,
          seller.house,
          Festroom.SELLER_POSITIONS[i]
        ),
        facingDirection: i < 2 ? Direction.DOWN : Direction.RIGHT,
      })),
    ];
    super.create({ characters, collisionTilePropertyName: "collides" });
    sattwikFollowArya(this);
  }
}
