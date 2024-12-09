import { DomNode } from "@common-module/app";
import GameFormScreenshotListItem from "./GameFormScreenshotListItem.js";

export default class GameFormScreenshotList extends DomNode<HTMLDivElement, {
  changed: (screenshotUrls: string[]) => void;
}> {
  public children: GameFormScreenshotListItem[] = [];

  private _screenshotUrls: string[] = [];

  constructor(screenshotUrls: string[] = []) {
    super(".game-form-screenshot-list");

    this.onDom("dragover", (event) => {
      event.preventDefault();
      const draggingItem = this.children.find((child) => child.isDragging());
      if (!draggingItem) return;

      const siblings = this.children.filter((child) => child !== draggingItem);
      const mouseX = event.clientX;

      const nextSibling = siblings.find((sibling) => {
        const rect = sibling.calculateRect();
        return mouseX < rect.x + rect.width / 2;
      });

      if (nextSibling) {
        draggingItem.appendTo(this, this.children.indexOf(nextSibling));
      } else {
        draggingItem.appendTo(this);
      }

      this._screenshotUrls = this.children.map((item) => item.url);
      this.emit("changed", this._screenshotUrls);
    });

    this.screenshotUrls = screenshotUrls;
  }

  private addScreenshotItem(url: string) {
    const item = new GameFormScreenshotListItem(url);
    item.on("remove", () => {
      this._screenshotUrls = this._screenshotUrls.filter((u) => u !== url);
      this.emit("changed", this._screenshotUrls);
    });
    this.append(item);
  }

  public get screenshotUrls() {
    return this._screenshotUrls;
  }

  public set screenshotUrls(screenshotUrls: string[]) {
    this._screenshotUrls = screenshotUrls;
    this.clear();
    for (const url of screenshotUrls) {
      this.addScreenshotItem(url);
    }
    this.emit("changed", this._screenshotUrls);
  }

  public addScreenshot(url: string) {
    this._screenshotUrls.push(url);
    this.addScreenshotItem(url);
    this.emit("changed", this._screenshotUrls);
  }
}
