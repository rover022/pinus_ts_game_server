// import * from "./NiuNiuLogic";
import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";

/**
 * 百家乐游戏逻辑
 */
class BaiJiaLeLogic implements IBaseLogic {

    compare(result1: CardResult, result2: CardResult): boolean {
        return false;
    }



    changeHandCard(handCard: CardResult, cards: Card[], endCount: number, flag: boolean): void {
    }

    getType(handCard: CardResult): CardResult {
        return undefined;
    }

}