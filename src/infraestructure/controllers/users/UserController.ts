import {
  CreateUserUseCase,
  getInfoUserTokenUseCase,
} from "@application/use-cases/users";
import Users from "@domain/entities/users/Users";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private createUser: CreateUserUseCase,
    private getInfoUser: getInfoUserTokenUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const user = req.body as Users;
      const result = await this.createUser.execute(user);

      res.status(201).json({
        success: true,
        message: result,
      });
    } catch (error) {
      // Capturar errores y responder
      console.error("Error al crear usuario:", error);

      res.status(500).json({
        success: false,
        message: "Error al crear usuario. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido", // Retorna mensaje del error si existe
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this.getInfoUser.execute(username, password);

      // Configurar la cookie con el token
      res.cookie("token", token, {
        httpOnly: true, // Evita acceso desde JavaScript
        secure: process.env.NODE_ENV === "production", // HTTPS solo en producción
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" en producción, "lax" en dev
        maxAge: 28800000,
      });

      res.status(200).json({ success: true, message: "Autenticación exitosa" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error al obtener información del usuario.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }
}
