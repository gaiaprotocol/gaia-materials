import { BodyNode, el, Router, View } from "@common-module/app";
import { Alert } from "@common-module/app-components";
import { WalletLoginContent } from "@common-module/wallet-login";
import AppConfig from "../AppConfig.js";

type DT = { redirectTo?: `/${string}` };

export default class LoginView extends View<DT> {
  private redirectTo?: `/${string}`;

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

  public changeParams(data: DT): void {
    this.redirectTo = data.redirectTo;
  }
}
