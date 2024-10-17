import { BodyNode, DomNode, el, View } from "@common-module/app";
import { Button } from "@common-module/app-components";
import { GameMaterialService, GameService } from "gaiaprotocol";

type DT = { id: string };

export default class GameInfoView extends View<DT> {
  private gameInfoDisplay: DomNode;
  private materialsDisplay: DomNode;

  constructor() {
    super();
    this.container = el(
      ".game-info-view",
      this.gameInfoDisplay = el(".game-info-display"),
      this.materialsDisplay = el(".materials-display"),
    ).appendTo(BodyNode);
  }

  public changeData(data: DT): void {
    this.loadGameInfo(data.id);
    this.loadGameMaterials(data.id);
  }

  private async loadGameInfo(id: string) {
    const gameInfo = await GameService.fetchGame(id);
    console.log(gameInfo);
  }

  private async loadGameMaterials(id: string) {
    const data = await GameMaterialService.fetchAllMaterials(id);
    console.log(data);

    this.materialsDisplay.empty();

    this.materialsDisplay.append(
      new Button({
        title: "Add Material",
        onClick: () => {
          //TODO:
        },
      }),
    );
  }
}
