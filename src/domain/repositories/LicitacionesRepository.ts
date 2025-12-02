import Licitaciones from "@domain/entities/Licitaciones";

export interface LicitacionesRepository {
  create(licitacion: Licitaciones): Promise<Licitaciones>;
  getAll(
    limite: number,
    anio: number,
    pageState?: string // Estado de paginación
  ): Promise<{ data: Licitaciones[]; nextPageState: string | null }>;
}
