import express from 'express';
import { villainRoute } from './Villain/routes';
import { AppDataSource } from './datasources';
import { Villain } from './Villain/SuperVillain/Vilain.entity';

const port = 3001;
const app = express();

app.use(express.json());

app.use('/villain', villainRoute);
// AppDataSource.getRepository(Heroe)
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});