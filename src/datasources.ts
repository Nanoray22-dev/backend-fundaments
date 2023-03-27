import { DataSource, Entity } from "typeorm"
import { Hero } from './heroe/models/heroe.entity';
import 'reflect-metadata';
import { Villain } from "./heroe/models/Vilain.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Sa123456",
    database: "SUPERVILLAIN",
    // synchronize: true,
    logging: true,
    options: {
        encrypt: false,
    },
    entities: [Villain,Hero]
});
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))