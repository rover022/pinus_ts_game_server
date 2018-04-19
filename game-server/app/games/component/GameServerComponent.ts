import {IComponent} from "pinus";

export class GameServerComponent implements IComponent {
    name = "GameServerComponent";

    afterStart(cb: () => void) {
        console.log(this.name, "afterStart")
    };

    afterStartAll() {

    };

    beforeStart(cb: () => void) {

    };

    start(cb: () => void) {

    };

    stop(force: boolean, cb: () => void) {
        console.log(this.name, "stop")
    };


}