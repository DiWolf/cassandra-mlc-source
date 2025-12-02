import {
  getAllTipoProtestaCiudadanaUseCase,
  getAllMotivoProtestaCiudadanaUseCase,
} from "@application/use-cases/protesta-ciudadana-use-cases";
import { ProtestaCiudadanaController } from "@infraestructure/controllers/protesta-ciudadana/protesta-ciudadana-controller";
import { ProtestaCiudadanaRepositoryImpl } from "@infraestructure/repositories/protesta-ciudadana";
import { Router } from "express";

const router = Router();

const protestaCiudadanaRepository = new ProtestaCiudadanaRepositoryImpl();

// Implementamos casos de uso
const getAllTipoProtestaCiudadana = new getAllTipoProtestaCiudadanaUseCase(
  protestaCiudadanaRepository
);
const getAllMotivoProtestaCiudadana = new getAllMotivoProtestaCiudadanaUseCase(
  protestaCiudadanaRepository
);

// Los inyectamos
const protestaCiudadanaController = new ProtestaCiudadanaController(
  getAllTipoProtestaCiudadana,
  getAllMotivoProtestaCiudadana
);

router.get(
  "/tipos-protesta",
  protestaCiudadanaController.getAllTipoProtesta.bind(
    protestaCiudadanaController
  )
);
router.get(
  "/motivos-protesta",
  protestaCiudadanaController.getAllMotivoProtesta.bind(
    protestaCiudadanaController
  )
);
export default router;
