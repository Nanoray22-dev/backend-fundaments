import { Request, Response } from "express";
import { Hero as HeroModel} from "./interface";
import { AppDataSource } from "../datasources";
import { Hero } from "./models/heroe.entity";

const heroRepository = AppDataSource.getRepository(Hero);

export const getAll = async (req: Request, res: Response) => {

    const heroes = await heroRepository.find();
    return res.json(heroes);
}
export const getByOcuppation = async (req:Request, res:Response) => {
    const { occupation } = req.params 
    const heroByOccupation = await heroRepository.findOneBy({occupation})

    if(!heroByOccupation){
        return res.status(404).json(
            {
                message: `The occupation ${occupation} not found`
            }
        )
    }
    res.json(heroByOccupation)
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const hero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        })
    }

    res.json(hero);
}

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const hero = await heroRepository.findOneBy({ alte });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        })
    }

    res.json(hero);
}

export const create = async (req: Request, res: Response) => {

    const { alte, name, occupation,novia } = req.body;

    const oldHero = await heroRepository.findOneBy({ alte });

    if (oldHero) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }

    const newHero = heroRepository.create({alte,name,occupation,novia })
    await heroRepository.insert(newHero);

    res.json(newHero);
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.params;

    const oldHero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldHero) {
        return res
            .status(404)
            .json({
                message: `Hero with id: ${id} not found`
            })
    }

    const deletedHero = await heroRepository.delete({ id: Number.parseInt(id) });

    res.json({
        affectedRows: deletedHero,
    });
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, name,occupation, novia  } = req.body;

    const heroById = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!heroById) {
        return res
            .status(404)
            .json({
                message: `Hero with id ${id} not found`
            })
    }

    if (alte) {
        const oldHero = await heroRepository.findOneBy({ alte });

        if (oldHero && oldHero.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                    message: `Hero ${alte} already exists`
                })
        }
    }
        const updatedHero = heroRepository.create({
            id: heroById.id,
            alte: alte? alte: heroById.alte,
            name: name? name: heroById.name,
            occupation: occupation? occupation: heroById.occupation,
            novia: novia? novia: heroById.novia
        });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}