import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";
import {log} from "util";

/**
 * 炸金花
 */
export class ZhaJinHuaLogic implements IBaseLogic{
    public static COMB_TYPE_DAN = 0;        // 单张
    public static COMB_TYPE_DUI = 1;        // 对子
    public static COMB_TYPE_SHUN = 2;        // 顺子
    public static COMB_TYPE_JINHUA = 3;        // 金花
    public static COMB_TYPE_JINHUASHUN = 4;       // 金花顺
    public static COMB_TYPE_BAOZI = 5;   // 豹子
    public CARD_VALUE: { [key: string]: number } = {
        "1": 14,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "11": 11,
        "12": 12,
        "13": 13
    };

    //获取牌型
    public getType(_result: CardResult): CardResult {
        let result = _result;
        let handCard = result.cards.copyWithin(0, 0);
        //同花标志
        let tongHuaFlag = false;

        if (handCard[0].type == handCard[1].type && handCard[1].type == handCard[2].type) {
            tongHuaFlag = true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //排序
        for (let i = 0; i < 3 - 1; i++) {
            for (let j = i + 1; j < 3; j++) {
                if (CARD_VALUE[handCard[i].num] > CARD_VALUE[handCard[j].num] || (CARD_VALUE[handCard[i].num] == CARD_VALUE[handCard[j].num] && handCard[i].type > handCard[j].type)) {
                    let tmpCard = handCard[i].toCopy();
                    handCard[i] = handCard[j].toCopy();
                    handCard[j] = tmpCard
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            result.cards[i] = handCard[i].toCopy();
        }
        //顺子标志
        let shunFlag = false;
        if (CARD_VALUE[handCard[0].num] == CARD_VALUE[handCard[1].num] - 1 && CARD_VALUE[handCard[1].num] == CARD_VALUE[handCard[2].num] - 1) {
            shunFlag = true
        }
        //豹子
        if (handCard[0].num == handCard[1].num && handCard[1].num == handCard[2].num) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_BAOZI;
            return result
        }
        //金花顺
        if (tongHuaFlag && shunFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_JINHUASHUN;
            return result
        }
        //金花
        if (tongHuaFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_JINHUA;
            return result
        }
        //顺子
        if (shunFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_SHUN;
            return result
        }
        //对子
        if (handCard[0].num == handCard[1].num) {
            result.duiCard = handCard[0];
            result.singleCard = handCard[2];
            result.type = ZhaJinHuaLogic.COMB_TYPE_DUI;
            return result
        }
        if (handCard[1].num == handCard[2].num) {
            result.duiCard = handCard[1];
            result.singleCard = handCard[0];
            result.type = ZhaJinHuaLogic.COMB_TYPE_DUI;
            return result
        }
        if (handCard[0].num == handCard[2].num) {
            result.duiCard = handCard[2];
            result.singleCard = handCard[1];
            result.type = ZhaJinHuaLogic.COMB_TYPE_DUI;
            return result
        }
        result.type = ZhaJinHuaLogic.COMB_TYPE_DAN;
        return result;
    }


    /**
     * 对比手牌   返回true为第一个玩家赢，false为第二个玩家赢
     * @param result1
     * @param result2
     * @returns {boolean}
     */
    public compare(result1: CardResult, result2: CardResult) {
        //花色不同235大于豹子
        if (result1.type == ZhaJinHuaLogic.COMB_TYPE_BAOZI) {
            if (result2.type == ZhaJinHuaLogic.COMB_TYPE_DAN && result2.cards[0].num == 2 && result2.cards[1].num == 3 && result2.cards[2].num == 5) {
                return false
            }
        }
        if (result2.type == ZhaJinHuaLogic.COMB_TYPE_BAOZI) {
            if (result1.type == ZhaJinHuaLogic.COMB_TYPE_DAN && result1.cards[0].num == 2 && result1.cards[1].num == 3 && result1.cards[2].num == 5) {
                return true
            }
        }
        //先判断牌型
        if (result1.type > result2.type) {
            return true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //牌型相同  对子先比较对子牌  再比较单牌   其他牌型比较单牌
        if (result1.type == result2.type) {
            if (result1.type == ZhaJinHuaLogic.COMB_TYPE_DUI) {
                if (CARD_VALUE[result1.duiCard.num] > CARD_VALUE[result2.duiCard.num]
                    || (CARD_VALUE[result1.duiCard.num] == CARD_VALUE[result2.duiCard.num]
                        && CARD_VALUE[result1.singleCard.num] > CARD_VALUE[result2.singleCard.num])) {
                    return true
                }
            } else {
                for (let i = 2; i >= 0; i--) {
                    if (CARD_VALUE[result1.cards[i].num] > CARD_VALUE[result2.cards[i].num]) {
                        return true
                    }
                    if (CARD_VALUE[result1.cards[i].num] < CARD_VALUE[result2.cards[i].num]) {
                        return false
                    }
                }
            }
        }
        return false
    }


//换牌
    public changeHandCard(handCard: CardResult, cards: Card[], endCount: number, flag: boolean) {

    }
}


