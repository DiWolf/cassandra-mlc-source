export const LicitacionesInput = `
 
 
input LicitacionInput {
  nombre: String! # Nombre de la licitación
  resumen: String! # Resumen breve
  vigencia: String! # Rango de fechas de vigencia
  juntaAclaraciones: DateTime! # Fecha y hora de la junta de aclaraciones
  propuestas: DateTime! # Fecha y hora de la presentación de propuestas
  falloAdjudicacion: DateTime! # Fecha y hora del fallo de adjudicación
  archivo: Upload! # Archivo subido (procesado para guardar y extraer nombre)
}



`;
