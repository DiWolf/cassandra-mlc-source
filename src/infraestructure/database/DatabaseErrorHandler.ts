export class DatabaseErrorHandler {
  static handleDatabaseError(error: any): never {
    if (error.code) {
      switch (error.code) {
        case "23505": // Unique violation (PostgreSQL)
        case "ER_DUP_ENTRY": // Duplicate entry (MySQL)
          console.error("Error: Entrada duplicada en la base de datos.");
          throw new Error("DuplicateEntryError");

        case "23502": // Not-null violation (PostgreSQL)
        case "ER_BAD_NULL_ERROR": // Column cannot be null (MySQL)
          console.error(
            "Error: Valor nulo en una columna que no permite nulos."
          );
          throw new Error("NotNullViolationError");

        case "23503": // Foreign key violation (PostgreSQL)
        case "ER_NO_REFERENCED_ROW_2": // Foreign key constraint fails (MySQL)
          console.error("Error: Violación de clave foránea.");
          throw new Error("ForeignKeyViolationError");

        case "23514": // Check constraint violation (PostgreSQL)
        case "ER_CHECK_CONSTRAINT_VIOLATED": // Check constraint violation (MySQL)
          console.error("Error: Violación de restricción CHECK.");
          throw new Error("CheckConstraintViolationError");

        case "42P01": // Undefined table (PostgreSQL)
        case "ER_NO_SUCH_TABLE": // Table doesn't exist (MySQL)
          console.error("Error: La tabla especificada no existe.");
          throw new Error("UndefinedTableError");

        default:
          console.error("Error desconocido en la base de datos:", error);
          throw new Error("UnknownDatabaseError");
      }
    } else {
      // Si el error no tiene un código específico, lanza un error genérico
      console.error("Error en la base de datos no identificado:", error);
      throw new Error("GenericDatabaseError");
    }
  }
}
