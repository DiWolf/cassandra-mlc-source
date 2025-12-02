import { rule, shield, allow, deny, and } from "graphql-shield";

// Regla: Permitir siempre el acceso
//const isPublic = allow();

// Regla: Verificar si el usuario está autenticado
const isAuthenticated = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    return context.user.nombre_usuario !== null; // Verifica si el usuario está en el contexto
  }
);

// Regla: Verificar si el usuario es administrador
const isAdmin = rule()(async (parent, args, context) => {
  return context.user.rol === "admin"; // Verifica el rol del usuario
});

// Configuración de permisos para el esquema
export const permissions = shield(
  {
    Query: {
    //  getDepartamento: isAuthenticated, // Solo usuarios autenticados
     // getEmployees: allow, // Solo administradores
     holaMundo: allow
    },
    Mutation: {
      //createDepartamento: isAdmin, // Solo usuarios autenticados
      crearUsuario: allow, // Solo usuarios administradores
      login: allow, //
    },
  },
  {
    //fallbackRule: deny, // Niega todo por defecto si no se define una regla
    allowExternalErrors: true, // Permite errores personalizados
  }
);
