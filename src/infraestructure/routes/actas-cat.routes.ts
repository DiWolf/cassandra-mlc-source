import {
  CreateCatUseCase,
  UpdateCatUseCase,
  ListCatUseCase,
  FindOneCatUseCase,
} from "@application/use-cases/actas-cabildo";
import { TIpoActaCatController } from "@infraestructure/controllers/actas-cabildo/TipoActa-CatController";
import { CatActasCabildoRepositoryImpl } from "@infraestructure/repositories/actas-cabildo";
import { Router } from "express";

const router = Router();

const actasCatRepository = new CatActasCabildoRepositoryImpl();

// Implementamos casos de uso
const createCatActa = new CreateCatUseCase(actasCatRepository);
const updateCatRepository = new UpdateCatUseCase(actasCatRepository);
const findAllCatRepository = new ListCatUseCase(actasCatRepository);
const findOneCatRepository = new FindOneCatUseCase(actasCatRepository);

// Los inyectamos
const catActasController = new TIpoActaCatController(
  createCatActa,
  updateCatRepository,
  findAllCatRepository,
  findOneCatRepository
);

router.post("/", catActasController.create.bind(catActasController));
router.patch("/", catActasController.update.bind(catActasController));
router.get("/", catActasController.findAll.bind(catActasController));
router.get("/:id", catActasController.findOne.bind(catActasController));

export default router;
