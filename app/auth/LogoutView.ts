import { BodyNode, el, Router, View } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";

export default class LogoutView extends View {
  constructor() {
    super();
    this.container = el(".logout-view").appendTo(BodyNode);

    WalletLoginManager.logout();
    Router.goWithoutHistory("/");
  }
}
