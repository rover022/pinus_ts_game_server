import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";

class SaiBaoLogic implements IBaseLogic {
    changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean): void {
    }

    compare(result1: CardResult, result2: CardResult): boolean {
        return false;
    }

    getType(handCard: Card[]): CardResult {
        return undefined;
    }


}