import {Card, CardResult} from "./NiuNiuLogic";


class FengKuangLogic {
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
    }
    public static COMB_TYPE_DAN = 0            // ����
    public static COMB_TYPE_DUI = 1            // ����
    public static COMB_TYPE_SHUN = 2            // ˳��
    public static COMB_TYPE_JINHUA = 3            // ��
    public static COMB_TYPE_JINHUASHUN = 4            // ��˳
    public static COMB_TYPE_BAOZI = 5            // ����


    public getType(cards: Card[]) {
        let result = new CardResult();
        let handCard = cards.copyWithin(0, 0);
        //ͬ����־
        var tongHuaFlag = false

        if (handCard[0].type == handCard[1].type && handCard[1].type == handCard[2].type) {
            tongHuaFlag = true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //����
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
        //˳�ӱ�־
        var shunFlag = false
        if (CARD_VALUE[handCard[0].num] == CARD_VALUE[handCard[1].num] - 1 && CARD_VALUE[handCard[1].num] == CARD_VALUE[handCard[2].num] - 1) {
            shunFlag = true
        }
        //����
        if (handCard[0].num == handCard[1].num && handCard[1].num == handCard[2].num) {
            result.type = FengKuangLogic.COMB_TYPE_BAOZI
            return result
        }
        //��˳
        if (tongHuaFlag && shunFlag) {
            result.type = FengKuangLogic.COMB_TYPE_JINHUASHUN
            return result
        }
        //��
        if (tongHuaFlag) {
            result.type = FengKuangLogic.COMB_TYPE_JINHUA
            return result
        }
        //˳��
        if (shunFlag) {
            result.type = FengKuangLogic.COMB_TYPE_SHUN
            return result
        }
        //����
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
     * �Ա�����   ����trueΪ��һ�����Ӯ��falseΪ�ڶ������Ӯ
     * @param result1
     * @param result2
     * @returns {boolean}
     */
    compare(result1: CardResult, result2: CardResult) {
        //��ɫ��ͬ235���ڱ���
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
        //���ж�����
        if (result1.type > result2.type) {
            return true
        }
        //������ͬ  �����ȱȽ϶�����  �ٱȽϵ���   �������ͱȽϵ���
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


    changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean) {
        // var tmpResult = {}
        // tmpResult = module.exports.getType(handCard)
        // if(flag == true){
        //   //������
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
        //       //ϴ��
        //       for(var i = 0;i < endCount;i++){
        //         var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
        //         var tmpCard = cards[i]
        //         cards[i] = cards[tmpIndex]
        //         cards[tmpIndex] = tmpCard
        //       }
        //       //����
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
        //   //������
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
        //       //ϴ��
        //       for(var i = 0;i < endCount;i++){
        //         var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
        //         var tmpCard = cards[i]
        //         cards[i] = cards[tmpIndex]
        //         cards[tmpIndex] = tmpCard
        //       }
        //       //����
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

