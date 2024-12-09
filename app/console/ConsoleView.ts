import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GameDataManager } from "gaiaprotocol";
import ConsoleLayout from "./ConsoleLayout.js";
import ConsoleGameList from "./game/ConsoleGameList.js";

export default class ConsoleView extends View {
  private gameList: ConsoleGameList;

  constructor() {
    super();

    ConsoleLayout.content = this.container = el(
      ".console-view",
      el(
        "section.games",
        el(
          "header",
          el("h2", "Games"),
          new Button({
            type: ButtonType.Contained,
            title: "New Game",
            onClick: () => Router.go("/console/new-game"),
          }),
        ),
        this.gameList = new ConsoleGameList(),
      ),
    );

    this.loadGames();
  }

  private async loadGames() {
    const owner = WalletLoginManager.getLoggedInAddress();
    if (!owner) {
      Router.go("/");
      return;
    }

    const games = await GameDataManager.getGamesByOwner(owner);
    this.gameList.setGames(games);
  }
}
