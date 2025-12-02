import { Router } from "express";
import { Request, Response } from "express";
import {
  CreatedRegUseCase,
  findAllRegUseCase,
  findOneRegUseCase,
  findAllCategoriasRegulacionUseCase,
  UpdateRegUseCase,
  findAllRegUseCaseWithoutPaginationUseCase,
  CreateCategoriaRegulacionUseCase,
  FindOneCategoriaRegulacionUseCase,
  UpdateCategoriaRegulacionUseCase,
  deleteRegulacionUseCase,
} from "@application/use-cases/regulaciones/";
import multer from "multer";
import { RegulacionesRepositoryImpl } from "@infraestructure/repositories/regulaciones";
import { CategoriasRegulacionesRepositoryImpl } from "@infraestructure/repositories/categoria-regulaciones";
import { RegulacionesController } from "@infraestructure/controllers/regulaciones/regulaciones-controller";

import { CategoriaRegulacionesController } from "@infraestructure/controllers/regulaciones/categorias-regulaciones-controller";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Dependencias
const regulacionesRepository = new RegulacionesRepositoryImpl();
const categoriaRegulacionesRepository =
  new CategoriasRegulacionesRepositoryImpl();

const createRegulacion = new CreatedRegUseCase(regulacionesRepository);
const findaAllRegulaciones = new findAllRegUseCase(regulacionesRepository);
const findoneRegulacion = new findOneRegUseCase(regulacionesRepository);
const updateRegulacion = new UpdateRegUseCase(regulacionesRepository);
const findAllRegUseCaseWithoutPagination =
  new findAllRegUseCaseWithoutPaginationUseCase(regulacionesRepository);
const deleteRegulacion = new deleteRegulacionUseCase(regulacionesRepository);
// Regulaciones categoria
const findAllRegulacionesCategory = new findAllCategoriasRegulacionUseCase(
  categoriaRegulacionesRepository
);
const createCategoriaRegulacion = new CreateCategoriaRegulacionUseCase(
  categoriaRegulacionesRepository
);
const findOneCategoriaRegulacion = new FindOneCategoriaRegulacionUseCase(
  categoriaRegulacionesRepository
);
const updateCategoriaRegulacion = new UpdateCategoriaRegulacionUseCase(
  categoriaRegulacionesRepository
);

const regulacionesController = new RegulacionesController(
  createRegulacion,
  findaAllRegulaciones,
  findoneRegulacion,
  updateRegulacion,
  findAllRegUseCaseWithoutPagination,
  deleteRegulacion
);

const categoriaRegulacionController = new CategoriaRegulacionesController(
  findAllRegulacionesCategory,
  createCategoriaRegulacion,
  findOneCategoriaRegulacion,
  updateCategoriaRegulacion
);

router.post(
  "/",
  upload.single("descargables"),
  regulacionesController.create.bind(regulacionesController)
);
router.post(
  "/categoria-regulacion",
  categoriaRegulacionController.create.bind(categoriaRegulacionController)
);
router.get("/", regulacionesController.findAll.bind(regulacionesController));
router.get(
  "/sin-paginacion",
  regulacionesController.findAllRegUseCaseWithoutPagination.bind(
    regulacionesController
  )
);

router.get(
  "/categoria-regulacion",
  categoriaRegulacionController.findAll.bind(categoriaRegulacionController)
);
router.get(
  "/categoria-regulacion/:id",
  categoriaRegulacionController.findOne.bind(categoriaRegulacionController)
);
router.get("/:id", regulacionesController.findOne.bind(regulacionesController));
router.put(
  "/",
  upload.single("descargables"),
  regulacionesController.update.bind(regulacionesController)
);
router.put(
  "/categoria-regulacion",
  categoriaRegulacionController.update.bind(categoriaRegulacionController)
);

router.delete(
  "/:id",
  regulacionesController.deleteRegulacion.bind(regulacionesController)
);

export default router;
