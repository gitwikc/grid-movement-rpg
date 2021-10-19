import * as gameKeys from "../util/gameKeys";
import GameScene from "./GameScene";

export interface dialogueSet {
  speaker: string;
  content: string[];
}

export interface dialogue {
  speaker: string;
  content: string;
}

export enum DialogAction {
  EXCLAIM = "EXCLAIM",
  NORMAL = "NORMAL",
}

interface initData {
  action: DialogAction;
  meta?: any;
  dialogueSets: dialogueSet[];
}

export default class Dialogue extends Phaser.Scene {
  private domElem: {
    box: HTMLElement;
    speaker: HTMLElement;
    content: HTMLElement;
  };
  private dialogueSets: dialogueSet[] = [];
  private conversation: dialogue[] = [];

  private speaking!: boolean;

  // Stores index of the current dialogue being spoken
  private dialogueIndex!: number;
  // Stores the start time of the current dialogue
  private currentDialogueStartTime!: number;

  private callerScene!: GameScene;

  constructor() {
    super({ key: gameKeys.uiScenes.Dialogue, visible: false, active: false });
    this.domElem = {
      box: document.getElementById("message") as HTMLElement,
      speaker: document.getElementById("speaker") as HTMLElement,
      content: document.getElementById("content") as HTMLElement,
    };
  }

  init(data: initData) {
    this.callerScene = data.meta.root;

    this.dialogueIndex = 0;
    this.currentDialogueStartTime = 0;

    this.dialogueSets = data.dialogueSets;

    // Process the dialogue sets
    this.conversation = [];
    this.dialogueSets.forEach((ds: dialogueSet) => {
      ds.content.forEach((c) => {
        this.conversation.push({ speaker: ds.speaker, content: c });
      });
    });
    console.log(this.conversation);
  }

  updateText(time: number) {
    // Set the current speaker
    this.domElem.speaker.innerHTML =
      this.conversation[this.dialogueIndex].speaker;

    const currentDialogueText = this.conversation[this.dialogueIndex].content;
    const timeSpoken = time - this.currentDialogueStartTime;
    const charsToPrint = Math.min(currentDialogueText.length, timeSpoken / 20);
    this.speaking = charsToPrint < currentDialogueText.length - 1;
    this.domElem.content.innerHTML = currentDialogueText.substring(
      0,
      charsToPrint
    );
  }

  create() {
    this.add.dom(320, 400, this.domElem.box);
    this.currentDialogueStartTime = this.game.getTime();

    this.domElem.box.onclick = () => {
      if (this.dialogueIndex === this.conversation.length - 1) {
        this.scene.resume(this.callerScene);
        this.scene.stop();
      } else if (!this.speaking) {
        this.currentDialogueStartTime = this.time.now;
        this.dialogueIndex++;
      }
    };
  }

  // @ts-ignore
  update(time: number, dt: number) {
    this.updateText(time);
  }
}
