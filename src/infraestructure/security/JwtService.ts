import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtService {
    private secret: string;
    private expiresIn: string;

    constructor(secret: string, expiresIn: string ) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token: string): object | null {
        try {
            const decoded = jwt.verify(token, this.secret);
            
            // Verifica si el valor decodificado es un objeto (JwtPayload)
            if (typeof decoded === "object" && decoded !== null) {
                return decoded; // Devuelve el payload decodificado
            }
            
            // Si es un string, devuelve null o maneja según sea necesario
            return null;
        } catch (error) {
            console.error("Token inválido:", error);
            return null;
        }
    }
}
