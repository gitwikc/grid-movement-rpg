// @ts-nocheck
import { CharacterInteractions } from "../../../../util/interactions";
import { Objective } from "../../../../util/stores/gameStore";
import { DialogAction } from "../../../Dialogue";
import festInfo from "./festInfo.json";
import endDialogue from "./endDlg.json";

const characterInteractions: CharacterInteractions = {
  rishi: (scene, state) => ({
    action: DialogAction.NORMAL,
    dialogueSets: [
      {
        speaker: "Rishikesh",
        content: [
          "Yeh aaj fest karne vale hain CIS vale",
          "Too bad bro I gotta go to coaching",
        ],
      },
    ],
  }),

  nandika: (scene, state) => {
    if (!state.objectives.MEET_SATTWIK)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Nandika",
            content: ["Hi I am Nandika", "Ye fest vest ka kya scene hai yaar?"],
          },
        ],
      };
    else if (!state.objectives.GET_PHY_NB)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          { speaker: "Arya", content: ["Nandini right?"] },
          { speaker: "Nandika", content: ["Nandika"] },
          {
            speaker: "Arya",
            content: ["Oh, sorry", "Idhar books kaun complete rakhta full?"],
          },
          {
            speaker: "Nandika",
            content: [
              "Wo khadi hai na yellow house wali",
              "Riddhi... usse puchhke dekh",
            ],
          },
          { speaker: "Arya", content: ["Ok... Thanks!"] },
        ],
      };
    else if (state.objectives.TEAM_SATTWIK)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          { speaker: "Nandika", content: ["Hi Sattwik", "Tu bhi CIS mein?"] },
          {
            speaker: "Sattwik",
            content: ["Kahi na kahi to jana hi tha na", "Tu fest mein aari?"],
          },
          { speaker: "Nandika", content: ["Dekhti hu. Tum log enjoy karo"] },
        ],
      };
    else
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [{ speaker: "Nandika", content: ["Mila book? Nice."] }],
      };
  },

  samiksha: (scene, state) => {
    if (!state.objectives.MEET_SATTWIK)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Samiksha",
            content: [
              "Hi main Samiksha hu",
              "Main 6th class se hi CIS mein hu",
              "Kaisa lag raha hai tujhe yaha?",
            ],
          },
          { speaker: "Arya", content: ["Eh... heh...", "Ha... achha lagra"] },
        ],
      };
    else if (!state.objectives.GET_PHY_NB)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          { speaker: "Arya", content: ["Tere Nbs complete?"] },
          { speaker: "Samiksha", content: ["Nahi na yaar..."] },
        ],
      };
    else if (state.objectives.TEAM_SATTWIK) {
      if (state.objectives.ASK_SAMIKSHA)
        return {
          action: DialogAction.NORMAL,
          dialogueSets: [
            { speaker: "Samiksha", content: ["Chalo guys.. enjoy"] },
          ],
        };
      else
        return {
          action: DialogAction.EXCLAIM,
          dialogueSets: [{ speaker: "Samiksha", content: festInfo.samiksha }],
          callback: () => state.completeObjective(Objective.ASK_SAMIKSHA),
        };
    } else return {};
  },

  sanskar: (scene, state) => ({
    action: DialogAction.NORMAL,
    dialogueSets: [
      {
        speaker: "Sanskar",
        content: [
          "Kal ka Mortal ka stream dekha?",
          '"PATT SE HEADSHOOOOT!',
          'Aise marte beta!", kya mast tha',
        ],
      },
    ],
  }),

  neel: (scene, state) => ({
    action: DialogAction.NORMAL,
    dialogueSets: [
      {
        speaker: "Neel",
        content: [
          "Yo wassup niggaz! Deez NUTZ!!!",
          "Itz yo daddy SAEEEEEET!",
          "Ah yeeee!",
        ],
      },
    ],
    callback: () => {
      scene.cameras.main.shake(1000, 0.02);
    },
  }),

  hrishi: (scene, state) => {
    if (state.objectives.TEAM_SATTWIK && !state.objectives.ASK_HRISHI)
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: [{ speaker: "Hrishi", content: festInfo.hrishi }],
        callback: () => state.completeObjective(Objective.ASK_HRISHI),
      };
    else
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Hrishi",
            content: [
              "Mortal kya khelta re PUBG!",
              "8 finger khelta WOOO",
              "Ah yeee!",
            ],
          },
        ],
      };
  },

  riddhi: (scene, state) => {
    if (state.objectives.TEAM_SATTWIK)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Sattwik",
            content: ["Thanks, Riddhi.", "Kal deta tera book"],
          },
          {
            speaker: "Riddhi",
            content: [
              "Yaad se. Ghuma mat dena",
              "Tu to khud ka IP notebook ghuma ke baitha tha",
            ],
          },
          {
            speaker: "Sattwik",
            content: [
              "(thinks) Roast kar diya bc... Kya awesome hai yaar yeh! oooohhh!!",
            ],
          },
        ],
      };
    else if (state.objectives.MEET_SATTWIK && !state.objectives.GET_PHY_NB)
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: [
          {
            speaker: "Arya",
            content: ["Tere NBs sab complete?"],
          },
          {
            speaker: "Riddhi",
            content: ["Ha, complete hai sab", "Kaunsa notebook?"],
          },
          { speaker: "Arya", content: ["Physics.", "Wo Sattwik ko chahiye"] },
          {
            speaker: "Riddhi",
            content: ["But usko bol kal lane ko pakka", "kal submission hai"],
          },
        ],
        callback: () => state.completeObjective(Objective.GET_PHY_NB),
      };
    else return {};
  },

  sattwik: (scene, state) => {
    if (!state.objectives.MEET_SATTWIK)
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: [
          {
            speaker: "Arya",
            content: [
              "Hi bro. Tu Sattwik na?",
              "Arey itne tension mein kya hai bhai?",
              "Chal na yeh fest vest kuch to hai dekhne jaate",
            ],
          },
          {
            speaker: "Sattwik",
            content: [
              "Mera IP notebook ghum gaya tha abhi vapas mila. Usse abhi complete kar raha tha",
              "But Physics nb bhi abhi vapas mila. But ab mera incomplete hai. Kya karuuu!!!",
              "Bhai sunn na main IP complete karta tu kisi se complete physics nb la sakta kya?",
              "Phir hum jaate fest dekhne. Mujhe bhi jaanna hai kya hai ye...",
            ],
          },
          {
            speaker: "Arya",
            content: [
              "OK, bro.",
              "(thinks) Arey notebook deta hi kyu hai ye? Arey doge to sab lenge; bhagwan se daro bc sharm karo",
              "Main dekhta kiska complete hai",
            ],
          },
        ],
        callback: () => state.completeObjective(Objective.MEET_SATTWIK),
      };
    else if (!state.objectives.GET_PHY_NB)
      return {
        action: DialogAction.NORMAL,
        dialogueSets: [
          {
            speaker: "Sattwik",
            content: [
              "Bas ho hi gaya IP complete...",
              "Oh, Arya... Mila kya notebook?",
            ],
          },
        ],
      };
    else if (state.objectives.GET_PHY_NB && !state.objectives.TEAM_SATTWIK)
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: [
          {
            speaker: "Arya",
            content: [
              "Yeh le bhai Physics",
              "Riddhi ka book hai bolri kal la pakka submission hai",
            ],
          },
          {
            speaker: "Sattwik",
            content: [
              "Arey brooo THANK YOU BHAI THANK YOU!!!",
              "Chal ab jaate fest dekhne",
              "But usse pehle CIS ke purane students se puchh lete ye kya fest hai",
            ],
          },
          { speaker: "Arya", content: ["Nice idea"] },
        ],
        callback: () => {
          state.completeObjective(Objective.TEAM_SATTWIK);
          scene.gridEngine.follow("sattwik", "arya", 2, true);
        },
      };
    else if (state.objectives.EAT_SNACKS)
      return {
        action: DialogAction.EXCLAIM,
        dialogueSets: endDialogue,
        callback: () => {
          // TODO Show ending scene
        },
      };
    return {};
  },
};

export default characterInteractions;
