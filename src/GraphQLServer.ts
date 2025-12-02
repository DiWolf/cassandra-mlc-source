// src/server.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./infraestructure/graphql/schema";
import { rootResolver } from "./interfaces/graphql/resolvers";
import { applyMiddleware } from "graphql-middleware";
// Definir el tipo Upload como escalar
const { graphqlUploadExpress  } = require("graphql-upload");
import cors from "cors";
import { JwtService } from "@infraestructure/security/JwtService";
import { permissions } from "@middleware/permissions";
import { authenticate } from "@middleware/authenticate";

import poolMysql from "@infraestructure/database/DatabaseMySqlConnection";

import CassandraConnection from "@infraestructure/database/CassandraConnection";
import { CassandraTramiteRepository } from "@infraestructure/database/sync/CassandraTramiteRepository";
import { MySQLTramiteRepository } from "@infraestructure/database/sync/MySQLTramiteRepository";

import { CassandraDependenciaSyncRepository } from "@infraestructure/database/sync/CassandraDependenciaSyncRepository";
import { MySqlDependenciaRepository } from "@infraestructure/database/sync/MySqlDependenciaRepository";

// Casos de uso 
import { SyncTramitesUseCase } from "@application/use-cases/SyncTramitesUseCase";
import { dependenciaSyncUseCase } from "@application/use-cases/dependenciassync-use-case";

// Procesos de sincronización 
const mysqlRepository = new MySQLTramiteRepository(poolMysql);
const cassandraRepository = new CassandraTramiteRepository(CassandraConnection);

const mysqlRepositoryDependencias = new MySqlDependenciaRepository(poolMysql);
const cassandraRepositoryDependencias = new CassandraDependenciaSyncRepository(CassandraConnection)

// Casos de uso 
const syncTramitesUseCase = new SyncTramitesUseCase(mysqlRepository,cassandraRepository)
const syncDependenciasUseCase = new dependenciaSyncUseCase(mysqlRepositoryDependencias,cassandraRepositoryDependencias)

export class GraphQLServer {
  private protectedSchema = applyMiddleware(schema, permissions);

  private app: Express;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.configureGraphQL();
   
  }

  // Método para configurar GraphQL
  private configureGraphQL(): void {

    syncTramitesUseCase.execute();
    syncDependenciasUseCase.execute();
   
    this.app.use(authenticate);
    this.app.use(
      cors({
        origin: "*",
        credentials: false,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      })
    );
    this.app.use(
      "/graphql",
      graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 1 }),
      graphqlHTTP((req: any) => ({
        schema: this.protectedSchema,
        rootValue: rootResolver,
        graphiql: true,
        context: {
          user: req.user || null,
        },
      }))
    );
  }

  // Método para agregar middlewares adicionales

  // Método para iniciar el servidor
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}/graphql`);
    });
  }

  // Método opcional para agregar middlewares adicionales
  public addMiddleware(middleware: any): void {
    this.app.use(middleware);
  }
}
