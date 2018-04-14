/**
 * ����
 */
export class Card {
    public num: number
    public type: number

    toCopy(): Card {
        let a = new Card();
        a.num = this.num;
        a.type = this.type;
        return a;
    }
}

/**
 * ���ƽ��
 */
export class CardResult {
    public type: number = 0;
    public card: Card;
    public award: number = 1;
    public Comb: any;
    public cards: Card[];
    public duiCard: Card;
    public singleCard: Card;
}

export interface IBaseLogic {
    getType(handCard: Card[]): CardResult;

    compare(result1: CardResult, result2: CardResult): boolean;

    changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean): void;
}

/**
 * ţţ
 */
export class NiuNiuLogic implements IBaseLogic {
    public static COMB_TYPE_NONE: number = 0;         // ţ��
    public static COMB_TYPE_OX1: number = 1;       // ţ1
    public static COMB_TYPE_OX2: number = 2;        // ţ2
    public static COMB_TYPE_OX3: number = 3;       // ţ3
    public static COMB_TYPE_OX4: number = 4;       // ţ4
    public static COMB_TYPE_OX5: number = 5;      // ţ5
    public static COMB_TYPE_OX6: number = 6;      // ţ6
    public static COMB_TYPE_OX7: number = 7;     // ţ7
    public static COMB_TYPE_OX8: number = 8;    // ţ8   x2
    public static COMB_TYPE_OX9: number = 9;    // ţ9   x3
    public static COMB_TYPE_OX10: number = 10;  // ţţ  x4
    public static COMB_TYPE_YIN_DELUX: number = 11;   // ����ţx5
    public static COMB_TYPE_JIN_DELUX: number = 12;   // ��ţx6
    public static COMB_TYPE_BOMB: number = 13;    // ը��  x7
    public static COMB_TYPE_MICRO: number = 14;     // ��С  x8

    public getType(handCard: Card[]): CardResult {
        //type ��������  0:��;  1 : ţţ; : 2 : �廨; 3 : ��С;4 : ը��;
        let result = new CardResult();
        //���ҳ����ĵ�����
        result.card = handCard[0];
        for (let i = 1; i < 5; i++) {
            if (handCard[i].num > result.card.num || (handCard[i].num == result.card.num && handCard[i].type > result.card.type)) {
                result.card = handCard[i]
            }
        }
        //��Сţ
        if ((handCard[0].num + handCard[1].num + handCard[2].num + handCard[3].num + handCard[4].num) <= 10) {
            result.type = NiuNiuLogic.COMB_TYPE_MICRO;
            result.award = 8;
            return result
        }

        //ը��
        let count = 0;
        for (let i = 0; i < 5; i++) {
            count = 1
            for (let j = 0; j < 5; j++) {
                if (i != j && handCard[i].num === handCard[j].num) {
                    count++
                }
            }
            if (count === 4) {
                result.type = NiuNiuLogic.COMB_TYPE_BOMB
                result.card = handCard[i];
                result.award = 7;
                return result
            }
        }
        //����ţ
        let flag = true
        let yinniuCount = 0
        for (let i = 0; i < 5; i++) {
            if (handCard[i].num < 10) {
                flag = false
                break
            } else if (handCard[i].num === 10) {
                yinniuCount++
            }
        }
        if (flag === true && yinniuCount === 1) {
            result.type = NiuNiuLogic.COMB_TYPE_YIN_DELUX
            result.award = 5;
            return result
        }
        //�廨ţ
        flag = true;
        for (let i = 0; i < 5; i++) {
            if (handCard[i].num < 11) {
                flag = false
            }
        }
        if (flag === true) {
            result.type = NiuNiuLogic.COMB_TYPE_JIN_DELUX
            result.award = 6
            return result
        }
        let __card_val = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10]
        let allComb = [
            [0, 1, 2, 3, 4],
            [0, 1, 3, 2, 4],
            [0, 1, 4, 2, 3],
            [0, 2, 3, 1, 4],
            [0, 2, 4, 1, 3],
            [0, 3, 4, 1, 2],
            [1, 2, 3, 0, 4],
            [1, 2, 4, 0, 3],
            [1, 3, 4, 0, 2],
            [2, 3, 4, 0, 1]
        ]

        for (let i = 0; i < 10; ++i) {
            if (((__card_val[handCard[allComb[i][0]].num] + __card_val[handCard[allComb[i][1]].num] + __card_val[handCard[allComb[i][2]].num]) % 10) == 0) {
                result.type = NiuNiuLogic.COMB_TYPE_NONE + (__card_val[handCard[allComb[i][3]].num] + __card_val[handCard[allComb[i][4]].num]) % 10
                if (result.type === 0) {
                    result.type = NiuNiuLogic.COMB_TYPE_OX10
                    result.award = 4
                } else if (result.type === 9) {
                    result.award = 3
                } else if (result.type === 8) {
                    result.award = 2
                }
                result.Comb = allComb[i]
                break
            }
        }
        return result
    }

    /**
     * �Ա�����   ����trueΪ��һ�����Ӯ��falseΪ�ڶ������Ӯ
     * @param {CardResult} result1
     * @param {CardResult} result2
     * @returns {boolean}
     */
    public compare(result1: CardResult, result2: CardResult): boolean {
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


    public changeHandCard(handCard: Card[], cards: Card[], endCount: number, flag: boolean) {
        let tmpResult = new CardResult();
        tmpResult = this.getType(handCard)
        if (flag == true) {
            //������
            let value = 7
            let tmpRand = Math.random();
            let times = 10
            if (tmpRand < 0.4 && tmpRand >= 0.1) {
                value = 8;
                times = 20
            } else if (tmpRand < 0.1 && tmpRand >= 0.01) {
                value = 9;
                times = 30
            } else if (tmpRand < 0.01) {
                value = 10;
                times = 50
            }
            if (tmpResult.type < value) {
                for (let z = 0; z < 5; z++) {
                    //typescript α���
                    let copys = new Card();
                    Object.assign(copys, handCard[z]);
                    cards[endCount++] = copys;
                }
                let randTimes = 0;
                let dealFlag = false;
                do {
                    randTimes++;
                    dealFlag = false;
                    //ϴ��
                    for (let i = 0; i < endCount; i++) {
                        let tmpIndex: number = Math.floor(Math.random() * (endCount - 0.000001));
                        let tmpCard = cards[i];
                        cards[i] = cards[tmpIndex];
                        cards[tmpIndex] = tmpCard
                    }
                    //����
                    for (let i = 0; i < 5; i++) {
                        handCard[i] = cards[endCount - 5 + i]
                    }
                    tmpResult = module.exports.getType(handCard)
                    if (tmpResult.type < value) {
                        dealFlag = true
                    }
                } while (dealFlag && randTimes < times)
            }
        } else {
            //������
            let value = 5;
            let tmpRand = Math.random()
            let times = 3;
            if (tmpRand < 0.4) {
                value = 4
                times = 4
            } else if (tmpRand < 0.1) {
                value = 3
                times = 5
            }
            if (tmpResult.type > value) {
                for (let z = 0; z < 5; z++) {
                    let copyCard = new Card();
                    copyCard = Object.assign(copyCard, handCard[z]);
                    cards[endCount++] = copyCard;
                }
                let randTimes = 0;
                let dealFlag = false;
                do {
                    randTimes++;
                    dealFlag = false;
                    //ϴ��
                    for (let i = 0; i < endCount; i++) {
                        let tmpIndex = Math.floor(Math.random() * (endCount - 0.000001))
                        let tmpCard = cards[i];
                        cards[i] = cards[tmpIndex];
                        cards[tmpIndex] = tmpCard
                    }
                    //����
                    for (let i = 0; i < 5; i++) {
                        handCard[i] = cards[endCount - 5 + i]
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