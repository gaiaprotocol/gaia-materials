import { el, View } from "@common-module/app";
import { Button, ButtonType, ErrorDialog } from "@common-module/app-components";
import { MaterialDataManager, MaterialEntity } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import MaterialForm from "./form/MaterialForm.js";

export default class EditMaterialView extends View {
  private form: MaterialForm;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-material-view",
      el("header", el("h2", "Edit material")),
      el("main", this.form = new MaterialForm({ editMode: true })),
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

  public async changeData(data: { address: string }) {
    let material: MaterialEntity | undefined = data as MaterialEntity;
    if (!("game_id" in material) && data.address) {
      material = await MaterialDataManager.getMaterial(data.address);
    }

    this.form.data = material;
  }

  private async saveMaterial(): Promise<void> {
    if (!this.form.data) throw new Error("Material data is required");

    //TODO: Implement saveMaterial
  }
}
