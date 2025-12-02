import { types } from 'cassandra-driver';
interface ProtestaDto {
    id?: types.Uuid,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    correo: string,
    tramite: number,
    dependencia: number,
    folio: string,
    ligaTramite?: string,
    tipoProtesta: string,
    descripcionHechos: string,
    fechaHechos: Date,
    lugarHechos: string,
    servidorPublico: string,
    motivo: string
}

export default ProtestaDto;