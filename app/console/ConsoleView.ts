import { el, View } from "@common-module/app";
import ConsoleLayout from "./ConsoleLayout.js";

export default class ConsoleView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-view",
      "Console View",
    );
  }
}
