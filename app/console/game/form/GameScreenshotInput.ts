import { DomNode, el, ImageOptimizer } from "@common-module/app";
import { AppCompConfig, FileDropzone } from "@common-module/app-components";
import { UploadIcon } from "@gaiaprotocol/svg-icons";
import { GaiaProtocolConfig } from "gaiaprotocol";
import GameFormScreenshotList from "./GameFormScreenshotList.js";

interface GameScreenshotInputOptions {
  onChange: (value: string[]) => void;
}

export default class GameScreenshotInput extends DomNode<HTMLDivElement, {
  urlsChanged: (value: string[]) => void;
}> {
  private uploadArea: FileDropzone;
  private screenshotList: GameFormScreenshotList;

  constructor(
    options: GameScreenshotInputOptions,
    initialValue: string[] = [],
  ) {
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
      el(
        ".screenshot-container",
        this.screenshotList = new GameFormScreenshotList(),
      ),
    );

    this.screenshotList.on(
      "urlsChanged",
      (urls) => {
        options.onChange(urls);
        this.emit("urlsChanged", urls);
      },
    );

    this.screenshotUrls = initialValue;
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
      this.screenshotList.add(screenshotUrl);
    });

    await Promise.all(uploadPromises);
    loadingSpinner.remove();
  }

  public get screenshotUrls(): string[] {
    return this.screenshotList.urls;
  }

  public set screenshotUrls(urls: string[]) {
    this.screenshotList.urls = urls;
  }
}
