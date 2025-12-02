// Entidades
import ProtestaCiudadana from "@domain/entities/Protesta";
import TramiteSync from "@domain/entities/TramiteSync";

// Repositorios
import { ProtestaRepository } from '@domain/repositories/ProtestaRepository'

// CRUD de Protesta
import { create } from './actions/create'
import { getAllTramites } from './actions/getAllTramites'
import { getAllDependencias } from "./actions/getAllDependencias";
import { getAllMotivos } from "./actions/getAllMotivos";
import DependenciasSync from "@domain/entities/DependenciasSync";
import MotivosProtesta from "@domain/entities/MotivosProtesta";
import TipoProstesta from "@domain/entities/TipoProtesta";
import { getAllTipoProtesta } from "./actions/getAllTipoProtesta";


// CRUD de Trámites


export class ProtestaRepositoryImpl implements ProtestaRepository {
   
    async create(protesta: ProtestaCiudadana): Promise<string> {
        return await create(protesta)
    }

    // Listamos todos los trámites disponibles y que se encuentren activos
    async listarTramites(idDep:number): Promise<TramiteSync[]> {
        return await getAllTramites(idDep);
    }

    // Lista las dependencias sincornizadas
    async listarDependencias(): Promise<DependenciasSync[]> {
        return await getAllDependencias();
    }

    // Lista los motivos
    async listarMotivos(): Promise<MotivosProtesta[]> {
        return await getAllMotivos();
    }

    async listarTipoProtesta(): Promise<TipoProstesta[]> {
        return await getAllTipoProtesta();
    }

}