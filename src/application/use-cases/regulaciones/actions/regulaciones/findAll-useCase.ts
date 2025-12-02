import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class findAllRegUseCaseWithoutPaginationUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}
  async execute(): Promise<CatalogoRegulaciones[]> {
    return this.regulacionesRepository.findAllRegUseCaseWithoutPagination();
  }
}
