import { el, View } from "@common-module/app";
import Layout from "./Layout.js";

export default class HomeView extends View {
  constructor() {
    super();
    Layout.content = this.container = el(".home-view", "Home View");
  }
}
