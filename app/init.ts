import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ConsoleLayout from "./console/ConsoleLayout.js";
import ConsoleView from "./console/ConsoleView.js";
import NewGameView from "./console/game/NewGameView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/*", Layout, ["/console", "/console/*"])
    .add("/", HomeView)
    .add(["/console", "/console/*"], ConsoleLayout)
    .add("/console", ConsoleView)
    .add("/console/new-game", NewGameView);
}
