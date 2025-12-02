import { Response, Request } from "express";

import {
  getAllTipoProtestaCiudadanaUseCase,
  getAllMotivoProtestaCiudadanaUseCase,
} from "@application/use-cases/protesta-ciudadana-use-cases";
export class ProtestaCiudadanaController {
  constructor(
    private getAllTipoProtestaCiudadana: getAllTipoProtestaCiudadanaUseCase,
    private getAllMotivoProtestaCiudadana: getAllMotivoProtestaCiudadanaUseCase
  ) {}
  async getAllTipoProtesta(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.getAllTipoProtestaCiudadana.execute();
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error al obtener los tipos de protesta ciudadana:", error);

      res.status(500).json({
        success: false,
        message: "Error al obtener los tipos de protesta ciudadana.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }
  async getAllMotivoProtesta(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.getAllMotivoProtestaCiudadana.execute();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(
        "Error al obtener los motivos de protesta ciudadana:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Error al obtener los motivos de protesta ciudadana.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }
}
