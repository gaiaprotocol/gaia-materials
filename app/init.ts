import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import ConsoleLayout from "./console/ConsoleLayout.js";
import ConsoleView from "./console/ConsoleView.js";
import ConsoleGameInfoView from "./console/game/ConsoleGameInfoView.js";
import EditGameInfoView from "./console/game/EditGameInfoView.js";
import NewGameView from "./console/game/NewGameView.js";
import AddMaterialView from "./console/material/AddMaterialView.js";
import ConsoleMaterialInfoView from "./console/material/ConsoleMaterialInfoView.js";
import EditMaterialView from "./console/material/EditMaterialView.js";
import NewMaterialView from "./console/material/NewMaterialView.js";
import GameInfoView from "./views/GameInfoView.js";
import HomeView from "./views/HomeView.js";
import Layout from "./views/Layout.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/*", Layout, ["/console", "/console/*"])
    .add("/", HomeView)
    .add("/game/:slug", GameInfoView)
    .add(["/console", "/console/*"], ConsoleLayout)
    .add("/console", ConsoleView)
    .add("/console/new-game", NewGameView)
    .add("/console/game/:slug", ConsoleGameInfoView)
    .add("/console/game/:slug/edit", EditGameInfoView)
    .add("/console/game/:slug/new-material", NewMaterialView)
    .add("/console/game/:slug/add-material", AddMaterialView)
    .add("/console/material/:address", ConsoleMaterialInfoView)
    .add("/console/material/:address/edit", EditMaterialView);
}
