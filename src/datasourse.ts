import { DataSource, Entity } from "typeorm"
import { Heroe } from './heroe/models/heroe.entity';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Sa123456",
    database: "backendalterna",
    // synchronize: true,
    logging: true,
    options: {
        encrypt: false,
    },
    entities: [Heroe]
});
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))