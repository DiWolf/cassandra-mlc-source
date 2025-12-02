import { IDependenciaRepository } from "@domain/repositories/DependenciasSyncRepository";

export class dependenciaSyncUseCase {
  constructor(
    private mysqlRepository: IDependenciaRepository,
    private cassandraRepository: IDependenciaRepository
  ) {}

  async execute(): Promise<void> {
    const dependencias = await this.mysqlRepository.fetchAll();
    if (dependencias.length > 0) {
      await this.cassandraRepository.save(dependencias);
      console.log(`Datos sicronizados correctamente.`);
    } else {
      console.log(`No hay datos para sincronizar`);
    }
  }
}
