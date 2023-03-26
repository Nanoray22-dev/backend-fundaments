"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.remove = exports.create = exports.getByAlte = exports.getById = exports.getByOcuppation = exports.getAll = void 0;
const datasourse_1 = require("../datasourse");
const heroe_entity_1 = require("./models/heroe.entity");
const heroRepository = datasourse_1.AppDataSource.getRepository(heroe_entity_1.Hero);
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heroes = yield heroRepository.find();
    return res.json(heroes);
});
exports.getAll = getAll;
const getByOcuppation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { occupation } = req.params;
    const heroByOccupation = yield heroRepository.findOneBy({ occupation });
    if (!heroByOccupation) {
        return res.status(404).json({
            message: `The occupation ${occupation} not found`
        });
    }
    res.json(heroByOccupation);
});
exports.getByOcuppation = getByOcuppation;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hero = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!hero) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        });
    }
    res.json(hero);
});
exports.getById = getById;
const getByAlte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte } = req.params;
    const hero = yield heroRepository.findOneBy({ alte });
    if (!hero) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        });
    }
    res.json(hero);
});
exports.getByAlte = getByAlte;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte, name, occupation, novia } = req.body;
    const oldHero = yield heroRepository.findOneBy({ alte });
    if (oldHero) {
        return res
            .status(400)
            .json({
            message: `Hero ${alte} already exists`
        });
    }
    const newHero = heroRepository.create({ alte, name, occupation, novia });
    yield heroRepository.insert(newHero);
    res.json(newHero);
});
exports.create = create;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oldHero = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!oldHero) {
        return res
            .status(404)
            .json({
            message: `Hero with id: ${id} not found`
        });
    }
    const deletedHero = yield heroRepository.delete({ id: Number.parseInt(id) });
    res.json({
        affectedRows: deletedHero,
    });
});
exports.remove = remove;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { alte, name, occupation, novia } = req.body;
    const heroById = yield heroRepository.findOneBy({ id: Number.parseInt(id) });
    if (!heroById) {
        return res
            .status(404)
            .json({
            message: `Hero with id ${id} not found`
        });
    }
    if (alte) {
        const oldHero = yield heroRepository.findOneBy({ alte });
        if (oldHero && oldHero.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                message: `Hero ${alte} already exists`
            });
        }
    }
    const updatedHero = heroRepository.create({
        id: heroById.id,
        alte: alte ? alte : heroById.alte,
        name: name ? name : heroById.name,
        occupation: occupation ? occupation : heroById.occupation,
        novia: novia ? novia : heroById.novia
    });
    yield heroRepository.save(updatedHero);
    res.json(updatedHero);
});
exports.update = update;
