import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import { tipoActaCabildoRepository } from "@domain/repositories/actas-cabildo/tipo-acta-cabildo";

export class UpdateCatUseCase {
  constructor(private catActasCabildoRepository: tipoActaCabildoRepository) {}
  async execute(cat: tipoActaCabildo) {
    return await this.catActasCabildoRepository.update(cat);
  }
}
