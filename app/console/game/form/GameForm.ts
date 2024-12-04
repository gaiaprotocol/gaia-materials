import { DomNode } from "@common-module/app";
import GameLogoInput from "./GameLogoInput.js";

export default class GameForm extends DomNode {
  constructor() {
    super(".game-form");
    this.append(
      new GameLogoInput({}),
    );
  }
}
