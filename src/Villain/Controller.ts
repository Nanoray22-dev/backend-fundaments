import {Request, Response} from "express"
import { Villain as SuperVillain} from "./interfaces"
import { AppDataSource } from "../datasources"
import { Villain } from "./SuperVillain/Vilain.entity"

const villainRepository = AppDataSource.getRepository(Villain);

export const getAll = async ( req:Request,res:Response) =>{
    const villain = await villainRepository.find();
    return res.json(villain)
}

export const getByWeakness = async( req:Request, res:Response) => {
    const { weakness } = req.params
    const villainByWeakness = await villainRepository.findOneBy({weakness:false})

    if(!villainByWeakness){
        return res.status(404).json(
            {
                message: `the weakness ${weakness} not found`
            }
        )
    }
    res.json(villainByWeakness)
}
export const getById = async (req:Request, res:Response) => {
    const { id } = req.params
    const villain = await villainRepository.findOneBy({id:Number.parseInt(id)})

    if(!villain){
        return res.status(404).json(
            {
                message: `villain with id: ${id} not found`
            }
        )
    }
    res.json(villain)
}   
export const getByVillain =async (req:Request, res:Response) => {
    const { superVillain } = req.params
    const villain = await villainRepository.findOneBy({SuperVillain: true}) 

    if(villain){
        return res.status(404).json(
            {
                message: `SuperVillain ${superVillain} not found`
            }
        )
    }
    res.json(superVillain)
}

export const create = async ( req:Request, res:Response) => {
    const {name, weakness, SuperVillain} = req.body

    const oldVillain = await villainRepository.findOneBy({name})

    if(oldVillain){
        return res.status(400).json(
            {
                message: `Villain ${name} already exits`
            }
        )
    }
    const newVillain = villainRepository.create({name, weakness, SuperVillain})
    await villainRepository.insert(newVillain)
    res.json(newVillain)
}

export const remove = async ( req:Request, res:Response) => {
    const { id } = req.params
    const oldVillain = await villainRepository.findOneBy({id: Number.parseInt(id)})
    if (oldVillain){
        res.status(404).json(
            {
                message: `Villain with id: ${ id } not found `

            }
        )
    }
    const deleteVillain = await villainRepository.delete({id: Number.parseInt(id)})
    res.json({
        affectedRows: deleteVillain
    })
}

export const update = async ( req:Request, res:Response) => {
    const { id } = req.params;
    const { name, weakness, SuperVillain} = req.body
     const villainById = await villainRepository.findOneBy({id: Number.parseInt(id)});
    if(!villainById){
        return res.status(404).json(
            {
                message: `Villain with id ${ id } not found`
            }
        )
    }
    if(name){
        const oldVillain = await villainRepository.findOneBy({name})
        if(oldVillain && oldVillain.id !== Number.parseInt(id)){
            return res.status(404).json(
                {
                    message: `Vilain ${name} already exist`
                }
            )
        }
    }
    const updateVillain = villainRepository.create({
        id: villainById.id,
        name: name? name: villainById.name,
        weakness: weakness? weakness: villainById.weakness,
        SuperVillain: SuperVillain? SuperVillain: villainById.SuperVillain
    })
    await villainRepository.save(updateVillain)
    res.json(updateVillain)
}
