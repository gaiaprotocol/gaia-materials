import { DomNode } from "@common-module/app";
import { MaterialEntity } from "gaiaprotocol";
import ConsoleGameMaterialListItem from "./ConsoleGameMaterialListItem.js";

export default class ConsoleGameMaterialList extends DomNode {
  public children: ConsoleGameMaterialListItem[] = [];

  constructor(materials?: MaterialEntity[]) {
    super("ul.console-game-material-list");
    if (materials) this.setMaterials(materials);
  }

  public addMaterial(material: MaterialEntity) {
    this.append(new ConsoleGameMaterialListItem(material));
  }

  public setMaterials(materials: MaterialEntity[]) {
    this.clear();
    for (const material of materials) {
      this.addMaterial(material);
    }
  }
}
