import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { AddIcon, EditIcon } from "@gaiaprotocol/svg-icons";
import { GameDataManager, GameEntity } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";

export default class ConsoleGameInfoView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-game-info-view",
    );
  }

  public async changeData(data: { slug: string } | GameEntity) {
    let game: GameEntity | undefined = data as GameEntity;
    if (!("id" in data)) game = await GameDataManager.getGameBySlug(data.slug);

    this.container.append(
      JSON.stringify(game, null, 2),
      new Button({
        type: ButtonType.Contained,
        icon: new EditIcon(),
        title: "Edit game",
        onClick: () => Router.go(`/console/game/${data.slug}/edit`, game),
      }),
      new Button({
        type: ButtonType.Contained,
        icon: new AddIcon(),
        title: "Add new material",
        onClick: () =>
          Router.go(`/console/game/${data.slug}/new-material`, game),
      }),
    );
  }
}
