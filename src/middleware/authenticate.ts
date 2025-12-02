import { Request,  NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const authenticate = (req: Request, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        req.user = null; // Usuario no autenticado
        
        return next();
    }

    const token = authHeader.split(" ")[1]; // Formato: "Bearer <token>"
    console.log(token);
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload; // Adjuntar los datos del token al objeto `req`
        next();
    } catch (error) {
      
        req.user = null; // Token inválido
        next();
    }
};
