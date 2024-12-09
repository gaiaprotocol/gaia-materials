import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { MaterialDataManager, MaterialEntity } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";

export default class ConsoleMaterialInfoView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-material-info-view",
    );
  }

  public async changeData(data: { address: string } | MaterialEntity) {
    let material: MaterialEntity | undefined = data as MaterialEntity;
    if (!("game_id" in material) && data.address) {
      material = await MaterialDataManager.getMaterial(data.address);
    }
    if (!material) return;

    this.container.append(
      JSON.stringify(material, null, 2),
      new Button({
        type: ButtonType.Contained,
        title: "Edit material",
        onClick: () =>
          Router.go(`/console/material/${material.address}/edit`, material),
      }),
    );
  }
}
