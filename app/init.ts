import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { WalletLoginManager } from "@common-module/wallet-login";
import { SupabaseConnector } from "../../supabase-module/lib/index.js";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import LoginView from "./auth/LoginView.js";
import LogoutView from "./auth/LogoutView.js";
import NewGameView from "./game/NewGameView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  SupabaseConnector.init(
    AppConfig.supabaseUrl,
    AppConfig.supabaseKey,
    WalletLoginManager,
  );

  Router.add("/game/new", NewGameView);
  Router.add("/login", LoginView);
  Router.add("/logout", LogoutView);
}
