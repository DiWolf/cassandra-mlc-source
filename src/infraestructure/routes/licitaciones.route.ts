import { Router } from "express";
import multer from "multer";
import {
  CreateLicitacionUseCase,
  UploadLicitacionUseCase,
  ListAllLicitacionUseCase,
} from "@application/use-cases/licitaciones-use-cases";
import { LicitacionRepositoryImpl } from "@infraestructure/repositories/liciataciones/index";
import { LicitacionesController } from "@infraestructure/controllers/licitaciones/Licitaciones-Controller";

const router = Router();
const upload = multer({ dest: "uploads/" });
const uploadAzure = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Dependencias
const licitacionesRepository = new LicitacionRepositoryImpl();
const createLicitacion = new CreateLicitacionUseCase(licitacionesRepository);
const uploadLicitacion = new UploadLicitacionUseCase();
const findAllLicitacion = new ListAllLicitacionUseCase(licitacionesRepository);
const licitacionesController = new LicitacionesController(
  createLicitacion,
  uploadLicitacion,
  findAllLicitacion
);

// Rutas

router.post(
  "/",
  uploadAzure.single("licitacion_file"),
  licitacionesController.create.bind(licitacionesController)
);
router.get("/", async (req: any, res: any, next) => {
  try {
    const data = await licitacionesController.findAll(res);
    // Emitir evento de Socket.IO
    const io = req.app.get("socketio"); // Recuperar la instancia de Socket.IO
    io.emit("licitacionesListadas", data); // Notificar a todos los clientes conectados

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.log(error);
    console.error("Error al listar licitaciones:", error.message);
    next(error);
  }
});

// Nunca borrar esta ruta, gestiona los archivos
// router.post("/upload", upload.single("licitacion_file"),licitacionesController.uploadPdf.bind(licitacionesController));
router.post(
  "/upload",
  upload.single("licitacion_file"),
  async (req: any, res: any) => {
    const { data } = await licitacionesController.uploadPdf(req, res);
    return res.status(200).json({ success: true, ...data });
  }
);

//router.get("/", licitacionesController.findAll.bind(licitacionesController));

export default router;
