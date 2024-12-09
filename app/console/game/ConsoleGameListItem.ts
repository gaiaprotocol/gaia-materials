import { DomNode, el, Router } from "@common-module/app";
import { GameEntity } from "gaiaprotocol";

export default class ConsoleGameListItem extends DomNode {
  constructor(game: GameEntity) {
    super("li.console-game-list-item");

    this.append(
      el("h3", game.name),
    );

    this.onDom("click", () => Router.go(`/console/game/${game.slug}`, game));
  }
}
