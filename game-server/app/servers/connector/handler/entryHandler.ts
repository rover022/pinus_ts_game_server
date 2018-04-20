import {Application} from 'pinus';
import {FrontendSession} from 'pinus';
import {createConnection} from "typeorm";
import {User} from "../../../entity/User";

export default function (app: Application) {
    return new EntryHandler(app);
}

export enum UserVar {
    vo = "uservo"
}


export class EntryHandler {

    constructor(private app: Application) {
        //let s:Demo
    }

    /**
     * New client entry chat server.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next stemp callback
     * @return {Void}
     */
    async enter(msg: { rid: string, username: string }, session: FrontendSession) {
        console.log("有人进来了3");
        let self = this;
        //玩家是否在数据库
        let uservo = this.checkUserID(msg.rid);
        if (!uservo) {
            return {
                code: 501,
                error: true
            };
        }

        let rid = msg.rid;
        let uid = msg.username + '*' + rid;
        let sessionService = self.app.get('sessionService');
        //玩家是否二次登陆
        if (!!sessionService.getByUid(uid)) {
            return {
                code: 500,
                error: true
            };
        }
        await session.abind(uid);
        //设置通道
        session.set('rid', rid);
        session.set(UserVar.vo, uservo);
        //
        session.push('rid', function (err) {
            if (err) {
                console.error('set rid for session service failed! error is : %j', err.stack);
            }
        });
        session.on('closed', this.onUserLeave.bind(this));

        // put user into channel
        let users = await self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true);

        return {
            users: users
        };
    }

    /**
     * 玩家下注逻辑
     * @param {{rid: string; username: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<{code: number; error: boolean}>}
     */
    async onUserBet(msg: { rid: string, username: string, money: number }, session: FrontendSession) {
        let rid = msg.rid;
        let uid = msg.username + '*' + rid;
        let sessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(uid)) {
            //玩家不合法
            return {
                code: 500,
                error: true
            };
        }
        //
        let uservo: User = session.get(UserVar.vo);
        //检查玩家是否有这么多的钱
        if (uservo.money < msg.money) {
            return {
                code: 502,
                error: true
            };
        }
        //赋值
        uservo.money -= msg.money;
        uservo.bet_money = msg.money;
        //
    }


    /**
     * User log out handler
     *
     * @param {Object} app current application
     * @param {Object} session current session object
     *
     */
    onUserLeave(session: FrontendSession) {
        if (!session || !session.uid) {
            return;
        }
        this.app.rpc.chat.chatRemote.kick(session, session.uid, this.app.get('serverId'), session.get('rid'));
    }

    /**
     * 检查玩家是否在数据库里面
     * @param {string} rid
     */
    checkUserID(rid: string): User {
        //
        console.log("start find user data from db");
        createConnection().then(async connection => {
            // here you can start to work with your entities
            let photoRepository = await connection.getRepository(User);
            let user = photoRepository.find({name: rid});
            console.log("All published photos: ", user);
            return user
        }).catch(error => console.log(error));
        return null;
    }

}