import { DomNode, el, Router } from "@common-module/app";
import { MaterialEntity } from "gaiaprotocol";

export default class ConsoleGameMaterialListItem extends DomNode {
  constructor(material: MaterialEntity) {
    super("li.console-game-material-list-item");

    this.append(
      el("h3", material.name),
    );

    this.onDom(
      "click",
      () => Router.go(`/console/material/${material.address}`, material),
    );
  }
}
