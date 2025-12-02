import { Request, Response } from "express";
import {
  findAllCategoriasRegulacionUseCase,
  CreateCategoriaRegulacionUseCase,
  FindOneCategoriaRegulacionUseCase,
  UpdateCategoriaRegulacionUseCase
} from "@application/use-cases/regulaciones";

export class CategoriaRegulacionesController {
  constructor(
    private findAllCateRegulaciones: findAllCategoriasRegulacionUseCase,
    private createCategoriaRegulacion: CreateCategoriaRegulacionUseCase,
    private findOneCategoriaRegulacion: FindOneCategoriaRegulacionUseCase,
    private updateCategoriaRegulacion: UpdateCategoriaRegulacionUseCase
  ) {}

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.findAllCateRegulaciones.execute();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en findAll:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al obtener las regulaciones.",
      });
    }
  }
  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const result = await this.findOneCategoriaRegulacion.execute(id);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en findOne:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al obtener la categoría de regulación.",
      });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const entry = req.body;
      const result = await this.createCategoriaRegulacion.execute(entry);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en create:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al crear la categoría de regulación.",
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const entry = req.body;
      const result = await this.updateCategoriaRegulacion.execute(entry);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error("Error en update:", error.message);
      res.status(500).json({
        error: "Ocurrió un error al actualizar la categoría de regulación.",
      });
    }
  }

}
