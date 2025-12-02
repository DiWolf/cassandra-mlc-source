import fs from "fs";

import { AzureBlobStorageService } from "./../../infraestructure/storage/AzureBlobStorageService";
import { LicitacionesRepositoryImpl } from "@infraestructure/repositories/licitaciones/LicitacionesRepositoryImpl";
import { CrearLicitacion } from "@application/use-cases/Licitaciones";
import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import { UploadFileUseCase } from "@application/use-cases/Storage-Service/IStorageService";
import { FileUpload } from "src/types/express/FileUpload";
import Licitaciones from "@domain/entities/Licitaciones";
import LicitacionesMapper from "@domain/mappers/LicitacionesMapper";
import { ListarLicitaciones } from "@application/use-cases/Licitaciones/actions/LisarLicitaciones";

const licitacionesRepo = new LicitacionesRepositoryImpl();
const crearLitacionRepo = new CrearLicitacion(licitacionesRepo);
const listarLicitaciones = new ListarLicitaciones(licitacionesRepo);
// Azure
const storageService = new AzureBlobStorageService();
const uploadFileUseCase = new UploadFileUseCase(storageService);
export const licitacionesResolver = {
  crearLicitacion: async ({ licitacion }: { licitacion: LicitacionesDTO }) => {
    try {
      console.log(licitacion);
      const { archivo } = licitacion;
      let file = archivo as unknown as FileUpload;
      const { filename, createReadStream, mimetype } = file.file;
      const stream = createReadStream();
      // TODO: Manejo de archivos subidos
      // Estas líneas implementan el guardado de archivos en un directorio local, pero no se utilizarán en este proyecto.
      // Si en un futuro se requiere manejar subidas de archivos localmente, este código puede activarse.

      //   const uploadPath = path.join(__dirname, "../../../uploads", filename);
      //   await new Promise((resolve, reject) => {
      //     const out = fs.createWriteStream(uploadPath);
      //     stream.pipe(out);
      //     out.on("finish", resolve);
      //     out.on("error", reject);
      //   });
      const fileContent = await streamToBuffer(stream);

      const url = await uploadFileUseCase.execute(
        "publico",
        `licitaciones/${filename}`,
        fileContent,
        mimetype
      );
      licitacion.archivo = url;
      // Mapeamos el DTO a la información de la base d edatos
      const licitaciones: Licitaciones =
        LicitacionesMapper.mapDTOToLicitaciones(licitacion);
      return await crearLitacionRepo.create(licitaciones);
    } catch (error) {
      console.log(error);
      throw new Error("Error: Ocurrió un error en el servidor");
    }

    function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", (err) => reject(err));
      });
    }
  },
  listarLicitaciones: async (
    args: { pagina: number; limite: number; anio: number; pageState?: string },
    __: any
  ) => {
    try {
      // Llama al servicio para obtener los datos y el estado de paginación
      const { data: licitaciones, nextPageState } =
        await listarLicitaciones.getAll(
          args.limite,
          args.anio,
          args.pageState
        );

      // Retorna los datos y el estado de la siguiente página
      return {
        licitaciones,
        nextPageState,
      };
    } catch (error) {
      console.error("Error al listar las licitaciones:", error);
      throw new Error("Error al listar las licitaciones");
    }
  },
};
