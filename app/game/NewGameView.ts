import { BodyNode, el, Router, View } from "@common-module/app";
import { Button, ButtonType, Form, Input } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GameService } from "gaiaprotocol";

export default class NewGameView extends View {
  private nameInput: Input;

  constructor() {
    super();
    this.container = el(
      ".new-game-view",
      el("header", el("h1", "Create New Game")),
      new Form(
        this.nameInput = new Input({
          label: "Game Name",
          placeholder: "e.g., MyGame",
          required: true,
        }),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create",
          onClick: () => this.createGame(),
        }),
      ),
    ).appendTo(BodyNode);

    if (!WalletLoginManager.isLoggedIn) {
      Router.goWithoutHistory("/login", { redirectTo: "/game/new" });
    }
  }

  private async createGame(): Promise<void> {
    const game = await GameService.createGame(this.nameInput.value);
    Router.go(`/game/${game.id}`, { game });
  }
}
