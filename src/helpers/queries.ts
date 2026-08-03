import type { Servicio } from "../interfaces/servicios";

const urlServicios = import.meta.env.VITE_SERVICIO + '/servicios';

export interface ListarServiciosParams {
  paginaNumero?: number;
  cantServicios?: number;
  termino?: string;
}

export const listarServiciosApi = async (params: ListarServiciosParams = {}): Promise<Response> => {
  try {
    const query = new URLSearchParams();
    query.set('paginaNumero', String(params.paginaNumero ?? 1));
    query.set('cantServicios', String(params.cantServicios ?? 8));
    if (params.termino) {
      query.set('termino', params.termino);
    }

    const respuesta = await fetch(`${urlServicios}?${query.toString()}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearServicioApi = async (servicio:Servicio):Promise<Response> => {
  try {
    const respuesta = await fetch(urlServicios,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(servicio)
    });
    return respuesta
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const editarServicioApi = async (id: string, servicio:Servicio):Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(servicio)
    });
    return respuesta
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const buscarServicioApi = async (id: string):Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`);
    return respuesta
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const borrarServicioApi = async (id: string):Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`,{
        method: 'DELETE'
    });
    return respuesta
  } catch (error) {
    console.error(error);
    throw error
  }
};