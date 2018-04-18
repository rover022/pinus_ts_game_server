import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";

/**
 * 轮盘游戏
 */
class LunPanLogic implements IBaseLogic {


    compare(result1: CardResult, result2: CardResult): boolean {
        return false;
    }



    changeHandCard(handCard: CardResult, cards: Card[], endCount: number, flag: boolean): void {
    }

    getType(handCard: CardResult): CardResult {
        return undefined;
    }

}