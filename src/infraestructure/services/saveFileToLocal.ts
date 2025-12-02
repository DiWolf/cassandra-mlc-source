import fs from "fs";
import path from "path";

/**
 * Guarda un nuevo archivo en una subcarpeta dentro de `public`,
 * eliminando el archivo anterior si existe.
 *
 * @param file - Archivo nuevo recibido (ej. desde multer)
 * @param subfolder - Subcarpeta dentro de `public` (ej. "regulaciones", "licitaciones")
 * @param newFilename - Nombre del nuevo archivo
 * @param oldFilename - Nombre del archivo anterior a eliminar (opcional)
 * @returns Ruta relativa del nuevo archivo SIN el prefijo /public (ej. "regulaciones/archivo.pdf")
 */
export async function saveFileToLocal(
  file: Express.Multer.File,
  subfolder: string,
  newFilename: string,
  oldFilename?: string
): Promise<string> {
  try {
    const baseDir = path.join(process.cwd(), "public", subfolder);

    // Crear subcarpeta si no existe
    await fs.promises.mkdir(baseDir, { recursive: true });

    const newFilePath = path.join(baseDir, newFilename);

    if (oldFilename) {
      const oldFilePath = path.join(baseDir, oldFilename);
      try {
        await fs.promises.unlink(oldFilePath);
        console.log(`Archivo anterior eliminado: ${oldFilePath}`);
      } catch (err: any) {
        if (err.code !== "ENOENT") {
          console.error("Error al eliminar archivo viejo:", err);
          throw new Error("No se pudo eliminar el archivo anterior.");
        } else {
          console.warn("Archivo anterior no encontrado:", oldFilename);
        }
      }
    }

    await fs.promises.writeFile(newFilePath, file.buffer);
    console.log(`Archivo guardado: ${newFilePath}`);

    // Devuelve solo la ruta relativa limpia (sin /public)
    return `${subfolder}/${newFilename}`;
  } catch (err) {
    console.error("Error en reemplazo de archivo:", err);
    throw new Error("Error al guardar el archivo en el servidor.");
  }
}
