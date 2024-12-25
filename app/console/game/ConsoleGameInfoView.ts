import { el, Router, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { AddIcon, EditIcon } from "@gaiaprotocol/svg-icons";
import { GameDataManager, GameEntity, MaterialDataManager } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import ConsoleGameMaterialList from "../material/ConsoleMaterialList.js";

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
    if (!game) return;

    this.container.append(
      JSON.stringify(game, null, 2),
      new Button({
        type: ButtonType.Contained,
        icon: new EditIcon(),
        title: "Edit game",
        onClick: () => Router.go(`/console/game/${game.slug}/edit`, game),
      }),
      new Button({
        type: ButtonType.Contained,
        icon: new AddIcon(),
        title: "Add new material",
        onClick: () =>
          Router.go(`/console/game/${game.slug}/new-material`, game),
      }),
      new Button({
        type: ButtonType.Contained,
        icon: new AddIcon(),
        title: "Add existing material",
        onClick: () =>
          Router.go(`/console/game/${game.slug}/add-material`, game),
      }),
    );

    if (game.id) await this.loadMaterials(game.id);
  }

  private async loadMaterials(gameId: number) {
    const materials = await MaterialDataManager.getMaterialsByGame(gameId);
    const materialsList = new ConsoleGameMaterialList(materials);
    materialsList.on(
      "materialSelected",
      (material) =>
        Router.go(`/console/material/${material.address}`, material),
    );
    this.container.append(materialsList);
  }
}
