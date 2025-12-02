import TramiteSync from "@domain/entities/TramiteSync";

export interface ITramiteRepository {
  fetchAll(): Promise<TramiteSync[]>;
  save(tramites: TramiteSync[]): Promise<void>;
}
