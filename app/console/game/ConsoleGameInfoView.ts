import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { GameRepository } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import { AddIcon } from "@gaiaprotocol/svg-icons";

export default class ConsoleGameInfoView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-game-info-view",
    );
  }

  public async changeData(data: { slug: string }) {
    const game = await GameRepository.fetchBySlug(data.slug);

    this.container.append(
      JSON.stringify(game, null, 2),
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
