import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import { tipoActaCabildoRepository } from "@domain/repositories/actas-cabildo/tipo-acta-cabildo";

export class ListCatUseCase {
  constructor(private catActasCabildoRepository: tipoActaCabildoRepository) {}
  async execute(): Promise<tipoActaCabildo[]> {
    return await this.catActasCabildoRepository.list();
  }
}
