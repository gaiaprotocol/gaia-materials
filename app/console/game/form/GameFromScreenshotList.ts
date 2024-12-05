import { DomNode } from "@common-module/app";
import GameScreenshotListItem from "./GameFromScreenshotListItem.js";

export default class GameScreenshotList extends DomNode<HTMLDivElement, {
  changed: (screenshotUrls: string[]) => void;
}> {
  public children: GameScreenshotListItem[] = [];

  private screenshotUrls: string[] = [];

  constructor(screenshotUrls: string[] = []) {
    super(".screenshot-container");
    this.screenshotUrls = screenshotUrls;

    this.screenshotUrls.forEach((url) => {
      this.addScreenshotItem(url);
    });

    this.onDom("dragover", (event) => {
      event.preventDefault();
      const draggingItem = this.children.find((child) => child.isDragging());
      if (!draggingItem) return;

      const siblings = this.children.filter((child) => child !== draggingItem);

      const nextSibling = siblings.find((sibling) => {
        const rect = sibling.calculateRect();
        const offset = (rect.x + rect.width / 2) - event.clientX;
        return offset > 0;
      });

      if (nextSibling) {
        draggingItem.appendTo(this, this.children.indexOf(nextSibling));
      } else {
        draggingItem.appendTo(this);
      }

      this.updateScreenshotUrls();
    });
  }

  public addScreenshotItem(url: string) {
    const item = new GameScreenshotListItem(url);
    item.on("remove", () => {
      this.screenshotUrls = this.screenshotUrls.filter((u) => u !== url);
      this.emit("changed", this.screenshotUrls);
    });
    this.append(item);
  }

  private updateScreenshotUrls() {
    this.screenshotUrls = this.children.map((item) => item.url);
    this.emit("changed", this.screenshotUrls);
  }

  public getScreenshotUrls() {
    return this.screenshotUrls;
  }
}
