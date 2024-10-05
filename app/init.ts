import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { UniversalWalletConnector } from "@common-module/wallet";
import { WalletLoginManager } from "@common-module/wallet-login";
import { SupabaseConnector } from "@common-module/supabase";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import LoginView from "./auth/LoginView.js";
import LogoutView from "./auth/LogoutView.js";
import NewGameView from "./game/NewGameView.js";
import NewMaterialView from "./material/NewMaterialView.js";
import { ContractManager } from "gaiaprotocol";
import MaterialInfoView from "./material/MaterialInfoView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  SupabaseConnector.init(
    AppConfig.supabaseUrl,
    AppConfig.supabaseKey,
    WalletLoginManager,
  );

  UniversalWalletConnector.init({
    name: "material.tech",
    icon: "https://material.tech/images/icon-192x192.png",
    description: "ItemFi for web3 games",
    walletConnectProjectId: "f526c5c4fbfa798d5337194a23b982ed",
    chains: {
      "base-sepolia": {
        id: 84532,
        name: "Base Sepolia Testnet",
        symbol: "ETH",
        rpc: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
      },
    },
  });

  ContractManager.addMaterialTradeContract(
    "base-sepolia",
    "https://sepolia.base.org",
    "0xD3B4b6B07949A807E18d93F33Fe9a9516dADf453",
  );

  Router.add("/login", LoginView);
  Router.add("/logout", LogoutView);

  Router.add("/material/new", NewMaterialView);
  Router.add("/material/:chain/:address", MaterialInfoView);

  Router.add("/game/new", NewGameView);
}
