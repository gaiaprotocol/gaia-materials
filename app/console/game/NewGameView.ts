import { el, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import ConsoleLayout from "../ConsoleLayout.js";
import GameForm from "./form/GameForm.js";

export default class NewGameView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-game-view",
      el("header", el("h2", "Create a new game")),
      el("main", new GameForm()),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create game",
          onClick: () => this.createGame(),
        }),
      ),
    );
  }

  private async createGame(): Promise<void> {
  }
}
