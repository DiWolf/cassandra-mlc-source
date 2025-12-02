export interface UserDTO {
    uid: string; // Identificador único del usuario (UUID)
    username: string; // Nombre de usuario
    employeeNumber: string; // Número de empleado
    department: string; // Departamento al que pertenece el usuario
    password?: string; // Contraseña del usuario (opcional si no se debe exponer)
    role: string; // Rol del usuario (e.g., admin, user)
    status: boolean; // Estado del usuario (activo o inactivo)
    createdAt: Date; // Fecha de creación del registro
    updatedAt: Date; // Fecha de última actualización del registro
  }
  