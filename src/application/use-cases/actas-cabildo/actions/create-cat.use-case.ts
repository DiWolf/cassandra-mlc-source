import { tipoActaCabildoRepository } from "@domain/repositories/actas-cabildo/tipo-acta-cabildo";
export class CreateCatUseCase {
  constructor(private catActasCabildoRepository: tipoActaCabildoRepository) {}
  async execute(clave: string, descripcion: string): Promise<string> {
    return this.catActasCabildoRepository.create(clave, descripcion);
  }
}
