import TipoProstesta from "@domain/entities/TipoProtesta";
import { ProtestaRepository } from "@domain/repositories/ProtestaRepository";

export class ListarTipoProtesta {
    constructor(private protestaRepository: ProtestaRepository) {}
    async listarTipoProtesta(): Promise<TipoProstesta[]>
    {
        return await this.protestaRepository.listarTipoProtesta();
    }
}