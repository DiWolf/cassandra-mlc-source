import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Importar módulo HTTP para crear el servidor
/** Rutas */
import catActasCabildoRouter from "@infraestructure/routes/actas-cat.routes";
import userRouter from "@infraestructure/routes/user.routes";
import licitacionesRouter from "@infraestructure/routes/licitaciones.route";
import protestaCiudadanaRouter from "@infraestructure/routes/protesta-ciudadana.route";
import regulacionesRouter from "@infraestructure/routes/regulaciones.route";
// Otros
import { configureSocketServer } from "@infraestructure/frameworks/socket/socketServer";
import poolMysql from "@infraestructure/database/DatabaseMySqlConnection";

// Casos de uso para sincronización
import { MySqlDependenciaRepository } from "@infraestructure/database/sync/MySqlDependenciaRepository";
import { MySQLTramiteRepository } from "@infraestructure/database/sync/MySQLTramiteRepository";
import { PostgreSqlTramitesRepository } from "@infraestructure/database/sync/PostgreSqlTramitesRepository";
import { PostgreSqlDependenciaRepository } from "@infraestructure/database/sync/PostgreSqlDependenciaRepository";
import { SyncTramitesUseCase } from "@application/use-cases/SyncTramitesUseCase";
import { dependenciaSyncUseCase } from "@application/use-cases/dependenciassync-use-case";
import path from "path";

// Repositorio de dependencias
const mysqlRepositoryTramite = new MySQLTramiteRepository(poolMysql);
const postgreRepositoryTramite = new PostgreSqlTramitesRepository();
const mysqlRepositoryDependencia = new MySqlDependenciaRepository(poolMysql);
const postgreRepositoryDependencia = new PostgreSqlDependenciaRepository();

// Casos de uso
const sycTramitesUseCase = new SyncTramitesUseCase(
  mysqlRepositoryTramite,
  postgreRepositoryTramite
);

const syncDependenciasUseCase = new dependenciaSyncUseCase(
  mysqlRepositoryDependencia,
  postgreRepositoryDependencia
);

// Ejecutar caso de uso
sycTramitesUseCase.execute();
syncDependenciasUseCase.execute();
const app = express();
const server = http.createServer(app);
// Configuración de CORS
// ✅ CORS CONFIG: Permitir móviles y frontends permitidos
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true); // Postman, móvil, curl

    const whitelist = [
      "http://localhost:3000",
      "http://localhost:8102",
      "http://localhost:8103",
      "http://209.126.127.112:8101",
      "http://209.126.127.112:8102",
      "https://lazaro-cardenas.gob.mx",
      "https://www.lazaro-cardenas.gob.mx",
      "https://dev.lazaro-cardenas.gob.mx",
    ];

    if (whitelist.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS no permitido"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
// Middleware global
app.use(helmet()); // Seguridad adicional
app.use(cors(corsOptions)); // Habilitar CORS
app.options("*", cors(corsOptions)); // Manejo de preflight

// Middleware para solicitudes preflight explícito (solución adicional)
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respuesta correcta para solicitudes preflight
  }

  next();
});
// Configurar Socket.IO

// ✅ Servir archivos estáticos desde /public
app.use("/public", express.static(path.join(process.cwd(), "public")));
// 👇 Preflight requests (opcional si el CORS no basta)// 🧠 ORDEN IMPORTANTE
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const io = configureSocketServer(server);
app.set("socketio", io); // Hacer que io esté disponible para las rutas

app.get("/", (req, res) => {
  res.send(
    "API funcionando correctamente. Accede a /api para usar los endpoints."
  );
});

// Middleware para prefijar rutas
const apiRouter = express.Router();
// Middlewares
apiRouter.use(express.json());
apiRouter.use("/cat-actas", catActasCabildoRouter);
apiRouter.use("/usuarios", userRouter);
apiRouter.use("/licitaciones", licitacionesRouter);
apiRouter.use("/protesta-ciudadana", protestaCiudadanaRouter);
apiRouter.use("/regulaciones", regulacionesRouter);

// Montar las rutas en /api
app.use("/api", apiRouter);

export default app;
