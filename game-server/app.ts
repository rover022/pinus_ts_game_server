import {pinus} from 'pinus';
import * as  routeUtil from './app/util/routeUtil';
import {preload} from './preload';
import {createRobotPlugin} from 'pinus-robot-plugin';
import {GameServerComponent} from "./app/games/component/GameServerComponent";
import {BaseComponent} from "./app/games/component/BaseComponent";

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
let app = pinus.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            heartbeat: 3,
            useDict: true,
            useProtobuf: false,
        });
    //配置组件
    console.log("配置游戏逻辑组件", app.type);
    //let gamec = new GameServerComponent();
    //app.load("GameServerComponent", new GameServerComponent());
    //app.load(helloWorld, {interval: 5000});
    app.load(new BaseComponent());
    app.afterStart((err ?: Error) => {
        // console.log("err", err);
        // console.log("result", result);
        console.log("connector 服务器要启动了注册组件");
        GameServerComponent.getInstance().resgiter(app);

    });
    app.beforeStopHook(() => {
        console.log("connector 服务器要关闭了")
    });
    console.log("check:" + app.serverType);
    // GameServerComponent.instance.resgiter(app);
    // app.getCurServer().
});

app.configure('production|development', 'gate', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            useProtobuf: false
        });

});

// app configure
app.configure('production|development', function () {
    // route configures
    app.route('chat', routeUtil.chat);
    // filter configures
    app.filter(new pinus.filters.timeout());
});

app.configure('development', function () {
    // enable the system monitor modules
    // app.enable('systemMonitor');
});

if (app.isMaster()) {
    // app.use(createRobotPlugin({scriptFile: __dirname + '/robot/robot.js'}));
}

// start app
app.start();