import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { LogoInput, MaterialEntity } from "gaiaprotocol";
import { LogoData } from "gaiaprotocol/lib/form/LogoInput.js";

export default class MaterialForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: MaterialEntity) => void;
}> {
  private _data!: MaterialEntity;

  private readonly inputs: {
    logo?: LogoInput;
    name?: Input;
    symbol?: Input;
    description?: Input;
  } = {};

  constructor(initialData?: MaterialEntity) {
    super(".material-form");

    this.append(
      this.inputs.logo = new LogoInput({
        functionName: "upload-material-logo",
        onChange: (newLogo) => {
          this._data.logo_image_url = newLogo?.logoImageUrl;
          this._data.logo_thumbnail_url = newLogo?.logoThumbnailUrl;
          this.emit("dataChanged", this._data);
        },
      }),
      el(
        ".name-input-container",
        this.inputs.name = new Input({
          label: "Name",
          placeholder: "Enter material name",
          onChange: (newValue) => {
            this._data.name = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".symbol-input-container",
        this.inputs.symbol = new Input({
          label: "Symbol",
          placeholder: "Enter material symbol",
          onChange: (newValue) => {
            this._data.symbol = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".description-input-container",
        this.inputs.description = new Input({
          multiline: true,
          label: "Description",
          placeholder: "Enter material description",
          onChange: (newValue) => {
            this._data.description = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
    );

    this.data = initialData;
  }

  public get data(): MaterialEntity | undefined {
    return this._data;
  }

  public set data(data: MaterialEntity | undefined) {
    this._data = data ?? { game_id: -1 };

    Object.entries(this.inputs).forEach(([key, input]) => {
      const value = this._data[key as keyof MaterialEntity];
      if (input instanceof Input) {
        input.value = value as string ?? "";
      } else if (input instanceof LogoInput) {
        input.data = value as LogoData | undefined;
      }
    });
  }
}
