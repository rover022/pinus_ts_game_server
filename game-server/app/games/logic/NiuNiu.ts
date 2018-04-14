import {Channel} from "pinus";
import {ChannelService} from "pinus/lib/common/service/channelService";
import {publish} from "pinus/lib/connectors/mqtt/generate";
import {log} from "util";
import {NiuNiuLogic} from "./logic/NiuNiuLogic";

export class NiuNiuConf {

    public static GAME_PLAYER: number = 4;
    public static TID_ROB_TIME: number = 10;
    public static TID_BETTING: number = 10;
    public static TID_SETTLEMENT: number = 10;
}

export class Handle {

}

export class MatchStream {

}

export class GameRoom {
    public roomType: string;
    public channel: Channel;
    public isRecord: boolean;
    public handle: Handle = new Handle();
    public halfwayEnter: boolean;
    public agencyId: number;
    public beginTime: number;
    public MatchStream: MatchStream = new MatchStream();
    public basicType: number;
    public roomId: string;
    public GAME_PLAYER: number;
    public logic:NiuNiuLogic;
    public newRoom(uid: string, sid: string, param: any, cb: Function) {
        log("newRoom" + uid)
        //��Ч�����ж�
        if (!param.gameMode || typeof(param.gameMode) !== "number" ||
            !(param.gameMode == 1 || param.gameMode == 3 || param.gameMode == 4)) {
            log("newRoom error   param.gameMode : " + param.gameMode)
            cb(false)
            return
        }
        if (!param.consumeMode || typeof(param.consumeMode) !== "number" || param.consumeMode > 3 || param.consumeMode < 0) {
            log("newRoom error   param.consumeMode : " + param.consumeMode)
            cb(false)
            return
        }
        if (!param.bankerMode || typeof(param.bankerMode) !== "number" ||
            (param.bankerMode != 1 && param.bankerMode != 2 && param.bankerMode != 3 && param.bankerMode != 5)) {
            log("newRoom error   param.bankerMode : " + param.bankerMode)
            cb(false)
            return
        }
        if (!param.gameNumber || typeof(param.gameNumber) !== "number" || (param.gameNumber != 10 && param.gameNumber != 20)) {
            log("newRoom error   param.gameNumber : " + param.gameNumber)
            cb(false)
            return
        }
        if (!param.cardMode || typeof(param.cardMode) !== "number" || param.cardMode > 2 || param.cardMode < 0) {
            log("newRoom error   param.cardMode : " + param.cardMode)
            cb(false)
            return
        }
        if (typeof(param.basicType) !== "number" || !betType[param.basicType]) {
            param.basicType = 1
        }
        if (typeof(param.isWait) !== "boolean") {
            param.isWait = true
        }
        room.basicType = param.basicType
        frame.start(param.isWait)
        if (param.halfwayEnter === false) {
            room.halfwayEnter = false
        }
        //�����ʼ��
    public
        init()
        {
        }

        room.state = false
        room.playerCount = 0            //�������������
        readyCount = 0                   //��Ϸ׼������
        gameState = GS_FREE              //��Ϸ״̬
        room.chairMap = {}               //���UID�����Ӻ�ӳ���
        banker = -1                      //ׯ�����Ӻ�
        roomHost = 0                     //�������Ӻ�
        room.runCount = 0                //��ǰ��Ϸ����
        room.gameMode = param.gameMode                     //��Ϸģʽ
        room.bankerMode = param.bankerMode                 //��ׯģʽ
        room.gameNumber = param.gameNumber                 //��Ϸ����
        room.maxGameNumber = param.gameNumber              //��Ϸ������
        room.consumeMode = param.consumeMode               //����ģʽ
        room.cardMode = param.cardMode                     //����ģʽ
        room.needDiamond = Math.ceil(room.gameNumber / 10)  //����ÿ��������ʯ
        if (room.GAME_PLAYER == 9) {
            room.needDiamond = room.needDiamond * 2
        }
        if (room.gameMode == MODE_GAME_SHIP || room.gameMode == MODE_GAME_BULL) {
            room.bankerMode = MODE_BANKER_NONE
        }
        if (room.gameMode == MODE_GAME_BULL) {
            banker = roomHost
        }
        if (room.gameMode == conf.MODE_GAME_NORMAL) {
            if (room.bankerMode == conf.MODE_BANKER_HOST || room.bankerMode == conf.MODE_BANKER_NIUNIU) {
                banker = roomHost
            }
        }
        cb(true)
    }

    //��������
    room
.
    handle
.
    agency = function (uid, sid, param, cb) {
        local.newRoom(uid, sid, param, function (flag) {
            if (flag) {
                room.needDiamond = 0
                room.agencyId = uid
                roomHost = -1
            }
            cb(flag)
        })
    }
    //��������
    room
.
    handle
.
    newRoom = function (uid, sid, param, cb) {
        local.newRoom(uid, sid, param, function (flag) {
            if (flag) {
                room.handle.join(uid, sid, {ip: param.ip, playerInfo: param.playerInfo}, cb)
            } else {
                cb(false)
            }
        })
    }

    //��Ҽ���
    public join(uid, sid, param, cb) {
        log("serverId" + sid)
        //����δ�������ɼ���
        if (room.state == true) {
            cb(false)
            return
        }
        //�Ƿ�������;����
        if (room.halfwayEnter == false && room.isBegin()) {
            cb(false, tips.CANT_HALF_JOIN)
            return
        }
        //�����ظ�����
        for (var i = 0; i < GAME_PLAYER; i++) {
            if (player[i] && player[i].uid === uid) {
                cb(false)
                return
            }
        }
        //���ҿ���λ��
        var chair = -1
        for (var i = 0; i < GAME_PLAYER; i++) {
            if (player[i].isActive === false) {
                chair = i
                break
            }
        }
        log("chair : " + chair)
        if (chair == -1 || !player[chair]) {
            cb(false, tips.ROOM_FULL)
            return
        }
        //��ʼ���������
        room.chairMap[uid] = chair
        player[chair].isActive = true
        player[chair].isReady = false
        player[chair].isOnline = true
        player[chair].uid = uid
        player[chair].ip = param.ip
        player[chair].playerInfo = param.playerInfo
        //console.log(player[chair])
        //�����������
        room.playerCount++

        var notify = {
            cmd: "userJoin",
            uid: uid,
            chair: chair,
            player: player[chair]
        }
        //console.log(notify)
        local.sendAll(notify)
        var newPlayer = deepCopy(player)
        //deal�׶�֮ǰ��������
        if (gameState < conf.GS_DEAL) {
            for (var i = 0; i < GAME_PLAYER; i++) {
                delete newPlayer[i].handCard
            }
        }
        //console.log("param.maxGameNumber : "+param.maxGameNumber)
        //console.log("room.gameNumber : "+room.gameNumber)
        if (!room.channel.getMember(uid)) {
            room.channel.add(uid, sid)
        }

        notify = {
            cmd: "roomPlayer",
            player: newPlayer,
            gameMode: room.gameMode,
            maxGameNumber: room.maxGameNumber,
            gameNumber: room.maxGameNumber - room.gameNumber,
            consumeMode: room.consumeMode,
            bankerMode: room.bankerMode,
            cardMode: room.cardMode,
            roomId: room.roomId,
            TID_ROB_TIME: conf.TID_ROB_TIME,
            TID_BETTING: conf.TID_BETTING,
            TID_SETTLEMENT: conf.TID_SETTLEMENT,
            state: gameState,
            roomType: room.roomType,
            bankerTime: bankerTime,
            betList: betList,
            bonusPool: bonusPool,
            basicType: room.basicType,
            playerNumber: GAME_PLAYER
        }
        //console.log(notify)
        local.sendUid(uid, notify)
        //console.log(room.channel)
        cb(true)
    }

    //�������
    room
.
    reconnection = function (uid, sid, param, cb) {
        //console.log("uid : "+uid + "  reconnection")
        if (room.chairMap[uid] !== undefined) {
            var chair = room.chairMap[uid]
            player[chair].isOnline = true
            player[chair].uid = uid
            var notify = {
                cmd: "userReconnection",
                uid: uid,
                chair: chair
            }
            local.sendAll(notify)
            if (!room.channel.getMember(uid)) {
                room.channel.add(uid, sid)
            }
            var newPlayer = deepCopy(player)
            //deal�׶�֮ǰ��������
            if (gameState < conf.GS_DEAL) {
                for (var i = 0; i < GAME_PLAYER; i++) {
                    delete newPlayer[i].handCard
                }
                if (room.cardMode == conf.MODE_CARD_SHOW) {
                    newPlayer[chair].handCard = deepCopy(player[chair].handCard)
                    delete newPlayer[chair].handCard[4]
                }
            }
            notify = {
                roomInfo: {
                    player: newPlayer,
                    gameMode: room.gameMode,
                    maxGameNumber: room.maxGameNumber,
                    gameNumber: room.maxGameNumber - room.gameNumber,
                    consumeMode: room.consumeMode,
                    bankerMode: room.bankerMode,
                    cardMode: room.cardMode,
                    roomId: room.roomId,
                    TID_ROB_TIME: conf.TID_ROB_TIME,
                    TID_BETTING: conf.TID_BETTING,
                    TID_SETTLEMENT: conf.TID_SETTLEMENT,
                    roomType: room.roomType,
                    bankerTime: bankerTime,
                    bonusPool: bonusPool,
                    basicType: room.basicType,
                    playerNumber: GAME_PLAYER
                },
                betList: betList,
                state: gameState,
                bonusPool: bonusPool,
                surplusGameNumber: room.maxGameNumber - room.gameNumber,
                freeState: param
            }
            cb(notify)
        } else {
            cb(false)
        }
    }
    //�������
    function

    leave(uid) {
        //�ж��Ƿ���������
        // console.log("leave11111 : "+room.chairMap[uid])
        var chair = room.chairMap[uid]
        if (chair === undefined) {
            return
        }
        // console.log(room.channel)
        // console.log("leave222222")
        if (player[chair].isOnline == true) {
            player[chair].isOnline = false
            var tsid = room.channel.getMember(uid)['sid']
            if (tsid) {
                room.channel.leave(uid, tsid)
            }
            // console.log(room.channel)
            var notify = {
                cmd: "userDisconne",
                uid: uid,
                chair: chair
            }
            local.sendAll(notify)
            if (room.gameMode == conf.MODE_GAME_BULL) {
                if (banker == chair) {
                    return
                }
            } else if (room.gameMode == conf.MODE_GAME_NORMAL || room.gameMode == conf.MODE_GAME_CRAZE) {
                if ((room.bankerMode == conf.MODE_BANKER_HOST || room.bankerMode == conf.MODE_BANKER_NIUNIU) && banker == chair) {
                    return
                }
            }
            frame.disconnect(chair, player, gameState, local, local.chooseBanker)
        }
    }

    //���׼��
    room
.
    handle
.
    ready = function (uid, sid, param, cb) {
        var chair = room.chairMap[uid]
        if (chair === undefined) {
            cb(false)
            return
        }
        var tmpBanker = -1
        if (room.gameMode == conf.MODE_GAME_BULL) {
            tmpBanker = banker
        }
        if (room.gameMode == conf.MODE_GAME_NORMAL) {
            if (room.bankerMode == conf.MODE_BANKER_HOST || room.bankerMode == conf.MODE_BANKER_NIUNIU) {
                tmpBanker = banker
            }
        }
        frame.ready(uid, chair, player, gameState, local, local.chooseBanker, tmpBanker, cb)
    }
    //�����ׯ
    room
.
    handle
.
    downBanker = function (uid, sid, param, cb) {
        if (gameState !== GS_FREE) {
            cb(false)
            return
        }
        if (room.gameMode !== conf.MODE_GAME_BULL) {
            cb(false)
            return
        }
        var chair = room.chairMap[uid]
        if (chair == undefined) {
            cb(false)
            return
        }
        if (chair !== banker) {
            cb(false)
            return
        }
        //��ׯ���ֲ��ܻ�ׯ
        if (bankerTime < 3) {
            cb(false)
            return
        }
        player[banker].score += bonusPool
        var tmpOldBanker = banker
        //��ׯ
        do {
            banker = (banker + 1) % GAME_PLAYER
        } while (player[banker].isActive == false)
        bonusPool = room.playerCount * 8
        player[banker].score -= bonusPool
        bankerTime = 0
        log("banker change : " + banker)
        var notify = {
            "cmd": "downBanker",
            "chair": chair,
            "banker": banker,
            "bonusPool": bonusPool,
            "bankerScore": player[banker].score,
            "oldBankerScore": player[tmpOldBanker].score
        }
        local.sendAll(notify)
    }
    //�����ׯ
    room
.
    handle
.
    robBanker = function (uid, sid, param, cb) {
        if (gameState !== GS_ROB_BANKER) {
            cb(false)
            return
        }
        //�ж��Ƿ���������
        var chair = room.chairMap[uid]
        if (chair == undefined) {
            cb(false)
            return
        }
        log("robBanker")
        //�ж��Ƿ�����ׯ
        if (robState[chair] != 0) {
            cb(false)
            return
        }
        //��¼��ׯ
        if (param && param.flag == true) {
            robState[chair] = 1
        } else {
            robState[chair] = 2
        }
        var notify = {
            "cmd": "robBanker",
            "chair": chair,
            "flag": robState[chair]
        }
        local.sendAll(notify)
        cb(true)
        //�ж������˶��Ѳ��������¸��׶�
        var flag = true
        for (var index in robState) {
            if (robState.hasOwnProperty(index)) {
                if (player[index].isActive) {
                    if (robState[index] == 0) {
                        flag = false
                    }
                }
            }
        }
        if (flag) {
            clearTimeout(timer)
            local.endRob()
        }
    }
    //��������
    room
.
    handle
.
    say = function (uid, sid, param, cb) {
        //�ж��Ƿ���������
        var chair = room.chairMap[uid]
        if (chair == undefined) {
            cb(false)
            return
        }
        log("sendMsg")
        var notify = {
            cmd: "sayMsg",
            uid: uid,
            chair: chair,
            msg: param.msg
        }
        local.sendAll(notify)
        cb(true)
    }
    //��ע֪ͨ
    local
.
    betMessege = function (chair, bet) {
        var notify = {
            "cmd": "bet",
            "chair": chair,
            "bet": bet,
            "betAmount": betAmount
        }
        local.sendAll(notify)
    }
    //�����ע
    room
.
    handle
.
    bet = function (uid, sid, param, cb) {
        //��Ϸ״̬ΪBETTING
        if (gameState !== GS_BETTING) {
            cb(false)
            return
        }
        //�ж��Ƿ���������
        var chair = room.chairMap[uid]
        if (chair === undefined) {
            cb(false)
            return
        }
        //������Ϸ�в�����ע
        if (!player[chair].isReady) {
            cb(false)
            return
        }
        //ׯ�Ҳ�����ע
        if (chair == banker) {
            cb(false)
            return
        }
        //����ţģʽʹ��������ע����
        if (room.gameMode == MODE_GAME_BULL) {
            var tmpMinbet = Math.floor(bonusPool / room.playerCount / 5)
            if (tmpMinbet > 40) {
                tmpMinbet = 40
            }
            if (param.bet && typeof(param.bet) == "number"
                && (param.bet >= tmpMinbet) && param.bet > 0
                && (param.bet + betList[chair]) <= 40
                && (param.bet + betList[chair]) <= Math.floor(bonusPool / (room.playerCount - 1))
                && (param.bet + betAmount) <= bonusPool) {
                betList[chair] += param.bet
                betAmount += param.bet
                local.betMessege(chair, param.bet)
            } else {
                cb(false)
                return
            }
        } else {
            //����ģʽ
            if (param.bet && typeof(param.bet) == "number"
                && param.bet > 0 && betList[chair] == 0 && betType[room.basicType][param.bet]) {
                var tmpbet = betType[room.basicType][param.bet]
                betList[chair] += tmpbet
                betAmount += tmpbet
                local.betMessege(chair, tmpbet)
            } else {
                cb(false)
                return
            }
        }
        cb(true)
        //�ж������˶���ע���뷢�ƽ׶�
        var flag = true
        for (var index in betList) {
            if (betList.hasOwnProperty(index)) {
                if (player[index].isActive && index != banker && player[index].isReady) {
                    if (betList[index] === 0) {
                        flag = false
                    }
                }
            }
        }
        if (flag) {
            //ȡ������ʱ  ���뷢��
            clearTimeout(timer)
            local.deal()
        }
    }
    room
.
    handle
.
    showCard = function (uid, sid, param, cb) {
        //��Ϸ״̬ΪGS_DEAL
        if (gameState !== GS_DEAL) {
            cb(false)
            return
        }
        //�ж��Ƿ���������
        var chair = room.chairMap[uid]
        if (chair === undefined) {
            cb(false)
            return
        }
        //�Ѿ����������ٿ���
        if (player[chair].isShowCard == true) {
            cb(false)
            return
        }
        player[chair].isShowCard = true

        var notify = {
            "cmd": "showCard",
            "chair": chair
        }
        local.sendAll(notify)
        //���в�����Ϸ����Ҷ��������������������
        var flag = true
        for (var i = 0; i < GAME_PLAYER; i++) {
            if (player[i].isReady == true && player[i].isShowCard == false) {
                flag = false
            }
        }

        if (flag) {
            clearTimeout(timer)
            local.settlement()
        }
        cb(true)
    }

    //��������
    public GAME_PLAYER = NiuNiuConf.GAME_PLAYER      //��Ϸ����
    public TID_ROB_TIME = NiuNiuConf.TID_ROB_TIME    //��ׯʱ��
    public TID_BETTING = NiuNiuConf.TID_BETTING      //��עʱ��
    public TID_SETTLEMENT = NiuNiuConf.TID_SETTLEMENT//����ʱ��

    public MING_CARD_NUM = 4               //��������
    //��Ϸ״̬
    public GS_FREE = 1001              //���н׶�
    public GS_BETTING = 1002              //��ע�׶�
    public GS_DEAL = 1003              //���ƽ׶�
    public GS_SETTLEMENT = 1004              //����׶�
    public GS_ROB_BANKER = 1005              //��ׯ�׶�

    //��Ϸģʽ
    public MODE_GAME_NORMAL = 1              //����ģʽ
    public MODE_GAME_BULL = 3              //����ţģʽ
    public MODE_GAME_SHIP = 4              //����ģʽ
    //��ׯģʽ
    public MODE_BANKER_ROB = 1              //�����ׯ
    public MODE_BANKER_HOST = 2              //������ׯ
    public MODE_BANKER_ORDER = 3              //��ׯ
    public MODE_BANKER_NONE = 4              //�޶�ׯģʽ
    //����ģʽ
    public MODE_DIAMOND_HOST = 1              //��������
    public MODE_DIAMOND_EVERY = 2             //ÿ�˿���
    public MODE_DIAMOND_WIN = 3               //��Ӯ�ҿ���
    //��������
    public static createRoom(roomId: string, channelService: ChannelService, playerNumber: number, gameBegincb: Function, gameOvercb: Function) {
        console.log("createRoom" + roomId)
        let roomBeginCB = gameBegincb
        let roomCallBack = gameOvercb
        let room = new GameRoom();
        room.roomId = roomId;
        room.roomType = "niuniu";
        room.channel = channelService.getChannel(roomId, true)
        room.isRecord = true
        room.handle = {} //��Ҳ���
        room.halfwayEnter = true             //������;����
        room.agencyId = 0                    //���������ID
        room.beginTime = (new Date()).valueOf()
        room.MatchStream = {}
        room.basicType = 0
        //�����ʼ��
        let local = new RoomConfig()                      //˽�з���
        let player = new Player()                     //�������
        let readyCount = 0                   //��Ϸ׼������
        let gameState = this.GS_FREE              //��Ϸ״̬
        let banker = -1                      //ׯ�����Ӻ�
        let oldBanker = banker               //��һ��ׯ��
        let roomHost = -1                    //�������Ӻ�
        let timer: any                           //��ʱ�����
        let bankerTime = 0                   //��ׯ����
        room.GAME_PLAYER = playerNumber      //��Ϸ����
        this.GAME_PLAYER = playerNumber
        //��Ϸ����

        var cards = {}                       //����
        var cardCount = 0                    //����ʣ������
        for (var i = 1; i <= 13; i++) {
            for (var j = 0; j < 4; j++) {
                this.cards[cardCount++] = {num: i, type: j}
            }
        }
        //������ʷ
        var cardHistory = {}
        for (var i = 0; i < this.GAME_PLAYER; i++) {
            this.cardHistory[i] = []
        }
        //��ע��Ϣ

        var betAmount = 0
        //��ע����
        var betType = {
            "0": {"1": 1, "2": 2, "3": 3, "4": 5},
            "1": {"1": 1, "2": 5, "3": 10, "4": 20}
        }
        //����ţģʽ���ֳ�
    public
        bonusPool = 40
    public
        robState, betList

        //��ׯ�׶�  ����ׯ�������ׯ
    private  cchooseBanker () {
            gameState = GS_ROB_BANKER
            switch (room.bankerMode) {
                case MODE_BANKER_ROB :
                    //��ʼ����ׯ״̬Ϊfalse
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        robState[i] = 0
                    }
                    //��ׯ
                    var notify = {
                        "cmd": "beginRob"
                    }
                    local.sendAll(notify)
                    timer = setTimeout(local.endRob, TID_ROB_TIME)
                    break
                case MODE_BANKER_ORDER :
                    //��ׯ
                    do {
                        banker = (banker + 1) % GAME_PLAYER
                    } while (player[banker].isActive == false || player[banker].isReady == false)

                    local.gameBegin()
                    break
                case MODE_BANKER_HOST :
                    //������ׯ
                    banker = roomHost
                    if (roomHost === -1) {
                        banker = 0
                    }
                    local.gameBegin()
                    break
                default:

                    local.gameBegin()
                    break
            }
        }

        //������ׯ
    private endRob   () {
            //ͳ����ׯ����
            var num = 0
            var robList = {}
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (robState[i] == 1) {
                    robList[num++] = i
                }
            }
            console.log("endRob num : " + num)
            //������ׯ�����в�����Ϸ����Ҽ�����ׯ�б�
            if (num == 0) {
                for (var i = 0; i < GAME_PLAYER; i++) {
                    //console.log("i : "+i +"player[i].isActive : "+player[i].isActive+" player[i].isReady : "+ player[i].isReady)
                    if (player[i].isActive && player[i].isReady) {
                        robList[num++] = i
                    }
                }
            }
            //console.log("num : "+num)
            //�����һ��ׯ��
            var index = Math.floor(Math.random() * num) % num
            //console.log("index : "+index)
            num = robList[index]


            banker = num

            this.gameBegin()
        }

        //��Ϸ��ʼ
    private gameBegin () {
            if (room.gameNumber > 0) {
                log("gameBegin")
                gameState = conf.GS_GAMEING
                //��һ�ο�ʼ��Ϸ������Ϸ��ʼ�ص�
                if (room.gameNumber === room.maxGameNumber) {
                    roomBeginCB(room.roomId, room.agencyId)
                }
                room.gameNumber--
                betAmount = 0
                //������ע��Ϣ
                for (var i = 0; i < GAME_PLAYER; i++) {
                    betList[i] = 0;
                    player[i].isShowCard = false
                }
                if (banker !== -1) {
                    //����ׯ����Ϣ
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        betList[i] = 0;
                        player[i].isBanker = false
                    }
                    //console.log("banker : "+banker)
                    player[banker].isBanker = true
                    player[banker].bankerCount++
                    //�㲥ׯ����Ϣ
                    var notify = {
                        "cmd": "banker",
                        chair: banker
                    }
                    local.sendAll(notify)
                }
                //��ţģʽ���»��ֳ�
                if (room.gameMode == MODE_GAME_BULL) {

                    var notify = {
                        "cmd": "bonusPool",
                        "bonusPool": bonusPool,
                        "bankerScore": player[banker].score,
                        "change": oldBanker !== banker
                    }
                    if (bonusPool == 0 && room.runCount == 0) {
                        bonusPool = room.playerCount * 8
                        player[banker].score -= bonusPool
                        notify.change = true
                        notify.bonusPool = bonusPool
                        notify.bankerScore = player[banker].score
                    } else {
                        //���ֳ�С��������ׯ
                        if (bonusPool < room.playerCount) {
                            player[banker].isBanker = false
                            player[banker].score += bonusPool
                            local.updatePlayerScore(banker)
                            do {
                                banker = (banker + 1) % GAME_PLAYER
                            } while (player[banker].isActive == false || player[banker].isReady == false || player[banker].isOnline == false)
                            bonusPool = room.playerCount * 8
                            player[banker].score -= bonusPool
                            player[banker].isBanker = true
                            bankerTime = 0
                            log("banker change : " + banker)
                            notify.change = true
                            notify.bonusPool = bonusPool
                            notify.bankerScore = player[banker].score
                        }
                    }
                    local.sendAll(notify)
                }
                var index = 0
                //���Ӵ��Ƹ��ʣ�������Ȩ�ؽϵ�ʱ����ϴ��
                var randTimes = 0
                do {
                    randTimes++
                    //ϴ��
                    for (var i = 0; i < cardCount; i++) {
                        var tmpIndex = Math.floor(Math.random() * (cardCount - 0.000001))
                        var tmpCard = cards[i]
                        cards[i] = cards[tmpIndex]
                        cards[tmpIndex] = tmpCard
                    }
                    //����
                    var result = {}
                    index = 0
                    var tmpAllCount = 0     //�������
                    var tmpTypeCount = 0    //����Ȩ��

                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (player[i].isActive && player[i].isReady) {
                            for (var j = 0; j < 5; j++) {
                                player[i].handCard[j] = cards[index++];
                            }
                            tmpAllCount++
                            result[i] = logic.getType(player[i].handCard)
                            //console.log("type : "+result[i].type)
                            tmpTypeCount += conf.typeWeight[result[i].type]
                        }
                    }
                    var dealFlag = false
                    //�ж��Ƿ�����ϴ��
                    if ((tmpTypeCount / tmpAllCount) < conf.TYPE_WEIGHT) {
                        dealFlag = true
                    }
                } while (dealFlag && randTimes < conf.ROUND_TIMES)

                //�ҳ�ʣ����
                var tmpCards = {}
                var tmpCardCount = 0
                for (var i = index; i < cardCount; i++) {
                    tmpCards[tmpCardCount++] = deepCopy(cards[i])
                }

                //ִ�п���
                //�ȼ���ÿ���˵�����ֵ   -1 �� 1֮��
                var luckyValue = {}
                var randomMaxScore = 500 + Math.floor(Math.random() * 300)
                var randomMinScore = 400 + Math.floor(Math.random() * 200)
                for (var i = 0; i < GAME_PLAYER; i++) {
                    if (player[i].isActive && player[i].isReady) {
                        if (player[i].score > 100) {
                            luckyValue[i] = player[i].score / randomMaxScore
                        } else if (player[i].score < -100) {
                            luckyValue[i] = player[i].score / randomMinScore
                        } else {
                            continue
                        }
                        if (luckyValue[i] > 1) {
                            luckyValue[i] = 1
                        } else if (luckyValue[i] < -1) {
                            luckyValue[i] = -1
                        }
                        luckyValue[i] = luckyValue[i] * 0.6
                    }
                }
                //����ţģʽׯ�һ���Ӧ���ϻ��ֳ�
                if (room.gameMode == MODE_GAME_BULL) {
                    var tmpFlag = true
                    if (player[banker].score > 100) {
                        luckyValue[banker] = player[banker].score / randomMaxScore
                    } else if (player[banker].score < -100) {
                        luckyValue[banker] = player[banker].score / randomMinScore
                    } else {
                        tmpFlag = false
                    }
                    if (tmpFlag) {
                        if (luckyValue[banker] > 1) {
                            luckyValue[banker] = 1
                        } else if (luckyValue[banker] < -1) {
                            luckyValue[banker] = -1
                        }
                        luckyValue[banker] = luckyValue[banker] * 0.6
                    }
                }
                //������������ֵ   ֵΪ������Ƹ��ʸ�
                for (var i = 0; i < GAME_PLAYER; i++) {
                    if (player[i].isReady && parseInt(player[i].playerInfo.limits) >= 1) {
                        if (!luckyValue[i]) {
                            luckyValue[i] = 0
                        }
                        luckyValue[i] -= 0.05
                    }
                }
                //�������
                for (var i = 0; i < GAME_PLAYER; i++) {
                    if (player[i].isActive && player[i].isReady) {
                        if (player[i].playerInfo["contorl"] && player[i].playerInfo["contorl"] != 0) {
                            if (!luckyValue[i]) {
                                luckyValue[i] = 0
                            }
                            var contorlValue = parseFloat(player[i].playerInfo["contorl"])
                            luckyValue[i] -= contorlValue
                        }
                    }
                }
                //����ֵ�͵���ִ�п���
                for (var i = 0; i < GAME_PLAYER; i++) {
                    if (luckyValue[i]) {
                        if (player[i].isActive && player[i].isReady) {
                            if (luckyValue[i] < 0) {
                                if (Math.random() < -luckyValue[i]) {
                                    //������
                                    console.log("chair : " + i + "   ������")
                                    logic.changeHandCard(player[i].handCard, tmpCards, tmpCardCount, true)
                                }
                            } else if (luckyValue[i] > 0) {
                                if (Math.random() < luckyValue[i]) {
                                    //������
                                    logic.changeHandCard(player[i].handCard, tmpCards, tmpCardCount, false)
                                }
                            }
                        }
                    }
                }

                //����ģʽ����
                if (room.cardMode == conf.MODE_CARD_SHOW) {
                    var notify = {
                        "cmd": "MingCard"
                    }
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (player[i].isActive && player[i].isReady) {
                            var tmpCards = {}
                            for (var j = 0; j < MING_CARD_NUM; j++) {
                                tmpCards[j] = player[i].handCard[j];
                            }
                            notify.Cards = tmpCards
                            local.sendUid(player[i].uid, notify)
                        }
                    }
                }
                //������ע
                local.betting()
            }
        }
        //��ע�׶�
        local.betting = function () {
            log("betting")
            //״̬�ı�
            gameState = GS_BETTING
            //֪ͨ�ͻ���
            var notify = {
                cmd: "beginBetting",
                banker: banker
            }
            local.sendAll(notify)
            //��ʱ��������һ�׶�
            timer = setTimeout(local.deal, TID_BETTING)

        }
        //���ƽ׶�  �ȴ�̯�ƺ�������
        local.deal = function () {
            log("deal")
            gameState = GS_DEAL
            //�����δ��עĬ����һ��
            //Ĭ�ϵ׷�
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isReady && player[i].isActive && i != banker && betList[i] == 0) {
                    var tmpBet = 1
                    if (room.gameMode === conf.MODE_GAME_BULL) {
                        tmpBet = Math.floor(bonusPool / room.playerCount / 5)
                        if (tmpBet === 0) {
                            tmpBet = 1
                        }
                        if (tmpBet > 40) {
                            tmpBet = 40
                        }
                    }
                    betList[i] = tmpBet
                    betAmount += tmpBet
                    local.betMessege(i, tmpBet)
                }
            }
            var tmpCards = {}
            //����
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isReady) {
                    tmpCards[i] = player[i].handCard
                }
            }
            var notify = {
                "cmd": "deal",
                "handCards": tmpCards
            }
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isActive) {
                    local.sendUid(player[i].uid, notify)
                }
            }

            timer = setTimeout(function () {
                gameState = GS_FREE
                local.settlement()
            }, TID_SETTLEMENT)
        }

        //����׶�
        local.settlement = function () {
            clearTimeout(timer)
            gameState = GS_FREE
            log("settlement")
            room.runCount++
            oldBanker = banker
            //��������
            var result = {}
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isReady) {
                    result[i] = logic.getType(player[i].handCard);
                    //player[i].cardsList[room.runCount] = result[i]
                    cardHistory[i].push(result[i])
                }
            }
            var trueResult = deepCopy(result)
            var bankerResult = result[banker]
            //�����
            var curScores = new Array(GAME_PLAYER)
            for (var i = 0; i < GAME_PLAYER; i++) {
                curScores[i] = 0
            }
            var bankerScoreChange = 0

            switch (room.gameMode) {
                case conf.MODE_GAME_NORMAL :
                case conf.MODE_GAME_CRAZE :
                    //����ģʽ����
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (player[i].isActive && player[i].isReady) {
                            if (i === banker || player[i].isReady != true) continue
                            //�Ƚϴ�С
                            if (logic.compare(result[i], result[banker])) {
                                //�м�Ӯ
                                var award = result[i].award
                                curScores[i] += betList[i] * award
                                curScores[banker] -= betList[i] * award
                            } else {
                                //ׯ��Ӯ
                                var award = result[banker].award
                                curScores[i] -= betList[i] * award
                                curScores[banker] += betList[i] * award
                            }
                        }
                    }
                    //ţţ��ׯģʽ��ׯ
                    if (room.bankerMode == conf.MODE_BANKER_NIUNIU) {
                        var maxResultFlag = false
                        var maxResultIndex = -1
                        for (var i = 0; i < GAME_PLAYER; i++) {
                            if (player[i].isActive && player[i].isReady) {
                                if (result[i].type >= 10) {
                                    if (maxResultFlag == false) {
                                        maxResultFlag = true
                                        maxResultIndex = i
                                    } else {
                                        if (logic.compare(result[i], result[maxResultIndex])) {
                                            maxResultIndex = i
                                        }
                                    }
                                }
                            }
                        }
                        if (maxResultFlag) {
                            banker = maxResultIndex
                        } else {
                            do {
                                banker = (banker + 1) % GAME_PLAYER
                            } while (player[banker].isActive == false || player[banker].isReady == false)
                        }
                    }
                    break
                case conf.MODE_GAME_BULL :
                    //����ţģʽ���Ƚ���ׯ��Ӯ��Ǯ���ٰ����ʹӸߵ��ͽ������Ǯ��ֱ�����ֳ�Ϊ��
                    //����ׯ��Ӯ
                    //console.log(betList)
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (i === banker || player[i].isReady != true) continue
                        if (!logic.compare(result[i], result[banker])) {
                            //ׯ��Ӯ
                            var tmpScore = betList[i] * result[banker].award
                            //console.log("uid : "+player[i].uid+"  chair : "+i+"  lose tmpScore : "+tmpScore)
                            curScores[i] -= tmpScore
                            bankerScoreChange += tmpScore
                            bonusPool += tmpScore
                        }
                    }
                    //console.log("bonusPool : "+bonusPool)
                    //����ׯ����
                    //���Ͱ���С����
                    var tmpUidList = new Array(GAME_PLAYER)
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        tmpUidList[i] = i
                    }
                    //console.log(result)
                    for (var i = 0; i < GAME_PLAYER - 1; i++) {
                        for (var j = 0; j < GAME_PLAYER - 1 - i; j++) {
                            if (!player[tmpUidList[j + 1]].isReady) {
                                continue
                            }
                            if (player[tmpUidList[j]].isReady != true || !logic.compare(result[j], result[j + 1])) {
                                var tmpResult = result[j + 1]
                                result[j + 1] = result[j]
                                result[j] = tmpResult
                                var tmpUid = tmpUidList[j + 1]
                                tmpUidList[j + 1] = tmpUidList[j]
                                tmpUidList[j] = tmpUid
                            }
                        }
                    }
                    //console.log(trueResult)
                    //console.log(tmpUidList)
                    //�����⸶���ʹ���м�
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (tmpUidList[i] === banker || player[tmpUidList[i]].isReady != true) continue
                        if (logic.compare(result[i], bankerResult)) {
                            //�м�Ӯ
                            var tmpScore = betList[tmpUidList[i]] * result[i].award
                            if (tmpScore > bonusPool) {
                                tmpScore = bonusPool
                            }
                            //console.log("uid : "+player[tmpUidList[i]].uid+"  chair : "+tmpUidList[i]+"  win tmpScore : "+tmpScore)
                            curScores[tmpUidList[i]] += tmpScore
                            bankerScoreChange -= tmpScore
                            bonusPool -= tmpScore
                        }
                    }
                    bankerTime++
                    //��ţģʽ���»��ֳ�
                    if (room.gameMode == MODE_GAME_BULL) {
                        var notify = {
                            "cmd": "bonusPool",
                            "bonusPool": bonusPool,
                            "bankerScore": player[banker].score,
                            "change": false
                        }
                        local.sendAll(notify)
                    }
                    //console.log("bonusPool : "+bonusPool)
                    break
                case MODE_GAME_SHIP :
                    //����ģʽ���ռ������˵���ע���ٰ��Ӵ�С�⸶
                    //�ȼ�ȥ��ע��
                    var tmpAllBet = 0
                    //console.log(betList)
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (betList[i] && typeof(betList[i]) == "number" && player[i].isReady) {
                            curScores[i] -= betList[i]
                            tmpAllBet += betList[i]
                        }
                    }
                    //����
                    var tmpUidList = new Array(GAME_PLAYER)
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        tmpUidList[i] = i
                    }

                    //console.log(result)
                    for (var i = 0; i < GAME_PLAYER - 1; i++) {
                        for (var j = 0; j < GAME_PLAYER - 1 - i; j++) {
                            if (player[tmpUidList[j + 1]].isReady != true) {
                                continue
                            }
                            if (player[tmpUidList[j]].isReady != true || !logic.compare(result[j], result[j + 1])) {
                                var tmpUid = tmpUidList[j + 1]
                                tmpUidList[j + 1] = tmpUidList[j]
                                tmpUidList[j] = tmpUid
                                var tmpResult = result[j + 1]
                                result[j + 1] = result[j]
                                result[j] = tmpResult
                            }
                        }
                    }
                    //console.log(result)
                    log("curScores==================")
                    log(curScores)
                    //�������⸶
                    for (var i = 0; i < GAME_PLAYER; i++) {
                        if (betList[tmpUidList[i]] && typeof(betList[tmpUidList[i]]) == "number" && player[tmpUidList[i]].isReady) {
                            var tmpScore = betList[tmpUidList[i]] * result[i].award + betList[tmpUidList[i]]
                            if (tmpScore > tmpAllBet) {
                                tmpScore = tmpAllBet
                            }
                            log("award : " + tmpScore)
                            tmpAllBet -= tmpScore
                            curScores[tmpUidList[i]] += tmpScore
                        }
                    }

                    break
            }
            //���ָı�
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (curScores[i] != 0) {
                    local.changeScore(i, curScores[i])
                }
            }
            //������ע��Ϣ
            for (var i = 0; i < GAME_PLAYER; i++) {
                betList[i] = 0;
                player[i].isShowCard = false
            }
            if (room.gameMode === conf.MODE_GAME_BULL) {
                notify.bankerTime = bankerTime
                curScores[oldBanker] = bankerScoreChange
            }
            var realScores = {}
            //�������ʵ�ʷ���
            for (var i = 0; i < GAME_PLAYER; i++) {
                realScores[i] = player[i].score
            }
            //���͵��ֽ�����Ϣ
            var notify = {
                "cmd": "settlement",
                "result": trueResult,
                "curScores": curScores,
                "realScores": realScores,
                "player": player,
                "bankerTime": bankerTime
            }
            local.sendAll(notify)
            //��¼�ƾ���ˮ
            var stream = {}
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isActive && player[i].isReady) {
                    stream[i] = {
                        "uid": player[i].uid,
                        "result": trueResult[i],
                        "handCard": deepCopy(player[i].handCard),
                        "changeScore": curScores[i]
                    }
                }
            }
            room.MatchStream[room.runCount] = stream
            //��������
            for (var i = 0; i < GAME_PLAYER; i++) {
                player[i].isReady = false;
                betList[i] = 0;
                player[i].isBanker = false
            }
            readyCount = 0
            if (room.gameNumber <= 0) {
                local.gameOver()
            }
        }
        //�ܽ���
        local.gameOver = function (flag) {
            clearTimeout(timer)
            //����ţģʽׯ�һ�������ϻ��ֳ�
            if (room.gameMode === conf.MODE_GAME_BULL) {
                player[banker].score += bonusPool
                bonusPool = 0
            }
            //�ܽ���
            room.state = true
            var notify = {
                "cmd": "gameOver",
                "player": player,
                "cardHistory": cardHistory
            }

            local.sendAll(notify)
            room.endTime = (new Date()).valueOf()
            var tmpscores = {}
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isActive) {
                    tmpscores[player[i].uid] = player[i].score
                }
            }
            room.scores = tmpscores
            //������Ϸ
            roomCallBack(room.roomId, player, flag, local.init)
        }
        //���ָı�
        local.changeScore = function (chair, score) {
            player[chair].score += score;
            // var notify = {
            //   "cmd" : "changeScore",
            //   "chair" : chair,
            //   "difference" : score,
            //   "score" : player[chair].score
            // }
            // local.sendAll(notify)
        }

        //�㲥��Ϣ
        local.sendAll = function (notify) {
            room.channel.pushMessage('onMessage', notify)
        }

        //ͨ��uid ������Ϣ
        local.sendUid = function (uid, notify) {
            if (room.channel.getMember(uid)) {
                var tsid = room.channel.getMember(uid)['sid']
                channelService.pushMessageByUids('onMessage', notify, [{
                    uid: uid,
                    sid: tsid
                }]);
            }
        }

        //���µ�����һ���
        local.updatePlayerScore = function (chair) {
            var notify = {
                "cmd": "updatePlayerScore",
                "chair": chair,
                "score": player[chair].score
            }
            local.sendAll(notify)
        }

        //�����ʼ��
        local.init = function () {
            //console.log("enter init=====================================")
            room.gameMode = 0                    //��Ϸģʽ
            room.gameNumber = 0                  //��Ϸ����
            room.maxGameNumber = 0               //��Ϸ������
            room.consumeMode = 0                 //����ģʽ
            room.bankerMode = 0                 //��ׯģʽ
            room.needDiamond = 0                 //��ʯ����
            //��������
            room.state = true                    //����״̬��trueΪ�ɴ���
            room.playerCount = 0                //�������������
            readyCount = 0                   //��Ϸ׼������
            gameState = GS_FREE              //��Ϸ״̬
            room.chairMap = {}                   //���UID�����Ӻ�ӳ���
            banker = -1                      //ׯ�����Ӻ�
            roomHost = -1                    //�������Ӻ�
            timer = undefined                //��ʱ�����
            //��Ϸ����
            robState = new Array(GAME_PLAYER) //��ׯ״̬��¼
            cards = {}                       //����
            cardCount = 0                    //����ʣ������
            for (var i = 1; i <= 13; i++) {
                for (var j = 0; j < 4; j++) {
                    cards[cardCount++] = {num: i, type: j}
                }
            }
            //console.log("enter init=====================================111111111111111")
            //��ע��Ϣ
            betList = new Array(GAME_PLAYER)
            betAmount = 0
            //����ţģʽ���ֳ�
            bonusPool = room.playerCount * 8
            //�������
            player = {}
            for (var i = 0; i < GAME_PLAYER; i++) {
                local.initChairInfo(i)
            }
            //console.log("enter init=====================================222")
            //channel���
            channelService.destroyChannel(roomId)
            room.channel = channelService.getChannel(roomId, true)
            //console.log(room.channel)
        }
        //��ʼ��������Ϣ
        local.initChairInfo = function (chiar) {
            player[chiar] = {}
            player[chiar].chair = chiar             //���Ӻ�
            player[chiar].uid = 0                   //uid
            player[chiar].isActive = false          //��ǰ�������Ƿ�����
            player[chiar].isOnline = false          //����Ƿ�����
            player[chiar].isReady = false           //׼��״̬
            player[chiar].isBanker = false          //�Ƿ�Ϊׯ��
            player[chiar].isShowCard = false        //�Ƿ���
            player[chiar].handCard = new Array(5)   //����
            player[chiar].score = 0                 //��ǰ����
            player[chiar].bankerCount = 0           //��ׯ����
            //player[chiar].cardsList  = {}           //��ս���б�
            player[chiar].ip = undefined           //���ip��ַ
        }
        //�����Ƿ��ѿ�ʼ��Ϸ
        publish
        isBegin()
        {
            if (room.runCount === 0 && gameState === conf.GS_FREE) {
                return false
            } else {
                return true
            }
        }
        //�����Ƿ����
        publish
        isFree()
        {
            return gameState === conf.GS_FREE
        }
        //��ȡ��������
        publish
        getPlayerCount()
        {
            var count = 0
            for (var i = 0; i < GAME_PLAYER; i++) {
                if (player[i].isActive) {
                    count++
                }
            }
            return count
        }
        //��ɢ��Ϸ
        publish
        finishGame(flag)
        {
            //��Ϸһ�ֶ�û��ʼ�򲻿���ʯ
            if (room.runCount == 0) {
                room.needDiamond = 0
                room.isRecord = false
            }
            room.gameNumber = 0
            local.gameOver(flag)
        }
        //�û��˳�
    public
        userQuit(uid, cb)
        {
            //�ٴ�ȷ����Ϸδ��ʼ
            if (room.isBegin()) {
                return
            }
            var chair = room.chairMap[uid]
            room.playerCount--
            //�����˳���ɢ����
            if (chair == roomHost) {
                room.finishGame()
            } else {
                //�����λ��Ϣ
                local.initChairInfo(chair)
                var tsid = room.channel.getMember(uid)['sid']
                if (tsid) {
                    room.channel.leave(uid, tsid)
                }
                delete room.chairMap[uid]
                var notify = {
                    cmd: "userQuit",
                    uid: uid,
                    chair: chair
                }
                local.sendAll(notify)
                cb()
            }
        }

        return room
    }

}

class RoomConfig {
}

class Player {
}

