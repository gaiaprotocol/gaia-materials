import { DomNode, el, ImageOptimizer } from "@common-module/app";
import { AppCompConfig, FileDropzone } from "@common-module/app-components";
import { UploadIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";
import GameFormScreenshotList from "./GameFormScreenshotList.js";

export default class GameScreenshotInput extends DomNode<HTMLDivElement, {
  changed: (screenshotUrls: string[]) => void;
}> {
  private uploadArea: FileDropzone;
  private screenshotList: GameFormScreenshotList;

  constructor(screenshotUrls: string[] = []) {
    super(".game-screenshot-input");

    this.append(
      this.uploadArea = new FileDropzone(
        ".upload-area",
        {
          accept: "image/*",
          multiple: true,
          onUpload: (files) => this.uploadScreenshots(files),
        },
        el(".placeholder", "Click or Drag & Drop to add screenshots"),
        new UploadIcon(),
      ),
      this.screenshotList = new GameFormScreenshotList(screenshotUrls),
    );

    this.screenshotList.on("changed", (urls) => this.emit("changed", urls));
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
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(
      this.uploadArea,
    );

    const uploadPromises = Array.from(files).map(async (file) => {
      const screenshotUrl = await this.optimizeAndUploadImage(file, 1280);
      this.screenshotList.addScreenshotItem(screenshotUrl);
    });

    await Promise.all(uploadPromises);
    loadingSpinner.remove();
  }
}
