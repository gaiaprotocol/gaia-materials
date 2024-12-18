import { el, Router, View } from "@common-module/app";
import { Button, ButtonType, ErrorDialog } from "@common-module/app-components";
import { GameDataManager, GameEntity } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import GameForm from "./form/GameForm.js";

export default class EditGameInfoView extends View {
  private form: GameForm;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".edit-game-info-view",
      el("header", el("h2", "Edit game")),
      el("main", this.form = new GameForm()),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Save game",
          onClick: async () => {
            try {
              await this.saveGame();
            } catch (error: any) {
              new ErrorDialog({
                title: "Error saving game",
                message: error.message,
              });
              throw error;
            }
          },
        }),
      ),
    );
  }

  public async changeData(data: { slug: string } | GameEntity) {
    let game: GameEntity | undefined = data as GameEntity;
    if (!("id" in data)) game = await GameDataManager.getGameBySlug(data.slug);

    this.form.data = game;
  }

  private async saveGame(): Promise<void> {
    if (!this.form.data) throw new Error("Game data is required");

    const game = await GameDataManager.updateGame(this.form.data);
    Router.go(`/console/game/${game.slug}`);
  }
}
