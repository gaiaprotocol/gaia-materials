import { DomNode, el } from "@common-module/app";
import { MaterialEntity } from "gaiaprotocol";

export default class ConsoleGameMaterialListItem extends DomNode {
  constructor(material: MaterialEntity) {
    super("li.console-material-list-item");
    this.append(
      el("h3", material.name),
      el("span.address", material.address),
    );
  }
}
