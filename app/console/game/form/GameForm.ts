import { DomNode, el } from "@common-module/app";
import { Input } from "@common-module/app-components";
import { GameEntity } from "gaiaprotocol";
import GameScreenshotInput from "./GameScreenshotInput.js";
import GameThumbnailInput from "./GameThumbnailInput.js";

export default class GameForm extends DomNode<HTMLDivElement, {
  dataChanged: (data: GameEntity) => void;
}> {
  private data: GameEntity;

  constructor(data?: GameEntity) {
    super(".game-form");

    if (data) this.data = data;
    else {
      this.data = {
        id: -1,
        name: "",
        slug: "",
        is_public: false,
        screenshots: [],
        created_at: new Date().toISOString(),
      };
    }

    this.append(
      el(
        ".name-input-container",
        new Input({
          label: "Name",
          placeholder: "Enter game name",
          value: this.data.name,
          onChange: (newValue) => {
            this.data.name = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".summary-input-container",
        new Input({
          label: "Summary",
          placeholder: "Enter game summary",
          value: this.data.summary,
          onChange: (newValue) => {
            this.data.summary = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".description-input-container",
        new Input({
          label: "Description",
          placeholder: "Enter game description",
          value: this.data.description,
          onChange: (newValue) => {
            this.data.description = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
      el(
        ".thumbnail-input-container",
        el("label", "Thumbnail"),
        new GameThumbnailInput(this.data.thumbnail_url),
      ),
      el(
        ".screenshot-input-container",
        el("label", "Screenshots"),
        new GameScreenshotInput(this.data.screenshots),
      ),
      el(
        ".trailer-input-container",
        new Input({
          label: "Trailer",
          placeholder: "Enter game trailer URL",
          value: this.data.trailer_url,
          onChange: (newValue) => {
            this.data.trailer_url = newValue;
            this.emit("dataChanged", this.data);
          },
        }),
      ),
    );
  }
}
