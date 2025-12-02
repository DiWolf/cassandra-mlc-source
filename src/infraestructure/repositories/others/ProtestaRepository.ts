import cassandraClient from "@infraestructure/database/CassandraConnection";
export class ProtestaRepositoryTotal {
  constructor() {}

  async obtenerConsecutivoDelMes(fecha: Date): Promise<number> {
    const inicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const inicioSiguienteMes = new Date(
      fecha.getFullYear(),
      fecha.getMonth() + 1,
      1
    );

     const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;


    const query = `
      SELECT COUNT(*) AS total
FROM protesta_ciudadana
WHERE mes_anio = ? 


    `;

    const params = [mesAnio];
    const result = await cassandraClient.execute(query, params);
    return result.rows[0]?.total; // Total de protestas
  }
}
