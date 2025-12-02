
import { processPdfAdjusted } from "@infraestructure/services/ocrService";

export class UploadLicitacionUseCase {
  constructor() {}

  async execute(pdfPath: string): Promise<{ [key: string]: string | null }> {
    // Procesar el PDF para extraer el texto y dividirlo en secciones
    const extractedData = await processPdfAdjusted(pdfPath);

    // Retornar los datos extraídos
    return {
      numero_licitacion: extractedData.numero_licitacion,
      descripcion_servicios: extractedData.descripcion_servicios,
      junta_aclaraciones: extractedData.junta_aclaraciones,
      presentacion_propuestas: extractedData.presentacion_propuestas,
      fallo_adju: extractedData.fallo_adju,
      informacion_bases: extractedData.informacion_bases,
    };
  }
}
