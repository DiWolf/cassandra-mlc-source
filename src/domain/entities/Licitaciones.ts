interface Licitaciones {
  id?: string;
  nombre: string;
  descripcion: string;
  vigencia: string;
  junta_aclaraciones: Date;
  propuestas: Date;
  fallo_adjudicacion: Date;
  archivo: string;
  publicada: boolean;
  created_at: Date;
  vigencia_anio: number;
}
export default Licitaciones;