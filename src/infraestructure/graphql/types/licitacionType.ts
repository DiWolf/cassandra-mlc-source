export const licitacionType = `

type Licitacion {
  id: String! # Identificador único
  nombre: String! # Nombre de la licitación
  resumen: String! # Resumen breve
  vigencia: String! # Rango de fechas de vigencia
  juntaAclaraciones: DateTime! # Fecha y hora de la junta de aclaraciones
  propuestas: DateTime! # Fecha y hora de la presentación de propuestas
  falloAdjudicacion: DateTime! # Fecha y hora del fallo de adjudicación
  archivo: String! # Ruta o enlace del archivo relacionado
  publicada: Boolean! # Indica si está publicada
  anio: Int! # Año de la vigencia (para filtrado)
}


`;
