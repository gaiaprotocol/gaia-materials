import { BodyNode, el, Router, View } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";

export default class NewGameView extends View {
  constructor() {
    super();
    this.container = el(".new-game-view", "New Game View").appendTo(BodyNode);

    if (!WalletLoginManager.isLoggedIn) {
      Router.goWithoutHistory("/login", { redirectTo: "/game/new" });
    }
  }
}
