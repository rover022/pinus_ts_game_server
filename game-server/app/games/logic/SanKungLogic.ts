/**
 * ����ţţ
 */
import {Card, CardResult} from "./NiuNiuLogic";

class SanKungLogic {
    public static COMB_TYPE_NONE = 0            // 0��
    public static COMB_TYPE_OX1 = 1           // 1��
    public static COMB_TYPE_OX2 = 2           // 2��
    public static COMB_TYPE_OX3 = 3           // 3��
    public static COMB_TYPE_OX4 = 4           // 4��
    public static COMB_TYPE_OX5 = 5           // 5��
    public static COMB_TYPE_OX6 = 6           // 6��
    public static COMB_TYPE_OX7 = 7           // 7��
    public static COMB_TYPE_OX8 = 8           // 8��
    public static COMB_TYPE_OX9 = 9           // 9��
    public static COMB_TYPE_SAN_GONG = 10      // ����
    public static COMB_TYPE_SAN_TIAO = 11      // ����
    public static COMB_TYPE_BAO_SAN = 12      // ����


    //��ȡ����
    public getType(handCard: Card[]) {
        let result = new CardResult();

        //���ҳ����ĵ�����
        result.card = handCard[0]
        for (var i = 1; i < 3; i++) {
            if (handCard[i].num > result.card.num || (handCard[i].num == result.card.num && handCard[i].type > result.card.type)) {
                result.card = handCard[i]
            }
        }
        var GongNum = 0
        //���㹫����
        for (var i = 0; i < 3; i++) {
            if (handCard[i].num < 14 && handCard[i].num > 10) {
                GongNum++
            }
        }
        //����
        if (handCard[0].num == 3 && handCard[1].num == 3 && handCard[2].num == 3) {
            result.type = SanKungLogic.COMB_TYPE_BAO_SAN
            result.award = 9
            return result
        }
        //����
        if (handCard[0].num == handCard[1].num && handCard[1].num == handCard[2].num) {
            result.type = SanKungLogic.COMB_TYPE_SAN_TIAO
            result.award = 5
            return result
        }
        //����
        if (GongNum == 3) {
            result.type = SanKungLogic.COMB_TYPE_SAN_GONG
            result.award = 4
            return result
        }
        var pointNum = 0
        //��ͨ���ͣ��������
        for (var i = 0; i < 3; i++) {
            if (handCard[i].num < 10) {
                pointNum += handCard[i].num
            }
        }
        pointNum = pointNum % 10
        if (pointNum == 9) {
            result.type = SanKungLogic.COMB_TYPE_OX9
            result.award = 3
            return result
        } else if (pointNum == 8) {
            result.type = SanKungLogic.COMB_TYPE_OX8
            result.award = 2
            return result
        } else {
            result.type = pointNum
            result.award = 1
            return result
        }
    }

    /**
     * �Ա�����   ����trueΪ��һ�����Ӯ��falseΪ�ڶ������Ӯ
     * @param result1
     * @param result2
     * @returns {boolean}
     */
    public compare(result1: CardResult, result2: CardResult) {
        if (result1.type > result2.type) {
            return true
        }
        if (result1.type == result2.type && result1.card.num > result2.card.num) {
            return true
        }
        if (result1.type == result2.type && result1.card.num == result2.card.num && result1.card.type > result2.card.type) {
            return true
        }
        return false
    }


    changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean) {
        var tmpResult = new CardResult();
        tmpResult = module.exports.getType(handCard)
        if (flag == true) {
            //������
            var value = 7
            var tmpRand = Math.random()
            var times = 10
            if (tmpRand < 0.4 && tmpRand >= 0.1) {
                value = 8
                times = 20
            } else if (tmpRand < 0.1 && tmpRand >= 0.01) {
                value = 9
                times = 30
            } else if (tmpRand < 0.01) {
                value = 10
                times = 50
            }
            if (tmpResult.type < value) {
                for (var z = 0; z < 3; z++) {
                    cards[endCount++] = handCard[z].toCopy();
                }
                var randTimes = 0
                var dealFlag = false
                do {
                    randTimes++
                    dealFlag = false
                    //ϴ��
                    for (var i = 0; i < endCount; i++) {
                        var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
                        var tmpCard = cards[i]
                        cards[i] = cards[tmpIndex]
                        cards[tmpIndex] = tmpCard
                    }
                    //����
                    for (var i = 0; i < 3; i++) {
                        handCard[i] = cards[endCount - 3 + i]
                    }
                    tmpResult = module.exports.getType(handCard)
                    if (tmpResult.type < value) {
                        dealFlag = true
                    }
                } while (dealFlag && randTimes < times)
            }
        } else {
            //������
            var value = 5
            var tmpRand = Math.random()
            var times = 3
            if (tmpRand < 0.4) {
                value = 4
                times = 4
            } else if (tmpRand < 0.1) {
                value = 3
                times = 5
            }
            if (tmpResult.type > value) {
                for (var z = 0; z < 3; z++) {
                    cards[endCount++] = handCard[z].toCopy();
                }
                var randTimes = 0
                var dealFlag = false
                do {
                    randTimes++
                    dealFlag = false
                    //ϴ��
                    for (var i = 0; i < endCount; i++) {
                        var tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
                        var tmpCard = cards[i]
                        cards[i] = cards[tmpIndex]
                        cards[tmpIndex] = tmpCard
                    }
                    //����
                    for (var i = 0; i < 3; i++) {
                        handCard[i] = cards[endCount - 3 + i]
                    }
                    tmpResult = module.exports.getType(handCard)
                    if (tmpResult.type > value) {
                        dealFlag = true
                    }
                } while (dealFlag && randTimes < times)
            }
        }
    }


}
