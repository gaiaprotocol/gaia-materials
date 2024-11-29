import { Router } from "@common-module/app";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { WalletLoginConfig } from "@common-module/wallet-login";
import { WalletIcon } from "@gaiaprotocol/svg-icons";
import { GaiaUIPreset } from "@gaiaprotocol/ui-preset";
import { base, baseSepolia } from "@wagmi/core/chains";
import { GaiaProtocolConfig } from "gaiaprotocol";

export interface IAppConfig {
  isDevMode: boolean;
  isTestnet: boolean;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;
  public isTestnet!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);
    GaiaUIPreset.init();

    GaiaProtocolConfig.initOnlyForGaiaProtocol(
      config.isDevMode,
      config.isTestnet,
    );

    SocialCompConfig.goLoggedInUserProfile = async (user) => {
    };

    SocialCompConfig.getLoggedInUserMenu = async (menu, user) => {
      return new DropdownMenuGroup(
        new DropdownMenuItem({
          icon: new WalletIcon(),
          label: "My Wallet",
          onClick: () => {
            Router.go("/wallet");
            menu.remove();
          },
        }),
      );
    };

    WalletLoginConfig.init({
      chains: [base, baseSepolia] as any,
      walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
      supabaseConnector: GaiaProtocolConfig.supabaseConnector,
    });
  }
}

export default new AppConfig();
