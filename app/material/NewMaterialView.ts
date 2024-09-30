import { BodyNode, el, View } from "@common-module/app";

export default class NewMaterialView extends View {
  constructor() {
    super();
    this.container = el(".new-material-view").appendTo(BodyNode);
  }
}
