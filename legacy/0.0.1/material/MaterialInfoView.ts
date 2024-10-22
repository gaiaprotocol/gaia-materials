import { BodyNode, el, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { parseEther } from "ethers";
import { ContractManager, MaterialService } from "gaiaprotocol";

type DT = { chain: string; address: string };

export default class MaterialInfoView extends View<DT> {
  constructor() {
    super();
    this.container = el(".material-info-view").appendTo(BodyNode);
  }

  public changeData(data: DT): void {
    this.loadMaterialInfo(data.chain, data.address);
  }

  private async loadMaterialInfo(chain: string, address: string) {
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

  private async buy(chain: string, address: string) {
    await ContractManager.executeMaterialTradeAction(
      chain,
      async (contract, signer) => {
        await contract.buy(signer, address, parseEther("1"));
      },
    );
  }

  private async sell(chain: string, address: string) {
    await ContractManager.executeMaterialTradeAction(
      chain,
      async (contract, signer) => {
        await contract.sell(signer, address, parseEther("1"));
      },
    );
  }
}
