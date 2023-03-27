import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Villain{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column('text')
    name!: String

    @Column('text')
    weakness!:String

    @Column('text')
    SuperVillain!: String
}