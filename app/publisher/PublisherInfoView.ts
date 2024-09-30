import { BodyNode, el, View } from "@common-module/app";

export default class PublisherInfoView extends View {
  constructor() {
    super();
    this.container = el(".publisher-info-view").appendTo(BodyNode);
  }
}
