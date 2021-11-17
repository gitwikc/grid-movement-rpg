import { Gender, House, scenes } from "../../../util/gameKeys";
import { Snack } from "../../../util/stores/festStore";
import Festroom from "../Festroom";

export class F1 extends Festroom {
  constructor() {
    super(scenes.floor4.f1, { x: 16, y: 13 }, [
      {
        gender: Gender.FEMALE,
        house: House.RED,
        snack: Snack.SPDP,
      },
      {
        gender: Gender.MALE,
        house: House.GREEN,
      },
      {
        gender: Gender.MALE,
        house: House.BLUE,
        snack: Snack.PANI_PURI,
      },
      {
        gender: Gender.FEMALE,
        house: House.GREEN,
      },
    ]);
  }
}

export class F2 extends Festroom {
  constructor() {
    super(scenes.floor4.f2, { x: 16, y: 20 }, [
      {
        gender: Gender.FEMALE,
        house: House.YELLOW,
        snack: Snack.KULFI,
      },
      {
        gender: Gender.FEMALE,
        house: House.GREEN,
      },
      {
        gender: Gender.MALE,
        house: House.BLUE,
      },
      {
        gender: Gender.MALE,
        house: House.RED,
        snack: Snack.FRUIT_CHAAT,
      },
    ]);
  }
}

export class F3 extends Festroom {
  constructor() {
    super(scenes.floor4.f3, { x: 1, y: 25 }, [
      {
        gender: Gender.FEMALE,
        house: House.BLUE,
      },
      {
        gender: Gender.MALE,
        house: House.GREEN,
        snack: Snack.SAMOSA,
      },
      {
        gender: Gender.FEMALE,
        house: House.BLUE,
      },
      {
        gender: Gender.MALE,
        house: House.GREEN,
      },
    ]);
  }
}

export class F4 extends Festroom {
  constructor() {
    super(scenes.floor4.f4, { x: 1, y: 38 }, [
      {
        gender: Gender.MALE,
        house: House.RED,
      },
      {
        gender: Gender.FEMALE,
        house: House.GREEN,
      },
      {
        gender: Gender.MALE,
        house: House.YELLOW,
      },
      {
        gender: Gender.FEMALE,
        house: House.GREEN,
        snack: Snack.SPRING_ROLL,
      },
    ]);
  }
}
