import { el, View } from "@common-module/app";
import ConsoleLayout from "../ConsoleLayout.js";

export default class NewMaterialView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-material-view",
      el("header", el("h2", "Create a new material")),
    );
  }
}
