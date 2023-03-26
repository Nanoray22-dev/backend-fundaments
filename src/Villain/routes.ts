import { Router } from "express";
import { getAll,getByWeakness,getById,getByVillain,create,remove,update } from "../Villain/Controller";

export const villainRoute = Router();

villainRoute.get('/', getAll)

villainRoute.get('SuperVillain/:superVillain', getByVillain)

villainRoute.get('weakness/:weakness', getByWeakness)

villainRoute.get('/:id', getById);

villainRoute.post('/', create);

villainRoute.delete('/:id', remove);

villainRoute.put('/:id', update);