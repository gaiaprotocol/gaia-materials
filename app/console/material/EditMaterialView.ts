import { el, View } from "@common-module/app";
import { MaterialDataManager, MaterialEntity } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";

export default class EditMaterialView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".edit-material-view",
    );
  }

  public async changeData(data: { address: string }) {
    let material: MaterialEntity | undefined = data as MaterialEntity;
    if (!("game_id" in material) && data.address) {
      material = await MaterialDataManager.getMaterial(data.address);
    }

    this.container.append(
      JSON.stringify(material, null, 2),
    );
  }
}
