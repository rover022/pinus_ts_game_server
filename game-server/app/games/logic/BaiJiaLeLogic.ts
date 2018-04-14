// import * from "./NiuNiuLogic";
import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";

/**
 * ∞Ÿº“¿÷”Œœ∑¬ﬂº≠
 */
class BaiJiaLeLogic implements IBaseLogic {
    changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean): void {
    }

    compare(result1: CardResult, result2: CardResult): boolean {
        return false;
    }

    getType(handCard: Card[]): CardResult {
        return undefined;
    }

}