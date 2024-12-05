import { DomNode } from "@common-module/app";
import { LogoInput } from "gaiaprotocol";

export default class MaterialForm extends DomNode {
  constructor() {
    super(".material-form");
    this.append(
      new LogoInput({ functionName: "upload-material-logo" }, {}),
    );
  }
}
