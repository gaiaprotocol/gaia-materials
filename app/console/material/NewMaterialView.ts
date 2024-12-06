import { DomNode, el, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { GameEntity, GameRepository } from "gaiaprotocol";
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
          onClick: () => this.createMaterial(),
        }),
      ),
    );
  }

  public async changeData(_data: { slug: string } | GameEntity) {
    let data: GameEntity | undefined = _data as GameEntity;
    if (!("id" in data)) data = await GameRepository.fetchBySlug(data.slug);
    if (data?.id) {
      this.form = new MaterialForm({ game_id: data.id }).appendTo(this.main);
    }
  }

  private async createMaterial(): Promise<void> {
    if (this.form) {
      console.log(this.form.data);
    }
  }
}
