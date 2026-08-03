import type { Servicio } from "../interfaces/servicios";
import type { Usuario } from "../context/AppContext";

const urlServicios = import.meta.env.VITE_SERVICIO+'/servicios';
const urlUsuarios = import.meta.env.VITE_SERVICIO+"/usuarios";

export const listarServiciosApi = async ():Promise<Response> => {
  try {
    const respuesta = await fetch(urlServicios);
    return respuesta
  } catch (error) {
    console.error(error);
    throw error
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
// autenticacion
// export const verificarPerfilApi = async (): Promise<Response> => {
//   return fetch(`${urlUsuarios}/perfil`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//   });
// };

export const loginBackendApi = async (email: string, password: string): Promise<Response> => {
  return fetch(`${urlUsuarios}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutBackendApi = async (): Promise<Response> => {
  return fetch(`${urlUsuarios}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const obtenerPerfilApi = async (): Promise<Usuario> => {
  const respuesta = await fetch(`${urlUsuarios}/perfil`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el perfil del usuario");
  }

  return respuesta.json();
};