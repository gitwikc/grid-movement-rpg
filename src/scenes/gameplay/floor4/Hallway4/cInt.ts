const festComments = [
  ["Wah kya baat hai!!", "Iss baar masst cheezin bani thi fest mein"],
  ["Kuch maza nahi aaya...", "Taste kaha hai?"],
  [
    "Token kharida tum logo ne?",
    "Token vaha ekdum aage uss room mein dere lelo",
  ],
  ["Kulfi try kiya", "(coughs) uhuhu- uhu-", "Oh no..."],
  ["Yaar iss baar fest pheeka tha", "I hope next time better ho"],
  [
    "Spring roll khao best hai",
    "Jaldi jao nahi to khatam",
    "Maine kaise to karke liya",
  ],
  ["Fruit chaat ka Rs. 50?", "Kya loot machi hai!"],
  ["Samosa garam chahiye tha", "I guess I was late then... huh"],
  [
    "WOOH!! Baapre pani puri bola tha thoda teekha banao",
    "Usne to pura mirch ka dabba hi khaali kar diya lagta hai",
    "Oh.. Oh no- Toilet jana padega!",
  ],
  [
    "Token khatam ho gaye mere. Mehnga rakha hai iss saal",
    "Ya to black lena padega ya phir awesome bargaining skills",
  ],
];

export const getRandomComment = (): string[] =>
  festComments[Math.floor(Math.random() * festComments.length)];
