import Licitaciones from "@domain/entities/Licitaciones";
import { LicitacionesRepository } from "@domain/repositories/LicitacionesRepository";

export class CrearLicitacion {
    constructor(private LicitacionesRepository: LicitacionesRepository){}

    async create(licitacion: Licitaciones): Promise<Licitaciones> {
        return this.LicitacionesRepository.create(licitacion);
    }
}