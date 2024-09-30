import { BodyNode, el, View } from "@common-module/app";

export default class UpdateGameInfoView extends View {
  constructor() {
    super();
    this.container = el(".update-game-info-view").appendTo(BodyNode);
  }
}
