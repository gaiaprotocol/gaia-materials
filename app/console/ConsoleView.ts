import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import ConsoleLayout from "./ConsoleLayout.js";
import ConsoleGameList from "./game/ConsoleGameList.js";

export default class ConsoleView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-view",
      el(
        "section.games",
        el(
          "header",
          el("h2", "Games"),
          new Button({
            type: ButtonType.Contained,
            title: "New Game",
            onClick: () => Router.go("/console/new-game"),
          }),
        ),
        new ConsoleGameList(),
      ),
    );
  }
}
