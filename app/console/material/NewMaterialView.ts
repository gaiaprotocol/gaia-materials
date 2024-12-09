import { DomNode, el, Router, View } from "@common-module/app";
import { Button, ButtonType, ErrorDialog } from "@common-module/app-components";
import {
  ContractEventsProcessor,
  GaiaProtocolConfig,
  GameDataManager,
  GameEntity,
  MaterialFactoryContract,
} from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";
import MaterialForm from "./form/MaterialForm.js";

export default class NewMaterialView extends View {
  private main: DomNode;
  private form: MaterialForm | undefined;

  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-material-view",
      el("header", el("h2", "Create a new material")),
      this.main = el("main"),
      el(
        "footer",
        new Button({
          type: ButtonType.Contained,
          title: "Create Material",
          onClick: async () => {
            try {
              await this.createMaterial();
            } catch (error: any) {
              new ErrorDialog({
                title: "Error creating material",
                message: error.message,
              });
              throw error;
            }
          },
        }),
      ),
    );
  }

  public async changeData(data: { slug: string } | GameEntity) {
    let game: GameEntity | undefined = data as GameEntity;
    if (!("id" in data)) game = await GameDataManager.getGameBySlug(data.slug);
    if (game?.id) {
      this.form = new MaterialForm({ game_id: game.id }).appendTo(this.main);
    }
  }

  private async createMaterial(): Promise<void> {
    if (this.form) {
      const data = this.form.data;

      if (!data.name) throw new Error("Material name is required");
      if (!data.symbol) throw new Error("Material symbol is required");

      const metadataHash = await GaiaProtocolConfig.supabaseConnector
        .callEdgeFunction<string>(
          "create-pending-material-data",
          {
            game_id: data.game_id,
            logo_image_url: data.logo_image_url,
            logo_thumbnail_url: data.logo_thumbnail_url,
            description: data.description,
          },
        );

      const materialAddress = await MaterialFactoryContract.createMaterial(
        data.name,
        data.symbol,
        metadataHash,
      );

      await ContractEventsProcessor.processEvents("MaterialFactory");

      Router.go(`/console/material/${materialAddress}`);
    }
  }
}
