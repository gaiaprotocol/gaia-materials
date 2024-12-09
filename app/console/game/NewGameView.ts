import { el, Router, View } from "@common-module/app";
import { Button, ButtonType, ErrorDialog } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GameDataManager } from "gaiaprotocol";
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
          onClick: async () => {
            try {
              await this.createGame();
            } catch (error: any) {
              new ErrorDialog({
                title: "Error creating game",
                message: error.message,
              });
              throw error;
            }
          },
        }),
      ),
    );
  }

  private async createGame(): Promise<void> {
    const data = this.form.data;
    if (!data) throw new Error("Game data is required");

    data.owner = WalletLoginManager.getLoggedInAddress();
    const game = await GameDataManager.createGame(data);
    Router.go(`/console/game/${game.slug}`);
  }
}
