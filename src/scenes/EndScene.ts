import * as gameKeys from "../util/gameKeys";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super(gameKeys.scenes.endscene.key);
  }

  create() {
    this.add.image(320, 240, gameKeys.uiImages.anoopSoni);
    this.cameras.main.backgroundColor = new Phaser.Display.Color(0, 0, 0);
    this.cameras.main.fadeIn(
      500,
      0,
      0,
      0,
      (_camera: Phaser.Cameras.Scene2D.Camera, completion: number) => {
        if (completion === 1) {
          const dialogueSets = [
            {
              speaker: "Anoop Soni",
              content: [
                "Iss masoom bachchi koi shayad yeh bhanak tak nahi hogi ki uske khilaaf aise ghor apradh ko koi anjaam de sakta hai",
                "Bharat mein zyadatar aise maamlo mein apradhi peedit ke jaan pehchaan ka hi hota hai",
                "Ya phir uske roz marra ke jagah pe aane vaale log...",
                "Jaise iss ghatna mein iss bachchi ke school ke chhatr hi apradhi the",
                "Ab main Anoop Soni aap se vida lunga. Agli baar milenge Crime Patrol Dastak mein.",
                "Ek aur dil dehla dene vali ghatna ke saath",
                "Tab tak ke liye apna dhyaan rakhein, SAVDHAAN RAHEIN SATARK RAHEIN, JAI HIND!",
              ],
            },
          ];
          this.scene.launch(gameKeys.uiScenes.Dialogue, {
            meta: { root: this },
            dialogueSets,
          });
          this.events.on("resume", () => {
            this.scene.stop();
          });
          this.scene.pause();
        }
      }
    );
  }
}
