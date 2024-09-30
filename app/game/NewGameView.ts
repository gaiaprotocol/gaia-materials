import { BodyNode, el, View } from "@common-module/app";

export default class NewGameView extends View {
  constructor() {
    super();
    this.container = el(".new-game-view").appendTo(BodyNode);
  }
}
