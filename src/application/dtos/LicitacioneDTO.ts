interface LicitacionesDTO {
  id: string; // Identificador único
  nombre: string; // Nombre de la licitación
  resumen: string; // Resumen breve
  vigencia: string; // Vigencia
  juntaAclaraciones: Date; // Fecha y hora de la junta de aclaraciones
  propuestas: Date; // Fecha y hora de la presentación de propuestas
  falloAdjudicacion: Date; // Fecha y hora del fallo de adjudicación
  archivo: string; // Ruta o enlace del archivo relacionado
  publicada: boolean; // Indica si está publicada
  anio: number; // Año de la vigencia (para filtrado)
}
export default LicitacionesDTO;
