import { types } from 'cassandra-driver';
 interface ProtestaCiudadana {
    id?: types.Uuid; // UUID
    correo_electronico: string;
    dependencia_id?: number; // Opcional
    descripcion_hecho: string;
    fecha_de_hechos: Date; // Timestamp
    folio_tramite?: string; // Opcional
    lugar_hechos: string;
    motivo_omision_id?: string; // UUID Opcional
    nombre: string;
    nombre_servidor_publico?: string; // Opcional
    primer_apellido: string;
    segundo_apellido?: string; // Opcional
    telefono?: string; // Opcional
    tipo_protesta_id: string; // UUID
    tramite_id: number;
    liga_tramite?: string; // Liga del trámite si aplica
    motivo: string; // Opcional
  }
  export default ProtestaCiudadana;
  