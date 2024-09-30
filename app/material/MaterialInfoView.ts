import { BodyNode, el, View } from "@common-module/app";

export default class MaterialInfoView extends View {
  constructor() {
    super();
    this.container = el(".material-info-view").appendTo(BodyNode);
  }
}
