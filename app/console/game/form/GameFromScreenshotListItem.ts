import { DomNode, el } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { DeleteIcon } from "@gaiaprotocol/svg-icons";

export default class GameScreenshotListItem extends DomNode {
  private _dragging = false;

  public isDragging() {
    return this._dragging;
  }

  constructor(public url: string) {
    super(".screenshot-item");
    this.htmlElement.draggable = true;

    this.append(
      el(".screenshot-image", {
        style: { backgroundImage: `url(${url})` },
      }),
      new Button(".remove", {
        type: ButtonType.Circle,
        icon: new DeleteIcon(),
        onClick: () => this.remove(),
      }),
    );

    this.onDom("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", url);
      this.addClass("dragging");
      this._dragging = true;
    });

    this.onDom("dragend", () => {
      this.removeClass("dragging");
      this._dragging = false;
    });
  }
}
