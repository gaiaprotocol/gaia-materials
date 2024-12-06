import { el, View } from "@common-module/app";
import { MaterialRepository } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";

export default class ConsoleMaterialInfoView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-material-info-view",
    );
  }

  public async changeData(data: { address: string }) {
    const material = await MaterialRepository.fetchByAddress(data.address);

    this.container.append(
      JSON.stringify(material, null, 2),
    );
  }
}
