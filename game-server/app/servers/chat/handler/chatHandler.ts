import {ChatRemote} from '../remote/chatRemote';
import {Application} from 'pinus';
import {FrontendSession} from 'pinus';

export default function (app: Application) {
    return new ChatHandler(app);
}

export class ChatHandler {
    constructor(private app: Application) {
    }

    /**
     * Send messages to users
     *
     * @param {Object} msg message from client
     * @param {Object} session
     * @param  {Function} next next stemp callback
     *
     */
    async send(msg: { content: string, target: string }, session: FrontendSession) {
        console.log("看看是否编译出来3");
        let rid = session.get('rid');
        let username = session.uid.split('*')[0];
        let channelService = this.app.get('channelService');
        let param = {
            msg: msg.content,
            from: username,
            target: msg.target
        };
        let channel = channelService.getChannel(rid, false);

        // the target is all users
        if (msg.target === '*') {
            channel.pushMessage('onChat', param);
        }
        // the target is specific user
        else {
            let tuid = msg.target + '*' + rid;
            let tsid = channel.getMember(tuid)['sid'];

            channelService.pushMessageByUids('onChat', param, [{
                uid: tuid,
                sid: tsid
            }]);
        }
    }

    /**
     * 获取用户信息
     * @param {{content: string; target: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<void>}
     */
    async getUserInfor(msg: { content: string, target: string }, session: FrontendSession) {

    }

    /**
     * 保存用户信息
     * @param {{content: string; target: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<void>}
     */
    async setUserInfor(msg: { content: string, target: string }, session: FrontendSession) {

    }

    /**
     * 用户加入
     * @param {{content: string; target: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<void>}
     */
    async joinUser(msg: { content: string, target: string }, session: FrontendSession) {

    }

    /**
     * 移除用户
     * @param {{content: string; target: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<void>}
     */
    async removeUser(msg: { content: string, target: string }, session: FrontendSession) {

    }

    /**
     * 获取排行榜
     * @param {{content: string; target: string}} msg
     * @param {FrontendSession} session
     * @returns {Promise<void>}
     */
    async getGameScoreList(msg: { content: string, target: string }, session: FrontendSession) {

    }







}