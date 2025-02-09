import { BodyNode, DomNode, el, View } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import MaterialTechLogo from "../GaiaMaterialsLogo.js";

export default class Layout extends View {
  private static _current: Layout;

  public static set content(content: DomNode) {
    Layout._current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    Layout._current = this;

    this.container = el(
      ".layout",
      el(
        "header",
        new MaterialTechLogo(),
        el(
          ".button-container",
          new LoggedInUserAvatarButton(WalletLoginManager),
        ),
      ),
      this.contentContainer = el("main"),
    ).appendTo(BodyNode);
  }
}
