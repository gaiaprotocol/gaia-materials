import { BodyNode, el, View } from "@common-module/app";
import { GameMaterialService, GameService } from "gaiaprotocol";

type DT = { id: string };

export default class GameInfoView extends View<DT> {
  constructor() {
    super();
    this.container = el(".game-info-view").appendTo(BodyNode);
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

    //TEST
    //await GameMaterialService.addMaterial(id, "base-sepolia", "0x1bBB115A431E4C61e318E0f7aDA92d2BbBD424eE");
  }
}
