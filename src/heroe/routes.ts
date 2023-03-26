import { Router } from "express";
import { getAll, getByAlte, getByOcuppation,create, remove, update, getById } from "./controller";

export const heroeRoute = Router();

heroeRoute.get('/', getAll);

heroeRoute.get('ocuppation/:ocuppation', getByOcuppation);

heroeRoute.get('/alte/:alte', getByAlte);

heroeRoute.get('/:id', getById);

heroeRoute.post('/', create);

heroeRoute.delete('/:id', remove);

heroeRoute.put('/:id', update);