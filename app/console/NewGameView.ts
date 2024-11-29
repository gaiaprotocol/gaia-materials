import { el, View } from "@common-module/app";
import ConsoleLayout from "./ConsoleLayout.js";

export default class NewGameView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-game-view",
      el("header", el("h2", "Create a new game")),
    );
  }
}
