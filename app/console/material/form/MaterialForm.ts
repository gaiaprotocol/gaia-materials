import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { LogoInput, MaterialEntity } from "gaiaprotocol";

export default class MaterialForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: MaterialEntity) => void;
}> {
  constructor(public data: MaterialEntity) {
    super(".material-form");
    this.append(
      new LogoInput({ functionName: "upload-material-logo" }, {}),
      el(
        ".name-input-container",
        new Input({
          label: "Name",
          placeholder: "Enter material name",
          value: this.data.name,
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".symbol-input-container",
        new Input({
          label: "Symbol",
          placeholder: "Enter material symbol",
          value: this.data.symbol,
          onChange: (newValue) => {
            this.data.symbol = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".description-input-container",
        new Input({
          multiline: true,
          label: "Description",
          placeholder: "Enter material description",
          value: this.data.description,
          onChange: (newValue) => {
            this.data.description = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
    );
  }
}
