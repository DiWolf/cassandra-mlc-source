import { ITramiteRepository } from '@domain/repositories/TramitesSyncRepository';

export class SyncTramitesUseCase {
  constructor(
    private mysqlRepository: ITramiteRepository,
    private cassandraRepository: ITramiteRepository
  ) {}

  async execute(): Promise<void> {
    const tramites = await this.mysqlRepository.fetchAll();
    if (tramites.length > 0) {
        
      await this.cassandraRepository.save(tramites);
      console.log('Datos sincronizados correctamente.');
    } else {
      console.log('No hay datos para sincronizar.');
    }
  }
}
