import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

// Estructura del usuario según lo que retorna el backend en /perfil
export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: "admin" | "cliente"; // Tipamos estrictamente los roles
}

export interface AppContextType {
  usuarioLogueado: Usuario | null;
  loadingSession: boolean;
  setUsuarioLogueado: Dispatch<SetStateAction<Usuario | null>>;
  loginBackend: (email: string, pass: string) => Promise<Usuario | null>;
  logoutBackend: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}

// export interface AppContextType {
//   usuarioLogueado: boolean;
//   setUsuarioLogueado: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const AppContext = createContext<AppContextType | undefined>(undefined);

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext debe usarse dentro de un AppProvider");
//   }
//   return context;
// }
