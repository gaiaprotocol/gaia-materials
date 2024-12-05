import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GameRepository } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import GameForm from "./form/GameForm.js";

export default class NewGameView extends View {
  private form: GameForm;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-game-view",
      el("header", el("h2", "Create a new game")),
      el("main", this.form = new GameForm()),
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
    const data = this.form.data;
    data.owner = WalletLoginManager.getLoggedInAddress();

    const game = await GameRepository.createGame(data);
    Router.go(`/console/game/${game.slug}`);
  }
}
