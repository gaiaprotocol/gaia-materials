import { BodyNode, el, View, ViewParams } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { WalletLoginManager } from "@common-module/wallet-login";
import { parseEther } from "ethers";
import { ContractManager, MaterialService } from "gaiaprotocol";

export default class MaterialInfoView extends View {
  constructor() {
    super();
    this.container = el(".material-info-view").appendTo(BodyNode);
  }

  public changeParams(params: ViewParams): void {
    if (params.chain && params.address) {
      this.loadMaterial(params.chain, params.address);
    }
  }

  private async buy(chain: string, address: string) {
    const contract = ContractManager.getMaterialTradeContract(chain);
    if (!contract) throw new Error("MaterialTrade contract not found");

    const signer = await WalletLoginManager.getSigner();
    if (!signer) throw new Error("Signer not found");

    await contract.buy(signer, address, parseEther("1"));
  }

  private async sell(chain: string, address: string) {
    const contract = ContractManager.getMaterialTradeContract(chain);
    if (!contract) throw new Error("MaterialTrade contract not found");

    const signer = await WalletLoginManager.getSigner();
    if (!signer) throw new Error("Signer not found");

    await contract.sell(signer, address, parseEther("1"));
  }

  private async loadMaterial(chain: string, address: string) {
    const material = await MaterialService.fetchMaterial(chain, address);
    if (!material) {
      this.container.empty().append(
        el("h1", "Material not found"),
      );
    } else {
      this.container.empty().append(
        el("h1", material.name),
        new Button({
          type: ButtonType.Contained,
          title: "Buy",
          onClick: () => this.buy(chain, address),
        }),
        new Button({
          type: ButtonType.Contained,
          title: "Sell",
          onClick: () => this.sell(chain, address),
        }),
      );
    }
  }
}
