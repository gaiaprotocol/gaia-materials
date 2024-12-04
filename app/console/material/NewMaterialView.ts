import { el, View } from "@common-module/app";
import ConsoleLayout from "../ConsoleLayout.js";
import MaterialForm from "./form/MaterialForm.js";
import { Button, ButtonType } from "@common-module/app-components";

export default class NewMaterialView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".new-material-view",
      el("header", el("h2", "Create a new material")),
      el("main", new MaterialForm()),
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

  private async createMaterial(): Promise<void> {
  }
}
