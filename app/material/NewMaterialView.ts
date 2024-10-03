import { BodyNode, el, Router, View } from "@common-module/app";
import { Button, ButtonType, Form, Input } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";

export default class NewMaterialView extends View {
  constructor() {
    super();
    this.container = el(
      ".new-material-view",
      el("header", el("h1", "Create New Material")),
      new Form(
        new Input({
          label: "Token Name",
          placeholder: "e.g., MyToken",
          required: true,
        }),
        new Input({
          label: "Token Symbol",
          placeholder: "e.g., MTK",
          required: true,
        }),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create",
        }),
      ),
    ).appendTo(BodyNode);

    if (!WalletLoginManager.isLoggedIn) {
      Router.goWithoutHistory("/login", { redirectTo: "/material/new" });
    }
  }
}
