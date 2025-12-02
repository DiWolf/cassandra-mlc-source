import { Request, Response } from "express";
import {
  CreatedRegUseCase,
  findAllRegUseCase,
  findOneRegUseCase,
  UpdateRegUseCase,
  findAllRegUseCaseWithoutPaginationUseCase,
  deleteRegulacionUseCase
} from "@application/use-cases/regulaciones";
import fs from "fs";
import path from "path";
import { saveFileToLocal } from "@infraestructure/services/saveFileToLocal";
export class RegulacionesController {
  constructor(
    private createdRegulacion: CreatedRegUseCase,
    private findaAll: findAllRegUseCase,
    private findoneusecase: findOneRegUseCase,
    private updatedRegulacion: UpdateRegUseCase,
    private findAllRegUseCaseWithoutPaginationUseCase: findAllRegUseCaseWithoutPaginationUseCase,
    private deleteRegulacionUseCase: deleteRegulacionUseCase
  ) {}

  // created

  async create(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const file = req.file;

    // Validaciones previas
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No se proporcionó ningún archivo.",
      });
    }

    try {
      const subfolder = "regulaciones";
      const filename = `${Date.now()}-${file.originalname}`;

      // Guardar archivo localmente
      const rutaRelativa = await saveFileToLocal(file, subfolder, filename);

      // Guardar en la base de datos
      const result = await this.createdRegulacion.execute({
        ...data,
        descargables: rutaRelativa,
      });

      const io = req.app.get("socketio");
      io.emit("regulacionCreadaPublicada", result);

      return res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en el proceso:", error.message);

      // Opcional: eliminar el archivo si falló el guardado en DB
      try {
        await fs.promises.unlink(
          path.join(
            __dirname,
            "..",
            "public",
            "regulaciones",
            `${Date.now()}-${file.originalname}`
          )
        );
        console.log("Archivo local eliminado tras fallo.");
      } catch (deleteError: any) {
        console.warn(
          "No se pudo eliminar el archivo tras fallo:",
          deleteError.message
        );
      }

      return res.status(500).json({
        success: false,
        message: "Error al procesar la solicitud",
        details: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const data = req.body;
    const file = req.file;
    let rutaRelativa = null;

    try {
      if (file) {
        const subfolder = "regulaciones";
        const newFilename = `${Date.now()}-${file.originalname}`;

        // Obtener nombre de archivo anterior (solo nombre, sin carpeta)
        const regulacionExistente = await this.findoneusecase.execute(data.id);
        const archivoAnterior = regulacionExistente?.descargables
          ?.split("/")
          .pop();

        rutaRelativa = await saveFileToLocal(
          file,
          subfolder,
          newFilename,
          archivoAnterior
        );
      }

      // Ejecutar actualización
      const result = await this.updatedRegulacion.execute({
        ...data,
        ...(rutaRelativa ? { descargables: rutaRelativa } : {}),
      });

      const io = req.app.get("socketio");
      io.emit("regulacionActualizada", result);

      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error al actualizar:", error.message);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar la regulación",
        details: error.message,
      });
    }
  }

  // findall
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Extraer y convertir parámetros de consulta (query params)
      const l = req.query;
      const { page, pageSize, categoriaId } = req.query;

      const options = {
        page: page ? parseInt(page as string, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize as string, 10) : undefined,
        categoriaId: categoriaId ? (categoriaId as string) : undefined,
      };

      // Ejecutar la lógica con los parámetros
      const result = await this.findaAll.execute(options);

      // Responder con los datos obtenidos
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en findAll:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al obtener las regulaciones.",
      });
    }
  }

  // findOne
  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const result = await this.findoneusecase.execute(id);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "No encontrado" });
      }
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en findOne:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al obtener la regulación.",
      });
    }
  }

  // findAllRegUseCaseWithoutPagination
  async findAllRegUseCaseWithoutPagination(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const result =
        await this.findAllRegUseCaseWithoutPaginationUseCase.execute();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error(
        "Error en findAllRegUseCaseWithoutPagination:",
        error.message
      );
      res.status(500).json({
        error: "Ocurrió un error al obtener las regulaciones sin paginación.",
      });
    }
  }

  // deleteRegulacion
  async deleteRegulacion(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const result = await this.deleteRegulacionUseCase.execute(id);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, message: "No encontrado" });
      }
      res.status(200).json({ success: true, message: "Regulacion eliminada con exito. " + result });
    } catch (error: any) {
      console.error("Error en deleteRegulacion:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al eliminar la regulación.",
      });
    }
  }

}
