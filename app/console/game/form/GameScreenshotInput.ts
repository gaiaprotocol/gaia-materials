import { DomNode, el, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  InvisibleFileInput,
} from "@common-module/app-components";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";

export default class GameScreenshotInput extends DomNode<HTMLDivElement, {
  changed: (screenshotUrls: string[]) => void;
}> {
  private invisibleFileInput: InvisibleFileInput;
  private screenshotContainer: DomNode;
  private screenshotUrls: string[] = [];

  constructor(screenshotUrls: string[] = []) {
    super(".game-screenshot-input");

    this.screenshotUrls = screenshotUrls;

    this.append(
      this.invisibleFileInput = new InvisibleFileInput({
        accept: "image/*",
        multiple: true,
        onChange: (files) => {
          if (files.length > 0) this.uploadScreenshots(files);
        },
      }),
      el(
        ".upload-area",
        {
          onclick: () => this.invisibleFileInput.openFileSelector(),
          ondragenter: (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
          },
          ondragover: (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
            event.dataTransfer!.dropEffect = "copy";
          },
          ondragleave: () => {
            this.removeClass("drag-hover");
          },
          ondrop: (event) => {
            event.preventDefault();
            this.removeClass("drag-hover");
            if (event.dataTransfer!.files.length > 0) {
              this.uploadScreenshots(event.dataTransfer!.files);
            }
          },
        },
        el(".placeholder", "Click or Drag & Drop to add screenshots"),
        new UploadIcon(),
      ),
      this.screenshotContainer = el(".screenshot-container"),
    );

    // If initial screenshots are provided, display them
    this.screenshotUrls.forEach((url) => {
      const screenshotItem = this.createScreenshotItem(url);
      this.screenshotContainer.append(screenshotItem);
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
        "upload-game-screenshot",
        formData,
      );

    return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
  }

  private async uploadScreenshots(files: FileList | File[]) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);

    const uploadPromises = Array.from(files).map(async (file) => {
      const screenshotUrl = await this.optimizeAndUploadImage(file, 1280);
      this.screenshotUrls.push(screenshotUrl);
      const screenshotItem = this.createScreenshotItem(screenshotUrl);
      this.screenshotContainer.append(screenshotItem);
    });

    await Promise.all(uploadPromises);

    this.emit("changed", this.screenshotUrls);

    loadingSpinner.remove();
  }

  private createScreenshotItem(url: string): DomNode {
    const screenshotItem: DomNode = el(
      ".screenshot-item",
      el(".screenshot-image", {
        style: { backgroundImage: `url(${url})` },
      }),
      new Button(".remove", {
        type: ButtonType.Circle,
        icon: new DeleteIcon(),
        onClick: () => this.removeScreenshot(url, screenshotItem),
      }),
    );
    return screenshotItem;
  }

  private removeScreenshot(url: string, screenshotItem: DomNode) {
    this.screenshotUrls = this.screenshotUrls.filter((u) => u !== url);
    screenshotItem.remove();
    this.emit("changed", this.screenshotUrls);
  }
}
