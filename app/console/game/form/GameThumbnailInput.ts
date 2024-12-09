import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  FileDropzone,
} from "@common-module/app-components";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";

export default class GameThumbnailInput extends DomNode<HTMLDivElement, {
  changed: (thumbnailUrl: string | undefined) => void;
}> {
  private thumbnailDisplay: FileDropzone;
  private _value?: string;

  constructor(thumbnailUrl?: string) {
    super(".game-thumbnail-input");

    this.append(
      this.thumbnailDisplay = new FileDropzone(
        ".thumbnail-display",
        {
          accept: "image/*",
          onUpload: (files) => this.uploadThumbnail(files[0]),
        },
        el(".placeholder", "Click or Drag & Drop to upload thumbnail"),
        new UploadIcon(),
      ),
      new Button(".clear", {
        type: ButtonType.Circle,
        icon: new DeleteIcon(),
        onClick: () => this.value = undefined,
      }),
    );

    this.value = thumbnailUrl;
  }

  private async optimizeAndUploadImage(file: File, maxSize: number) {
    const optimized = await ImageOptimizer.optimizeImage(
      file,
      maxSize,
      maxSize,
    );

    const formData = new FormData();
    formData.append("file", optimized);

    const filePath = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction(
        "upload-game-thumbnail",
        formData,
      );

    return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
  }

  private async uploadThumbnail(file: File) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);

    const thumbnailImageUrl = await this.optimizeAndUploadImage(file, 720);
    this.value = thumbnailImageUrl;

    loadingSpinner.remove();
  }

  public get value(): string | undefined {
    return this._value;
  }

  public set value(thumbnailUrl: string | undefined) {
    this._value = thumbnailUrl;

    if (thumbnailUrl) {
      this.thumbnailDisplay.style({
        backgroundImage: `url(${thumbnailUrl})`,
      });
      this.addClass("has-thumbnail");
    } else {
      this.thumbnailDisplay.style({ backgroundImage: "" });
      this.removeClass("has-thumbnail");
    }
  }
}
