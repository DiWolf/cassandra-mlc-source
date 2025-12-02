export const ProtestaInpunt = `
  
    input ProtestaInput {
     nombre: String!
      primerApellido: String!
      segundoApellido: String
      correo: String!
      tramite: Int!
      dependencia: Int!
      folio: String
      ligaTramite: String
      tipoProtesta: String!
      descripcionHechos: String!,
      fechaHechos: DateTime!,
      lugarHechos: String!,
      servidorPublico: String,
      motivo: String
    }
    `