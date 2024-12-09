import { DomNode } from "@common-module/app";
import { GameEntity } from "gaiaprotocol";
import ConsoleGameListItem from "./ConsoleGameListItem.js";

export default class ConsoleGameList extends DomNode {
  public children: ConsoleGameListItem[] = [];

  constructor() {
    super("ul.console-game-list");
  }

  public addGame(game: GameEntity) {
    this.append(new ConsoleGameListItem(game));
  }

  public setGames(games: GameEntity[]) {
    this.clear();
    for (const game of games) {
      this.addGame(game);
    }
  }
}
