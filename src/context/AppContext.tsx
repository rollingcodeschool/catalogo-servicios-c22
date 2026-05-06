import { createContext, useContext } from "react";

export interface AppContextType {
  usuarioLogueado: boolean;
  setUsuarioLogueado: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}
