import { el, Router, View } from "@common-module/app";
import { ConfirmDialog } from "@common-module/app-components";
import {
  GaiaProtocolConfig,
  GameDataManager,
  GameEntity,
  MaterialDataManager,
} from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import ConsoleGameMaterialList from "./ConsoleMaterialList.js";

export default class AddMaterialView extends View {
  private game: GameEntity | undefined;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".add-material-view",
      el("header", el("h2", "Add existing material to game")),
    );
    this.loadNotAddedMaterials();
  }

  public async changeData(data: { slug: string } | GameEntity) {
    let game: GameEntity | undefined = data as GameEntity;
    if (!("id" in data)) game = await GameDataManager.getGameBySlug(data.slug);
    if (game?.id) this.game = game;
  }

  private async loadNotAddedMaterials() {
    const materials = await MaterialDataManager.getMaterialsNotAddedToGame();
    const materialsList = new ConsoleGameMaterialList(materials);
    materialsList.on(
      "materialSelected",
      (material) => {
        new ConfirmDialog({
          title: "Add material to game",
          message: `Do you want to add material ${material.name} to the game?`,
          onConfirm: async () => {
            if (material.address && this.game?.id) {
              await GaiaProtocolConfig.supabaseConnector.callEdgeFunction(
                "add-material-to-game",
                { materialAddress: material.address, gameId: this.game.id },
              );
              Router.go(`/console/game/${this.game.slug}`);
            }
          },
        });
      },
    );
    this.container.append(materialsList);
  }
}
