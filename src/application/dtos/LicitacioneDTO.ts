interface LicitacionesDTO {
  id: string; // Identificador único
  numeroLicitacion: string; // Nombre de la licitación
  descripcion: string; // Resumen breve
  aclaraciones: string; // Vigencia
  propuestas: string; // Fecha y hora de la junta de aclaraciones
  adjudicacion: string; // Fecha y hora del fallo de adjudicación
  bases: string; // Ruta o enlace del archivo relacionado
  archivo: string; // Ruta o enlace del archivo relacionado
  fechaPublicacion: Date; // Fecha de publicación
  fechaAdjudicacion: Date; // Fecha de adjudicación
  estado: Boolean; // Estado de la licitación
}
export default LicitacionesDTO;
