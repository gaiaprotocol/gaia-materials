import { BodyNode, el, Router, View } from "@common-module/app";
import {
  Button,
  ButtonType,
  Form,
  Input,
  Select,
} from "@common-module/app-components";
import { ContractEventTracker } from "@common-module/contract-event-tracker";
import { WalletLoginManager } from "@common-module/wallet-login";
import { ContractManager } from "gaiaprotocol";
import AppConfig from "../AppConfig.js";

export default class NewMaterialView extends View {
  private chainSelect: Select;
  private nameInput: Input;
  private symbolInput: Input;

  constructor() {
    super();
    this.container = el(
      ".new-material-view",
      el("header", el("h1", "Create New Material")),
      new Form(
        this.chainSelect = new Select({
          label: "Chain",
          placeholder: "Select a chain...",
          required: true,
          options: AppConfig.isForSepolia
            ? [
              { value: "base-sepolia", label: "Base Sepolia" },
            ]
            : [
              { value: "base", label: "Base" },
            ],
        }),
        this.nameInput = new Input({
          label: "Token Name",
          placeholder: "e.g., MyToken",
          required: true,
        }),
        this.symbolInput = new Input({
          label: "Token Symbol",
          placeholder: "e.g., MTK",
          required: true,
        }),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create",
          onClick: () => this.createMaterial(),
        }),
      ),
    ).appendTo(BodyNode);

    if (!WalletLoginManager.isLoggedIn) {
      Router.goWithoutHistory("/login", { redirectTo: "/material/new" });
    }
  }

  private async createMaterial(): Promise<void> {
    const chain = this.chainSelect.value;

    const contract = ContractManager.getMaterialTradeContract(chain);
    if (!contract) throw new Error("MaterialTrade contract not found");

    const signer = await WalletLoginManager.getSigner();
    if (!signer) throw new Error("Signer not found");

    const materialAddress = await contract.createMaterial(
      signer,
      this.nameInput.value,
      this.symbolInput.value,
    );

    await ContractEventTracker.trackEvents(chain, "MaterialTrade");

    Router.go(`/material/${chain}/${materialAddress}`);
  }
}
