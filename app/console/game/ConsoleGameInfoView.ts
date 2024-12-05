import { el, View } from "@common-module/app";
import { GameRepository } from "gaiaprotocol";
import ConsoleLayout from "../ConsoleLayout.js";

export default class ConsoleGameInfoView extends View {
  constructor() {
    super();
    ConsoleLayout.content = this.container = el(
      ".console-game-info-view",
    );
  }

  public async changeData(data: { slug: string }) {
    const game = await GameRepository.fetchBySlug(data.slug);
    this.container.append(JSON.stringify(game, null, 2));
  }
}
