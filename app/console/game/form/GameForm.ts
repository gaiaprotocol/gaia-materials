import { DomNode } from "@common-module/app";
import GameScreenshotInput from "./GameScreenshotInput.js";
import GameThumbnailInput from "./GameThumbnailInput.js";

export default class GameForm extends DomNode {
  constructor() {
    super(".game-form");
    this.append(
      new GameThumbnailInput(),
      new GameScreenshotInput([]),
    );
  }
}
