import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    money: number;

    @Column()
    lastlogin: number;
    /**
     * 下注金额
     */
    bet_money: number;

}
