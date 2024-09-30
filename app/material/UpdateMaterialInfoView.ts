import { BodyNode, el, View } from "@common-module/app";

export default class UpdateMaterialInfoView extends View {
  constructor() {
    super();
    this.container = el(".update-material-info-view").appendTo(BodyNode);
  }
}
