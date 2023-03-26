import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Hero {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    name!: string;

    @Column('varchar')
    alte!: string;

    @Column('varchar')
    occupation!: string;

    @Column('bit')
    novia!:boolean
} 





// documentacion 
// entry Level 0-6 meses
// junior 6 meses - 2 años
// mid-level
// senior
// crud / sql view / procedure / trigger / join / subquery 
// ORM, Framework