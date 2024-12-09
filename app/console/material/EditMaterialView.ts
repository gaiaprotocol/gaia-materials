import { el, View } from "@common-module/app";
import {
  Button,
  ButtonType,
  ErrorDialog,
  PromptDialog,
} from "@common-module/app-components";
import {
  GaiaProtocolConfig,
  MaterialContract,
  MaterialDataManager,
  MaterialEntity,
} from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import MaterialForm from "./form/MaterialForm.js";

export default class EditMaterialView extends View {
  private address: `0x${string}` | undefined;
  private form: MaterialForm;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-material-view",
      el("header", el("h2", "Edit material")),
      el(
        "main",
        this.form = new MaterialForm({
          editName: async () => {
            const newName = await new PromptDialog({
              title: "Edit Material Name",
              message: "Enter the new name for the material",
              value: this.form.data?.name,
            }).waitForConfirmation();

            if (this.address && this.form.data) {
              await new MaterialContract(this.address).setName(newName);
              await this.syncMaterialMetadataToDB();
              this.form.data = { ...this.form.data, name: newName };
            }
          },
          editSymbol: async () => {
            const newSymbol = await new PromptDialog({
              title: "Edit Material Symbol",
              message: "Enter the new symbol for the material",
              value: this.form.data?.symbol,
            }).waitForConfirmation();

            if (this.address && this.form.data) {
              await new MaterialContract(this.address).setSymbol(newSymbol);
              await this.syncMaterialMetadataToDB();
              this.form.data = { ...this.form.data, symbol: newSymbol };
            }
          },
        }),
      ),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Save Material",
          onClick: async () => {
            try {
              await this.saveMaterial();
            } catch (error: any) {
              new ErrorDialog({
                title: "Error saving material",
                message: error.message,
              });
              throw error;
            }
          },
        }),
      ),
    );
  }

  public async changeData(data: { address: `0x${string}` }) {
    this.address = data.address;
    let material: MaterialEntity | undefined = data as MaterialEntity;
    if (!("game_id" in material) && data.address) {
      material = await MaterialDataManager.getMaterial(data.address);
      this.address = material?.address;
    }

    this.form.data = material;
  }

  private async syncMaterialMetadataToDB(): Promise<void> {
    if (!this.address) throw new Error("Material address is required");

    await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
      "sync-material-metadata-to-db",
      { address: this.address },
    );
  }

  private async saveMaterial(): Promise<void> {
    if (!this.form.data) throw new Error("Material data is required");

    await MaterialDataManager.updateMaterial(this.form.data);
    await this.syncMaterialMetadataToDB();
  }
}
