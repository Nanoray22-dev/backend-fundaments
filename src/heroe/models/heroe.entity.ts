import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Heroe {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    name!: string;

    @Column('text')
    alte!: string;
} 
// documentacion 
// entry Level 0-6
// junior 6meses-2
// mid-level
// senior
// crud / sql view / procedure / trigger / join / subquery 
// ORM, Framework