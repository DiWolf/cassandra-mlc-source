import { Request, Response } from "express";
import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import {
  CreateCatUseCase,
  UpdateCatUseCase,
  ListCatUseCase,
  FindOneCatUseCase,
} from "@application/use-cases/actas-cabildo";

export class TIpoActaCatController {
  constructor(
    private createCatActa: CreateCatUseCase,
    private updateCatActa: UpdateCatUseCase,
    private findAllCatActa: ListCatUseCase,
    private findOneCatActa: FindOneCatUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      // Validar datos de entrada (opcional, pero recomendado)
      const { clave, descripcion } = req.body;

      // Ejecutar caso de uso
      const result = await this.createCatActa.execute(clave, descripcion);

      // Responder éxito
      res.status(201).json({
        success: true,
        message: result, // Mensaje retornado por el caso de uso
      });
    } catch (error) {
      // Capturar errores y responder
      console.error("Error al crear categoría:", error);

      res.status(500).json({
        success: false,
        message: "Error al crear categoría. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido", // Retorna mensaje del error si existe
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const input = req.body as tipoActaCabildo;

      const result = await this.updateCatActa.execute(input);
      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Error al actualizar la categoría. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido", // Retorna mensaje del error si existe
      });
    }
  }

  async findAll(res: Response): Promise<void> {
    try {
      const result = (await this.findAllCatActa.execute()) as tipoActaCabildo[];
      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Error al listar las categorías. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido", // Retorna mensaje del error si existe
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as unknown as number;
      const result = (await this.findOneCatActa.execute(id)) as tipoActaCabildo;
      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Error al listar las categorías. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido", // Retorna mensaje del error si existe
      });
    }
  }
}
