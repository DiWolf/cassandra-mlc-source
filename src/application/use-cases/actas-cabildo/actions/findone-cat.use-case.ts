import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import { tipoActaCabildoRepository } from "@domain/repositories/actas-cabildo/tipo-acta-cabildo";

export class FindOneCatUseCase {
  constructor(private catActasCabildoRepository: tipoActaCabildoRepository) {}
  async execute(id: number): Promise<tipoActaCabildo> {
    return await this.catActasCabildoRepository.find(id);
  }
}
