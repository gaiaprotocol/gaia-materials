import { BodyNode, el, Router, View, ViewParams } from "@common-module/app";
import { Alert } from "@common-module/app-components";
import { WalletLoginContent } from "@common-module/wallet-login";
import AppConfig from "../AppConfig.js";

export default class LoginView extends View {
  private redirectTo: `/${string}` | undefined;

  constructor() {
    super();
    this.container = el(
      ".login-view",
      new WalletLoginContent(
        AppConfig.messageForLogin,
        () => Router.goWithoutHistory(this.redirectTo ?? "/"),
        (error) => new Alert({ title: "Error", message: error.message }),
      ),
    ).appendTo(BodyNode);
  }

  public changeParams(params: ViewParams): void {
    this.redirectTo = params.redirectTo as `/${string}` | undefined;
  }
}
