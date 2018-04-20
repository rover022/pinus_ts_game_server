import {IComponent, Application} from "pinus";
import Timer = NodeJS.Timer;

enum GameRoute {
    onBetStart = "onBetStart",
    onGameResult = "onGameResult",
}

/**
 * 游戏逻辑服务器
 * 1负责分发消息出去
 * 2时间计算
 */
export class GameServerComponent {
    private static instance: GameServerComponent;
    public name: string = "GameServerComponent";
    public timer: Timer;
    public gametimer: number = 60;
    public readonly max_game_timer: number = 60;
    public app: Application;
    public rid: string = "1";

    public static getInstance(): GameServerComponent {
        if (this.instance == null) {
            this.instance = new GameServerComponent();
        }
        return this.instance;
    }

    /**
     * 注册应用
     * @param {Application} _app
     */
    resgiter(_app: Application) {
        if (GameServerComponent.instance == null) {
            GameServerComponent.instance = new GameServerComponent();
        }
        this.app = _app;
    }

    unresgiter() {
        this.app = null;
        clearInterval(this.timer);
    }

    constructor() {
        //super.constructor()
        //console.log("GameServerComponent 出生2");
        this.gametimer = 60;
        this.rid = "1";
        this.timer = setInterval(this.update.bind(this), 1000);
    }

    update() {
        this.gametimer--;
        if (this.gametimer == 30) {
            this.noticeAllClientBet();
        }
        if (this.gametimer == 0) {
            this.noticeAllClientResult();
        }
        console.log(this.gametimer);
    }


    /**
     * 通知所有客户端下注
     */
    noticeAllClientBet() {
        // let rid = session.get('rid');
        // let username = session.uid.split('*')[0];
        let channelService = this.app.get('channelService');
        let param = {
            msg: "this.noticeAllClientResult:",
            from: "system",
            target: "*"
        };
        let channel = channelService.getChannel(this.rid, false);
        if (channel) {
            channel.pushMessage(GameRoute.onBetStart, param);
        }
    }

    /**
     * 通知所有客户端发牌结果
     */
    noticeAllClientResult() {
        let channelService = this.app.get('channelService');
        let param = {
            msg: "this.noticeAllClientResult:",
            from: "system",
            target: "*"
        };
        let channel = channelService.getChannel(this.rid, false);
        if (channel) {
            channel.pushMessage(GameRoute.onGameResult, param);
        }
    }

    //
    // afterStart: (cb: () => void) => void;
    // afterStartAll: () => void;
    // beforeStart: (cb: () => void) => void;
    // name: string;
    // start: (cb: () => void) => void;
    // stop: (force: boolean, cb: () => void) => void;

    // name = "GameServerComponent";
    //
    // afterStart(cb: () => void) {
    //     console.log(this.name, "afterStart")
    // };
    //
    // afterStartAll() {
    //
    // };
    //
    // beforeStart(cb: () => void) {
    //
    // };
    //
    // start(cb: () => void) {
    //     console.log(this.name, "start");
    // };
    //
    // stop(force: boolean, cb: () => void) {
    //     console.log(this.name, "stop");
    // };


}