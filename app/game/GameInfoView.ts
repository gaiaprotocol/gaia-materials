import { BodyNode, el, View } from "@common-module/app";

export default class GameInfoView extends View {
  constructor() {
    super();
    this.container = el(".game-info-view").appendTo(BodyNode);
  }
}
