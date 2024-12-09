import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { GameEntity } from "gaiaprotocol";
import GameScreenshotInput from "./GameScreenshotInput.js";
import GameThumbnailInput from "./GameThumbnailInput.js";

export default class GameForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: GameEntity) => void;
}> {
  private _data!: GameEntity;

  private readonly formInputs: {
    name?: Input;
    slug?: Input;
    summary?: Input;
    description?: Input;
    thumbnail?: GameThumbnailInput;
    screenshots?: GameScreenshotInput;
    trailer?: Input;
  } = {};

  constructor(data?: GameEntity) {
    super(".game-form");

    this.append(
      el(
        ".name-input-container",
        this.formInputs.name = new Input({
          label: "Name",
          placeholder: "Enter game name",
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".slug-input-container",
        this.formInputs.slug = new Input({
          label: "Slug",
          placeholder: "Enter game slug (URL)",
          onChange: (newValue) => {
            this.data.slug = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".summary-input-container",
        this.formInputs.summary = new Input({
          label: "Summary",
          placeholder: "Enter game summary",
          onChange: (newValue) => {
            this.data.summary = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".description-input-container",
        this.formInputs.summary = new Input({
          multiline: true,
          label: "Description",
          placeholder: "Enter game description",
          onChange: (newValue) => {
            this.data.description = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".thumbnail-input-container",
        el("label", "Thumbnail"),
        this.formInputs.thumbnail = new GameThumbnailInput(),
      ),
      el(
        ".screenshot-input-container",
        el("label", "Screenshots"),
        this.formInputs.screenshots = new GameScreenshotInput(),
      ),
      el(
        ".trailer-input-container",
        this.formInputs.trailer = new Input({
          label: "Trailer",
          placeholder: "Enter game trailer URL",
          onChange: (newValue) => {
            this.data.trailer_url = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
    );

    if (data) this.data = data;
    else this.data = { name: "", slug: "", screenshots: [] };
  }

  public get data(): GameEntity {
    return this._data;
  }

  public set data(data: GameEntity) {
    this._data = data;
    Object.entries(this.formInputs).forEach(([key, input]) => {
      if (data[key as keyof GameEntity]) {
        input.value = data[key as keyof GameEntity];
      }
    });
  }
}
