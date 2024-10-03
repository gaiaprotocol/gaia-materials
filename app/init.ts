import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { UniversalWalletConnector } from "@common-module/wallet";
import { WalletLoginManager } from "@common-module/wallet-login";
import { SupabaseConnector } from "../../supabase-module/lib/index.js";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import LoginView from "./auth/LoginView.js";
import LogoutView from "./auth/LogoutView.js";
import NewGameView from "./game/NewGameView.js";
import NewMaterialView from "./material/NewMaterialView.js";
import { ContractManager } from "gaiaprotocol";

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
    "0x3Fcea379bCc53Df5062Bc9428FEFb5c495bE75be",
  );

  Router.add("/login", LoginView);
  Router.add("/logout", LogoutView);
  Router.add("/material/new", NewMaterialView);
  Router.add("/game/new", NewGameView);
}
