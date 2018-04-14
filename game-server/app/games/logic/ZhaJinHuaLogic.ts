import {Card, CardResult} from "./NiuNiuLogic";

/**
 * ը��
 */
export class ZhaJinHuaLogic {
    public static COMB_TYPE_DAN = 0;        // ����
    public static COMB_TYPE_DUI = 1;        // ����
    public static COMB_TYPE_SHUN = 2;        // ˳��
    public static COMB_TYPE_JINHUA = 3;        // ��
    public static COMB_TYPE_JINHUASHUN = 4;       // ��˳
    public static COMB_TYPE_BAOZI = 5;   // ����
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

    //��ȡ����
    public getType(cards: Card[]) {
        let result = new CardResult();

        let handCard = cards.copyWithin(0, 0);
        //ͬ����־
        let tongHuaFlag = false;

        if (handCard[0].type == handCard[1].type && handCard[1].type == handCard[2].type) {
            tongHuaFlag = true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //����
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
        //˳�ӱ�־
        let shunFlag = false;
        if (CARD_VALUE[handCard[0].num] == CARD_VALUE[handCard[1].num] - 1 && CARD_VALUE[handCard[1].num] == CARD_VALUE[handCard[2].num] - 1) {
            shunFlag = true
        }
        //����
        if (handCard[0].num == handCard[1].num && handCard[1].num == handCard[2].num) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_BAOZI;
            return result
        }
        //��˳
        if (tongHuaFlag && shunFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_JINHUASHUN;
            return result
        }
        //��
        if (tongHuaFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_JINHUA;
            return result
        }
        //˳��
        if (shunFlag) {
            result.type = ZhaJinHuaLogic.COMB_TYPE_SHUN;
            return result
        }
        //����
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
        return result
    }


    /**
     * �Ա�����   ����trueΪ��һ�����Ӯ��falseΪ�ڶ������Ӯ
     * @param result1
     * @param result2
     * @returns {boolean}
     */
    public compare(result1: CardResult, result2: CardResult) {
        //��ɫ��ͬ235���ڱ���
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
        //���ж�����
        if (result1.type > result2.type) {
            return true
        }
        let CARD_VALUE = this.CARD_VALUE;
        //������ͬ  �����ȱȽ϶�����  �ٱȽϵ���   �������ͱȽϵ���
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


//����
    public changeHandCard(handCard: CardResult, cards: CardResult, endCount: number, flag: boolean) {

    }
}


