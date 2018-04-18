import {Card, CardResult, IBaseLogic} from "./NiuNiuLogic";


class FengKuangLogic implements IBaseLogic {
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
    public static COMB_TYPE_DAN = 0            // 单张
    public static COMB_TYPE_DUI = 1            // 对子
    public static COMB_TYPE_SHUN = 2            // 顺子
    public static COMB_TYPE_JINHUA = 3            // 金花
    public static COMB_TYPE_JINHUASHUN = 4            // 金花顺
    public static COMB_TYPE_BAOZI = 5            // 豹子


    public getType(cards: CardResult) {
        let result = new CardResult();
        let handCard = cards.cards.copyWithin(0, 0);
        //同花标志
        var tongHuaFlag = false

        if (handCard[0].type == handCard[1].type && handCard[1].type == handCard[2].type) {
            tongHuaFlag = true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //排序
        for (var i = 0; i < 3 - 1; i++) {
            for (var j = i + 1; j < 3; j++) {
                if (CARD_VALUE[handCard[i].num] > CARD_VALUE[handCard[j].num] || (CARD_VALUE[handCard[i].num] == CARD_VALUE[handCard[j].num] && handCard[i].type > handCard[j].type)) {
                    var tmpCard = handCard[i].toCopy();
                    handCard[i] = handCard[j].toCopy();
                    handCard[j] = tmpCard
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            result["cards"][i] = handCard[i].toCopy();
        }
        //顺子标志
        var shunFlag = false
        if (CARD_VALUE[handCard[0].num] == CARD_VALUE[handCard[1].num] - 1 && CARD_VALUE[handCard[1].num] == CARD_VALUE[handCard[2].num] - 1) {
            shunFlag = true
        }
        //豹子
        if (handCard[0].num == handCard[1].num && handCard[1].num == handCard[2].num) {
            result.type = FengKuangLogic.COMB_TYPE_BAOZI
            return result
        }
        //金花顺
        if (tongHuaFlag && shunFlag) {
            result.type = FengKuangLogic.COMB_TYPE_JINHUASHUN
            return result
        }
        //金花
        if (tongHuaFlag) {
            result.type = FengKuangLogic.COMB_TYPE_JINHUA
            return result
        }
        //顺子
        if (shunFlag) {
            result.type = FengKuangLogic.COMB_TYPE_SHUN
            return result
        }
        //对子
        if (handCard[0].num == handCard[1].num) {
            result.duiCard = handCard[0]
            result.singleCard = handCard[2]
            result.type = FengKuangLogic.COMB_TYPE_DUI
            return result
        }
        if (handCard[1].num == handCard[2].num) {
            result.duiCard = handCard[1]
            result.singleCard = handCard[0]
            result.type = FengKuangLogic.COMB_TYPE_DUI
            return result
        }
        if (handCard[0].num == handCard[2].num) {
            result.duiCard = handCard[2]
            result.singleCard = handCard[1]
            result.type = FengKuangLogic.COMB_TYPE_DUI
            return result
        }
        result.type = FengKuangLogic.COMB_TYPE_DAN
        return result
    }


    /**
     * 对比手牌   返回true为第一个玩家赢，false为第二个玩家赢
     * @param result1
     * @param result2
     * @returns {boolean}
     */
    compare(result1: CardResult, result2: CardResult) {
        //花色不同235大于豹子
        if (result1.type == FengKuangLogic.COMB_TYPE_BAOZI) {
            if (result2.type == FengKuangLogic.COMB_TYPE_DAN && result2.cards[0].num == 2 && result2.cards[1].num == 3 && result2.cards[2].num == 5) {
                return false
            }
        }
        if (result2.type == FengKuangLogic.COMB_TYPE_BAOZI) {
            if (result1.type == FengKuangLogic.COMB_TYPE_DAN && result1.cards[0].num == 2 && result1.cards[1].num == 3 && result1.cards[2].num == 5) {
                return true
            }
        }
        //先判断牌型
        if (result1.type > result2.type) {
            return true
        }
        //牌型相同  对子先比较对子牌  再比较单牌   其他牌型比较单牌
        let CARD_VALUE = this.CARD_VALUE;
        if (result1.type == result2.type) {
            if (result1.type == FengKuangLogic.COMB_TYPE_DUI) {
                if (CARD_VALUE[result1.duiCard.num] > CARD_VALUE[result2.duiCard.num]
                    || (CARD_VALUE[result1.duiCard.num] == CARD_VALUE[result2.duiCard.num]
                        && CARD_VALUE[result1.singleCard.num] > CARD_VALUE[result2.singleCard.num])) {
                    return true
                }
            } else {
                for (var i = 2; i >= 0; i--) {
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


    changeHandCard(handCard: CardResult, cards: Card[], endCount: number, flag: boolean) {
        // var tmpResult = {}
        // tmpResult = module.exports.getType(handCard)
        // if(flag == true){
        //   //换好牌
        //   var value = 6
        //   var tmpRand = Math.random()
        //   var times = 5
        //   if(tmpRand < 0.4){
        //     value = 7
        //     times = 10
        //   }else if(tmpRand < 0.1){
        //     value = 8
        //     times = 20
        //   }
        //   if(tmpResult.type < value){
        //     for(var z = 0;z < 3;z++){
        //       cards[endCount++] = deepCopy(handCard[z])
        //     }
        //     var randTimes = 0
        //     var dealFlag = false
        //     do{
        //       randTimes++
        //       dealFlag = false
        //       //洗牌
        //       for(var i = 0;i < endCount;i++){
        //         var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
        //         var tmpCard = cards[i]
        //         cards[i] = cards[tmpIndex]
        //         cards[tmpIndex] = tmpCard
        //       }
        //       //发牌
        //       for(var i = 0; i < 3; i++){
        //         handCard[i] = cards[endCount - 3 + i]
        //       }
        //       tmpResult = module.exports.getType(handCard)
        //       if(tmpResult.type < value){
        //         dealFlag = true
        //       }
        //     }while(dealFlag && randTimes < times)
        //   }
        // }else{
        //   //换差牌
        //   var value = 5
        //   var tmpRand = Math.random()
        //   var times = 3
        //   if(tmpRand < 0.4){
        //     value = 4
        //     times = 4
        //   }else if(tmpRand < 0.1){
        //     value = 3
        //     times = 5
        //   }
        //   if(tmpResult.type > value){
        //     for(var z = 0;z < 5;z++){
        //       cards[endCount++] = deepCopy(handCard[z])
        //     }
        //     var randTimes = 0
        //     var dealFlag = false
        //     do{
        //       randTimes++
        //       dealFlag = false
        //       //洗牌
        //       for(var i = 0;i < endCount;i++){
        //         var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
        //         var tmpCard = cards[i]
        //         cards[i] = cards[tmpIndex]
        //         cards[tmpIndex] = tmpCard
        //       }
        //       //发牌
        //       for(var i = 0; i < 5; i++){
        //         handCard[i] = cards[endCount - 5 + i]
        //       }
        //       tmpResult = module.exports.getType(handCard)
        //       if(tmpResult.type > value){
        //         dealFlag = true
        //       }
        //     }while(dealFlag && randTimes < times)
        //   }
        // }
    }

}

