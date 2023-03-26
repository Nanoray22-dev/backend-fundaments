"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const heroe_entity_1 = require("./heroe/models/heroe.entity");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource({
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
    entities: [heroe_entity_1.Hero]
});
exports.AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
