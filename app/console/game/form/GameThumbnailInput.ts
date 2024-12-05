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

  constructor(private thumbnailUrl?: string) {
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
        onClick: () => this.clearThumbnail(),
      }),
    );
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
    this.thumbnailUrl = thumbnailImageUrl;
    this.emit("changed", this.thumbnailUrl);

    this.thumbnailDisplay.style({
      backgroundImage: `url(${thumbnailImageUrl})`,
    });
    this.addClass("has-thumbnail");

    loadingSpinner.remove();
  }

  private clearThumbnail() {
    this.thumbnailUrl = undefined;
    this.emit("changed", this.thumbnailUrl);
    this.thumbnailDisplay.style({ backgroundImage: "" });
    this.removeClass("has-thumbnail");
  }
}
