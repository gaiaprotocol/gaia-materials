import { DomNode } from "@common-module/app";
import GameFormScreenshotListItem from "./GameFormScreenshotListItem.js";

export default class GameFormScreenshotList extends DomNode<HTMLDivElement, {
  urlsChanged: (screenshotUrls: string[]) => void;
}> {
  public children: GameFormScreenshotListItem[] = [];
  private _urls: string[] = [];

  constructor(initialUrls: string[] = []) {
    super(".game-form-screenshot-list");
    this.onDom("dragover", (event) => this.handleItemDrop(event));
    this.urls = initialUrls;
  }

  private handleItemDrop(event: DragEvent) {
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

    this._urls = this.children.map((item) => item.url);
    this.emit("urlsChanged", this._urls);
  }

  private addItem(url: string) {
    const item = new GameFormScreenshotListItem(url);
    item.on("remove", () => {
      this._urls = this._urls.filter((u) => u !== url);
      this.emit("urlsChanged", this._urls);
    });
    this.append(item);
  }

  public get urls() {
    return this._urls;
  }

  public set urls(urls: string[]) {
    this._urls = urls;
    this.clear();
    for (const url of urls) {
      this.addItem(url);
    }
    this.emit("urlsChanged", this._urls);
  }

  public add(url: string) {
    this._urls.push(url);
    this.addItem(url);
    this.emit("urlsChanged", this._urls);
  }
}
