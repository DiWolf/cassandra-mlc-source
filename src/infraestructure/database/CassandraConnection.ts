import { Client, mapping, types } from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

class CassandraClient {
  private client: Client;
  private keyspace: string;
  private isConnected: boolean;

  constructor() {
    this.keyspace = process.env.CASSANDRA_KEYSPACE as string;

    this.client = new Client({
      contactPoints: (process.env.CASSANDRA_HOSTS || "127.0.0.1").split(","),
      localDataCenter: process.env.CASSANDRA_DATACENTER || "datacenter1",
      credentials: {
        username: process.env.CASSANDRA_USERNAME || "",
        password: process.env.CASSANDRA_PASSWORD || "",
      },
      keyspace: this.keyspace,
    });

    this.isConnected = false;
    this.registerProcessHandlers();
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        console.log("Conectado a Cassandra en el keyspace:", this.keyspace);
        this.isConnected = true;
      } catch (error) {
        console.error("Error al conectar a Cassandra:", error);
        throw error;
      }
    }
  }

  /**
   * Ejecutar una consulta CQL
   */
  async execute(query: string, params: any[] = [], options: { prepare?: boolean; fetchSize?: number; pageState?: string } = {}): Promise<any> {
    try {
      await this.connect();
      const result = await this.client.execute(query, params, {
        prepare: true,
        ...options,
      });
      return result;
    } catch (error) {
      console.error("Error al ejecutar consulta:", error);
      throw error;
    }
  }

  /**
   * Ejecutar múltiples consultas en un Batch
   * @param queries - Array de { query: string, params: any[] }
   * @param options - Opciones adicionales (e.g., consistencia)
   */
  async batch(
    queries: { query: string; params: any[] }[],
    options: { consistency?: number } = {}
  ): Promise<void> {
    try {
      await this.connect();
  
      // Validar las consultas antes de ejecutarlas
      if (!Array.isArray(queries) || queries.length === 0) {
        throw new Error("El array de consultas está vacío o no es válido.");
      }
  
      queries.forEach((q, index) => {
        if (!q.query || !Array.isArray(q.params)) {
          throw new Error(`Consulta mal formada en índice ${index}: ${JSON.stringify(q)}`);
        }
      });
  
      await this.client.batch(
        queries.map(({ query, params }) => ({ query, params })),
        { prepare: true, ...options }
      );
  
      console.log(`Batch completado con ${queries.length} operaciones.`);
    } catch (error:any) {
      console.error("Error al ejecutar batch:", error.message);
      throw error;
    }
  }
  

  async close(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.client.shutdown();
        console.log("Conexión a Cassandra cerrada.");
        this.isConnected = false;
      } catch (error) {
        console.error("Error al cerrar la conexión:", error);
      }
    }
  }

  private registerProcessHandlers(): void {
    process.on("SIGINT", async () => {
      console.log("Recibido SIGINT. Cerrando conexión a Cassandra...");
      await this.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("Recibido SIGTERM. Cerrando conexión a Cassandra...");
      await this.close();
      process.exit(0);
    });

    process.on("exit", async (code) => {
      console.log(`Proceso terminado con código: ${code}. Cerrando conexión a Cassandra...`);
      await this.close();
    });
  }
}

export default new CassandraClient();
