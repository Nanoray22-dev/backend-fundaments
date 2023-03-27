import express from 'express';
import { heroeRoute } from './heroe/routes';
import { AppDataSource } from './datasources';
import { Hero } from './heroe/models/heroe.entity';

const port = 3000;
const app = express();

app.use(express.json());

app.use('/heroe/', heroeRoute);
// AppDataSource.getRepository(Heroe)
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});