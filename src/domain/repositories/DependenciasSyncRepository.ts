import DependenciasSync from "@domain/entities/DependenciasSync";

export interface IDependenciaRepository {
    fetchAll(): Promise<DependenciasSync[]>;
    save(dependencias: DependenciasSync[]): Promise<void>;
}