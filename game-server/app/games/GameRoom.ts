import {Channel, ChannelService} from "pinus/lib/common/service/channelService";
import {log} from "util";
import {Card} from "./logic/NiuNiuLogic";
import Timer = NodeJS.Timer;

export class GameConfig {
    //牌型变量
    static COMB_TYPE_NONE = 0;     // 牛破
    static COMB_TYPE_OX1 = 1;   // 牛1
    static COMB_TYPE_OX2 = 2;   // 牛2
    static COMB_TYPE_OX3 = 3;   // 牛3
    static COMB_TYPE_OX4 = 4;   // 牛4
    static COMB_TYPE_OX5 = 5;    // 牛5
    static COMB_TYPE_OX6 = 6;     // 牛6
    static COMB_TYPE_OX7 = 7;     // 牛7
    static COMB_TYPE_OX8 = 8;      // 牛8   x2
    static COMB_TYPE_OX9 = 9;      // 牛9   x3
    static COMB_TYPE_OX10 = 10;       // 牛牛  x4
    static COMB_TYPE_YIN_DELUX = 11;   // 银花牛 x5
    static COMB_TYPE_JIN_DELUX = 12;    // 金花牛 x6
    static COMB_TYPE_BOMB = 13;     // 炸弹   x7
    static COMB_TYPE_MICRO = 14;       // 五小   x8


    static GAME_PLAYER = 6;           //游戏人数
    static TID_ROB_TIME = 5000;       //抢庄时间
    static TID_BETTING = 10000;         //下注时间
    static TID_SETTLEMENT = 10000;        //结算时间

    static TID_ZHAJINNIU = 80000;	 //诈金牛模式玩家操作时间
    static TID_ZHAJINNIU_SETTLEMENT = 3000;//炸金牛结算时间

    static TID_ZHAJINHUA = 30000;		 //炸金花模式玩家操作时间

    static TID_MINGPAIQZ_ROB_TIME = 10000  //明牌抢庄模式抢庄时间

    static MING_CARD_NUM = 4;          //明牌数量

//游戏状态
    static GS_FREE = 1001;        //空闲阶段
    static GS_BETTING = 1002;           //下注阶段
    static GS_DEAL = 1003;            //发牌阶段
    static GS_SETTLEMENT = 1004;         //结算阶段
    static GS_ROB_BANKER = 1005;          //抢庄阶段
    static GS_GAMEING = 1006;			 //游戏已开始
    static GS_NONE = 1099;			 //不可操作阶段

//游戏模式
    static MODE_GAME_NORMAL = 1;          //常规模式
    static MODE_GAME_MING = 2;		   //明牌抢庄
    static MODE_GAME_BULL = 3;         //斗公牛模式
    static MODE_GAME_SHIP = 4;          //开船模式
    static MODE_GAME_ZHAJINNIU = 5;	   //炸金牛
    static MODE_GAME_CRAZE = 6;	   //疯狂模式
    static MODE_GAME_SANKUNG = 7;   //三公
//定庄模式
    static MODE_BANKER_ROB = 1;    //随机抢庄
    static MODE_BANKER_HOST = 2;     //房主做庄
    static MODE_BANKER_ORDER = 3;      //轮庄
    static MODE_BANKER_NONE = 4;     //无定庄模式
    static MODE_BANKER_NIUNIU = 5;	//牛牛坐庄
    static MODE_BANKER_JIUDIAN = 6;	//九点坐庄
//消耗模式
    static MODE_DIAMOND_HOST = 1;      //房主扣钻
    static MODE_DIAMOND_EVERY = 2;       //每人扣钻
    static MODE_DIAMOND_WIN = 3;       //大赢家扣钻
    static MODE_DIAMOND_NONOE = 10; 		//已扣钻
//明牌模式
    static MODE_CARD_HIDE = 1;			//不明牌
    static MODE_CARD_SHOW = 2;			//明牌

    static GAME_TYPE = {
        "niuniu": true,
        "zhajinniu": true,
        "mingpaiqz": true,
        "fengkuang": true,
        "sanKung": true,
        "zhajinhua": true
    }

    static ROOM_FACTORY = {}
//大牌控制
    static ROUND_TIMES = 1 						//最大洗牌次数
    static TYPE_WEIGHT = 2 						//低于此权重洗牌
    static typeWeight = [0, 1, 2, 3, 4, 5, 6, 7, 10, 20, 30, 50, 80, 100, 200]
    static FengKuangtypeWeight = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 20, 21]


//三公控制
    static SANKUNG_ROUND_TIMES = 1 				//最大洗牌次数
    static SANKUNG_TYPE_WEIGHT = 3                //低于此权重洗牌
    static sanKungTypeWeight = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25]

}

export class Player {
    score: number;

}

export class ClientHandle {
//代开房间
    agency(uid: string, sid: string, param: any, cb: Function) {

    }

    //创建房间
    newRoom(uid: string, sid: string, param: any, cb: Function) {

    }

    //玩家加入
    join(uid: string, sid: string, param: any, cb: Function) {

    }


    //玩家准备
    ready(uid: string, sid: string, param: any, cb: Function) {

    }

    //玩家下庄
    downBanker(uid: string, sid: string, param: any, cb: Function) {

    }

    //玩家抢庄
    robBanker(uid: string, sid: string, param: any, cb: Function) {

    }

    //发送聊天
    say(uid: string, sid: string, param: any, cb: Function) {

    }

    //下注通知
    betMessege(chair: any, bet: any) {

    }

    //玩家下注
    bet(uid: string, sid: string, param: any, cb: Function) {
        //游戏状态为BETTING

    }

    showCard(uid: string, sid: string, param: any, cb: Function) {

    }
}

export class MatchStream {

}

//创建房间
export class BaseGameroom {
    //常量定义
    public static GAME_PLAYER = GameConfig.GAME_PLAYER      //游戏人数
    public static TID_ROB_TIME = GameConfig.TID_ROB_TIME    //抢庄时间
    public static TID_BETTING = GameConfig.TID_BETTING      //下注时间
    public static TID_SETTLEMENT = GameConfig.TID_SETTLEMENT//结算时间

    public static MING_CARD_NUM = 4               //明牌数量
//游戏状态
    public static GS_FREE = 1001              //空闲阶段
    public static GS_BETTING = 1002              //下注阶段
    public static GS_DEAL = 1003              //发牌阶段
    public static GS_SETTLEMENT = 1004              //结算阶段
    public static GS_ROB_BANKER = 1005              //抢庄阶段

//游戏模式
    public static MODE_GAME_NORMAL = 1              //常规模式
    public static MODE_GAME_BULL = 3              //斗公牛模式
    public static MODE_GAME_SHIP = 4              //开船模式
//定庄模式
    public static MODE_BANKER_ROB = 1              //随机抢庄
    public static MODE_BANKER_HOST = 2              //房主做庄
    public static MODE_BANKER_ORDER = 3              //轮庄
    public static MODE_BANKER_NONE = 4              //无定庄模式
//消耗模式
    public static MODE_DIAMOND_HOST = 1              //房主扣钻
    public static MODE_DIAMOND_EVERY = 2             //每人扣钻
    public static MODE_DIAMOND_WIN = 3               //大赢家扣钻

    roomId: string;
    roomType: string
    channelService: ChannelService;
    channel: Channel;
    isRecord: boolean
    playerNumber: number;
    gameBegincb: Function;
    gameOvercb: Function;
    handle: ClientHandle;
    halfwayEnter: boolean;
    agencyId: number;
    beginTime: number;
    matchStream: MatchStream;
    basicType: number;
    private gameMode: number;
    private needDiamond: number;
    private cardMode: any;
    private maxGameNumber: number;
    private bankerMode: any;
    private runCount: number;
    private banker: number;
    private gameState: any;
    private playerCount: number;
    private state: boolean;
    private readyCount: number;
    private chairMap: {};
    private roomHost: number;
    private gameNumber: number;
    private consumeMode: any;
    private GAME_PLAYER: number;
    private oldBanker: any;
    private betList: any;
    private robState: any;
    private bonusPool: number;
    private timer: Timer;
    private cards: Card[];
    private cardCount: number;
    private betAmount: number;
    private bankerTime: number;
    private cardHistory: any[];
    private player: Player;

    private chooseBanker() {
    }

    //结束抢庄
    private endRob() {

    }

    //游戏开始
    private gameBegin = function () {

    }


    //下注阶段
    private betting() {


    }

    //发牌阶段  等待摊牌后进入结算
    private deal() {

    }

    //结算阶段
    private settlement() {

    }

    //总结算
    private gameOver(flag: boolean) {

    }

    //积分改变
    private changeScore(chair: any, score: number) {
        this.player.score += score;
        // var notify = {
        //   "cmd" : "changeScore",
        //   "chair" : chair,
        //   "difference" : score,
        //   "score" : player[chair].score
        // }
        // local.sendAll(notify)
    }

    //广播消息
    private sendAll(notify: any) {
        this.channel.pushMessage('onMessage', notify)
    }

    //通过uid 单播消息
    private sendUid(uid: string, notify: any) {

    }

    //更新单个玩家积分
    private updatePlayerScore(chair: any) {
        var notify = {
            "cmd": "updatePlayerScore",
            "chair": chair,
            "score": this.player.score
        }
        this.sendAll(notify)
    }

    //房间初始化
    private init() {
        //console.log("enter init=====================================")
        this.gameMode = 0;         //游戏模式
        this.gameNumber = 0;          //游戏局数
        this.maxGameNumber = 0;//游戏最大局数
        this.consumeMode = 0;//消耗模式
        this.bankerMode = 0;//定庄模式
        this.needDiamond = 0;  //钻石基数
        //房间属性
        this.state = true;   //房间状态，true为可创建
        this.playerCount = 0;   //房间内玩家人数
        this.readyCount = 0;//游戏准备人数
        this.gameState = GameConfig.GS_FREE;           //游戏状态
        this.chairMap = {};//玩家UID与椅子号映射表
        this.banker = -1; //庄家椅子号
        this.roomHost = -1;  //房主椅子号
        this.timer = undefined;   //定时器句柄
        //游戏属性
        this.robState = new Array(GameConfig.GAME_PLAYER) ;//抢庄状态记录
        this.cards = [];                       //牌组
        this.cardCount = 0;    //卡牌剩余数量
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(Card.createCard(i, j));//{num: i, type: j}
            }
        }
        //console.log("enter init=====================================111111111111111")
        //下注信息
        this.betList = new Array(GameConfig.GAME_PLAYER);
        this.betAmount = 0
        //斗公牛模式积分池
        this.bonusPool = this.playerCount * 8;
        //玩家属性
        this.player = new Player();
        for (var i = 0; i < GameConfig.GAME_PLAYER; i++) {
            this.initChairInfo(i)
        }
        //console.log("enter init=====================================222")
        //channel清空
        this.channelService.destroyChannel(this.roomId)
        this.channel = this.channelService.getChannel(this.roomId, true)
        //console.log(room.channel)
    }

    //初始化椅子信息
    private initChairInfo(chiar: any) {
        // this.player[chiar] = {}
        // this.player[chiar].chair = chiar             //椅子号
        // this.player[chiar].uid = 0                   //uid
        // this.player[chiar].isActive = false          //当前椅子上是否有人
        // this.player[chiar].isOnline = false          //玩家是否在线
        // this.player[chiar].isReady = false           //准备状态
        // this.player[chiar].isBanker = false          //是否为庄家
        // this.player[chiar].isShowCard = false        //是否开牌
        // this.player[chiar].handCard = new Array(5)   //手牌
        // this.player[chiar].score = 0                 //当前积分
        // this.player[chiar].bankerCount = 0           //坐庄次数
        // //player[chiar].cardsList  = {}           //总战绩列表
        // this.player[chiar].ip = undefined           //玩家ip地址
    }


    private newRoom(uid: number, sid: number, param: any, cb: Function) {
        log("newRoom" + uid)
        //无效条件判断
        if (!param.gameMode || typeof(param.gameMode) !== "number" ||
            !(param.gameMode == 1 || param.gameMode == 3 || param.gameMode == 4)) {
            log("newRoom error   param.gameMode : " + param.gameMode);
            cb(false);
            return
        }
        if (!param.consumeMode || typeof(param.consumeMode) !== "number" || param.consumeMode > 3 || param.consumeMode < 0) {
            log("newRoom error   param.consumeMode : " + param.consumeMode);
            cb(false)
            return
        }
        if (!param.bankerMode || typeof(param.bankerMode) !== "number" ||
            (param.bankerMode != 1 && param.bankerMode != 2 && param.bankerMode != 3 && param.bankerMode != 5)) {
            log("newRoom error   param.bankerMode : " + param.bankerMode);
            cb(false)
            return
        }
        if (!param.gameNumber || typeof(param.gameNumber) !== "number" || (param.gameNumber != 10 && param.gameNumber != 20)) {
            log("newRoom error   param.gameNumber : " + param.gameNumber);
            cb(false)
            return
        }
        if (!param.cardMode || typeof(param.cardMode) !== "number" || param.cardMode > 2 || param.cardMode < 0) {
            log("newRoom error   param.cardMode : " + param.cardMode);
            cb(false)
            return
        }
        if (typeof(param.isWait) !== "boolean") {
            param.isWait = true
        }
        this.basicType = param.basicType;
        //frame.start(param.isWait);
        if (param.halfwayEnter === false) {
            this.halfwayEnter = false
        }
        //房间初始化
        this.init();

        this.state = false;
        this.playerCount = 0;       //房间内玩家人数
        this.readyCount = 0;               //游戏准备人数
        this.gameState = GameConfig.GS_FREE;             //游戏状态
        this.chairMap = {};            //玩家UID与椅子号映射表
        this.banker = -1;                 //庄家椅子号
        this.roomHost = 0;                 //房主椅子号
        this.runCount = 0;           //当前游戏局数
        this.gameMode = param.gameMode;                 //游戏模式
        this.bankerMode = param.bankerMode;             //定庄模式
        this.gameNumber = param.gameNumber;            //游戏局数
        this.maxGameNumber = param.gameNumber;           //游戏最大局数
        this.consumeMode = param.consumeMode;           //消耗模式
        this.cardMode = param.cardMode;              //明牌模式
        this.needDiamond = Math.ceil(this.gameNumber / 10)  //本局每人消耗钻石
        if (this.GAME_PLAYER == 9) {
            this.needDiamond = this.needDiamond * 2
        }
        if (this.gameMode == GameConfig.MODE_GAME_SHIP || this.gameMode == GameConfig.MODE_GAME_BULL) {
            this.bankerMode = GameConfig.MODE_BANKER_NONE
        }
        if (this.gameMode == GameConfig.MODE_GAME_BULL) {
            this.banker = this.roomHost
        }
        if (this.gameMode == GameConfig.MODE_GAME_NORMAL) {
            if (this.bankerMode == GameConfig.MODE_BANKER_HOST || this.bankerMode == GameConfig.MODE_BANKER_NIUNIU) {
                this.banker = this.roomHost
            }
        }
        cb(true)
    }

    //玩家重连
    public reconnection(uid: string, sid: string, param: any, cb: Function) {

    }

    //玩家离线
    private leave(uid: string) {

    }

    public constructor(roomId: string, channelService: ChannelService, playerNumber: number, gameBegincb: Function, gameOvercb: Function) {
        console.log("createRoom" + roomId);
        var roomBeginCB = gameBegincb;
        var roomCallBack = gameOvercb;
        let room = this;
        this.roomId = roomId;
        this.roomType = "niuniu";
        this.channel = channelService.getChannel(roomId, true)
        this.isRecord = true;
        this.handle = new ClientHandle();
        this.halfwayEnter = true;         //允许中途加入
        this.agencyId = 0;             //代开房玩家ID
        this.beginTime = (new Date()).valueOf();
        this.matchStream = new MatchStream();
        this.basicType = 0;
        //房间初始化
        //私有方法
        this.player = new Player();                   //玩家属性
        this.readyCount = 0;          //游戏准备人数
        this.gameState = BaseGameroom.GS_FREE;           //游戏状态
        this.banker = -1;           //庄家椅子号

        this.roomHost = -1;                //房主椅子号

        this.bankerTime = 0;              //连庄次数
        this.playerNumber = playerNumber;   //游戏人数


        this.cards = [];                    //牌组
        this.cardCount = 0;              //卡牌剩余数量
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(Card.createCard(i, j));// = {num: i, type: j}
            }
        }
        //牌型历史
        this.cardHistory = [];
        for (let i = 0; i < GameConfig.GAME_PLAYER; i++) {
            this.cardHistory[i] = []
        }
        //下注信息

        let betAmount = 0
        //下注上限
        let betType = {
            "0": {"1": 1, "2": 2, "3": 3, "4": 5},
            "1": {"1": 1, "2": 5, "3": 10, "4": 20}
        }
        //斗公牛模式积分池
        this.bonusPool = 40

    }

    //房间是否已开始游戏
    public isBegin(): boolean {
        return false;
    }

    //房间是否空闲
    public isFree(): boolean {
        return false;
    }

    //获取房间人数
    public getPlayerCount(): number {
        return 0;
    }

    //解散游戏
    public finishGame(flag: boolean): void {

    }

    //用户退出
    public userQuit(uid: string, cb: Function): void {

    }


}