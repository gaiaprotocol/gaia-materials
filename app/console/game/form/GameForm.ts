import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { GameEntity } from "gaiaprotocol";
import GameScreenshotInput from "./GameScreenshotInput.js";
import GameThumbnailInput from "./GameThumbnailInput.js";

export default class GameForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: GameEntity) => void;
}> {
  private _data!: GameEntity;

  private readonly inputs: {
    name?: Input;
    slug?: Input;
    summary?: Input;
    description?: Input;
    thumbnail?: GameThumbnailInput;
    screenshots?: GameScreenshotInput;
    trailer?: Input;
  } = {};

  constructor(initialData?: GameEntity) {
    super(".game-form");

    this.append(
      el(
        ".name-input-container",
        this.inputs.name = new Input({
          label: "Name",
          placeholder: "Enter game name",
          onChange: (newValue) => {
            this._data.name = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".slug-input-container",
        this.inputs.slug = new Input({
          label: "Slug",
          placeholder: "Enter game slug (URL)",
          onChange: (newValue) => {
            this._data.slug = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".summary-input-container",
        this.inputs.summary = new Input({
          label: "Summary",
          placeholder: "Enter game summary",
          onChange: (newValue) => {
            this._data.summary = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".description-input-container",
        this.inputs.summary = new Input({
          multiline: true,
          label: "Description",
          placeholder: "Enter game description",
          onChange: (newValue) => {
            this._data.description = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".thumbnail-input-container",
        el("label", "Thumbnail"),
        this.inputs.thumbnail = new GameThumbnailInput({
          onChange: (newValue) => {
            this._data.thumbnail_url = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".screenshot-input-container",
        el("label", "Screenshots"),
        this.inputs.screenshots = new GameScreenshotInput({
          onChange: (newValue) => {
            this._data.screenshots = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
      el(
        ".trailer-input-container",
        this.inputs.trailer = new Input({
          label: "Trailer",
          placeholder: "Enter game trailer URL",
          onChange: (newValue) => {
            this._data.trailer_url = newValue;
            this.emit("dataChanged", this._data);
          },
        }),
      ),
    );

    this.data = initialData;
  }

  public get data(): GameEntity | undefined {
    return this._data;
  }

  public set data(data: GameEntity | undefined) {
    this._data = data ?? { name: "", slug: "", screenshots: [] };

    Object.entries(this.inputs).forEach(([key, input]) => {
      const value = this._data[key as keyof GameEntity];
      if (input instanceof Input) {
        input.value = value as string ?? "";
      } else if (input instanceof GameThumbnailInput) {
        input.thumbnailUrl = value as string | undefined;
      } else if (input instanceof GameScreenshotInput) {
        input.screenshotUrls = value as string[];
      }
    });
  }
}
