import { BodyNode, DomNode, el, View } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import MaterialTechLogo from "../GaiaMaterialsLogo.js";

export default class ConsoleLayout extends View {
  private static _current: ConsoleLayout;

  public static set content(content: DomNode) {
    ConsoleLayout._current.contentContainer.append(content);
  }

  private contentContainer: DomNode;

  constructor() {
    super();
    ConsoleLayout._current = this;

    this.container = el(
      ".console-layout",
      el(
        "header",
        el("h1", new MaterialTechLogo(), "Game Console"),
        el(
          ".button-container",
          new LoggedInUserAvatarButton(WalletLoginManager),
        ),
      ),
      this.contentContainer = el("main"),
    ).appendTo(BodyNode);
  }
}
