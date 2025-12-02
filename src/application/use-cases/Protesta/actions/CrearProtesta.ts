import ProtestaCiudadana from "@domain/entities/Protesta";
import { ProtestaRepository } from "@domain/repositories/ProtestaRepository";

export class CrearProtesta {
    constructor(private protestaRepository: ProtestaRepository) { }

    async create(protesta: ProtestaCiudadana): Promise<string> {
        return this.protestaRepository.create(protesta);
    }
}