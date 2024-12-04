import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  InvisibleFileInput,
} from "@common-module/app-components";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";

export default class GameThumbnailInput extends DomNode<HTMLDivElement, {
  changed: (thumbnailUrl: string | undefined) => void;
}> {
  private invisibleFileInput: InvisibleFileInput;
  private thumbnailDisplay: DomNode;

  constructor(private thumbnailUrl?: string) {
    super(".game-thumbnail-input");

    this.append(
      this.invisibleFileInput = new InvisibleFileInput({
        accept: "image/*",
        onChange: (files) => {
          if (files.length > 0) this.uploadThumbnail(files[0]);
        },
      }),
      this.thumbnailDisplay = el(
        ".thumbnail-display",
        {
          style: { backgroundImage: `url(${this.thumbnailUrl})` },
          onclick: () => this.invisibleFileInput.openFileSelector(),
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

    this.thumbnailDisplay.onDom("dragenter", (event) => {
      event.preventDefault();
      this.thumbnailDisplay.addClass("drag-hover");
    });

    this.thumbnailDisplay.onDom("dragover", (event) => {
      event.preventDefault();
      this.thumbnailDisplay.addClass("drag-hover");
      event.dataTransfer!.dropEffect = "copy";
    });

    this.thumbnailDisplay.onDom("dragleave", () => {
      this.thumbnailDisplay.removeClass("drag-hover");
    });

    this.thumbnailDisplay.onDom("drop", (event) => {
      event.preventDefault();
      this.thumbnailDisplay.removeClass("drag-hover");
      if (event.dataTransfer!.files.length > 0) {
        this.uploadThumbnail(event.dataTransfer!.files[0]);
      }
    });
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
    this.thumbnailDisplay.addClass("has-thumbnail");

    loadingSpinner.remove();
  }

  private clearThumbnail() {
    this.thumbnailUrl = undefined;
    this.emit("changed", this.thumbnailUrl);
    this.thumbnailDisplay.style({ backgroundImage: "" });
    this.thumbnailDisplay.removeClass("has-thumbnail");
  }
}
