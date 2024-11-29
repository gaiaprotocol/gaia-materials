import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import Layout from "./views/Layout.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/*", Layout);
}
