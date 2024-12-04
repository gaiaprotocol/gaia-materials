import { DomNode } from "@common-module/app";
import MaterialLogoInput from "./MaterialLogoInput.js";

export default class MaterialForm extends DomNode {
  constructor() {
    super(".material-form");
    this.append(
      new MaterialLogoInput({}),
    );
  }
}
