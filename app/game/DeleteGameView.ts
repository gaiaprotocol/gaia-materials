import { BodyNode, el, View } from "@common-module/app";

export default class DeleteGameView extends View {
  constructor() {
    super();
    this.container = el(".delete-game-view").appendTo(BodyNode);
  }
}
