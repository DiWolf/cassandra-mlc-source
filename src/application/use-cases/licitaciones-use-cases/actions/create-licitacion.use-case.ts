import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import { LicitacionRepository } from "@domain/repositories/licitaciones/licataciones";

export class CreateLicitacionUseCase {
    constructor(private licitacionesRepository: LicitacionRepository) {}
    async execute(entry: LicitacionesDTO):Promise<LicitacionesDTO> {
        return this.licitacionesRepository.created(entry)
    }
}