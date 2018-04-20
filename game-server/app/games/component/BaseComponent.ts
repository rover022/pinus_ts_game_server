import {IComponent} from "pinus";

export class BaseComponent implements IComponent {
    afterStart(cb: () => void): void {
        console.log("BaseComponent出生")
    };

    afterStartAll(): void {

    };

    beforeStart(cb: () => void): void {

    }

    name: string;

    start(cb: () => void): void {

    }

    stop(force: boolean, cb: () => void): void {
        console.log("BaseComponent挂掉")
    }

}