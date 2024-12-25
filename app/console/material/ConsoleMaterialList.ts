import { DomNode } from "@common-module/app";
import { MaterialEntity } from "gaiaprotocol";
import ConsoleGameMaterialListItem from "./ConsoleMaterialListItem.js";

export default class ConsoleGameMaterialList extends DomNode<HTMLUListElement, {
  materialSelected: (material: MaterialEntity) => void;
}> {
  public children: ConsoleGameMaterialListItem[] = [];

  constructor(materials?: MaterialEntity[]) {
    super("ul.console-material-list");
    if (materials) this.setMaterials(materials);
  }

  public addMaterial(material: MaterialEntity) {
    const item = new ConsoleGameMaterialListItem(material);
    item.onDom("click", () => this.emit("materialSelected", material));
    this.append(item);
  }

  public setMaterials(materials: MaterialEntity[]) {
    this.clear();
    for (const material of materials) {
      this.addMaterial(material);
    }
  }
}
