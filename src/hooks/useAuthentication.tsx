/* IMPORTACIONES DE REACT */
import React, { PropsWithChildren, createContext, useMemo, useState, useContext } from "react";

/* TIPADO DE LOS VALORES DEL CONTEXT API */
type ContextValues = {
    authenticated: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

/* CREACIÓN DE UN CONTEXT */
export const UseAuthenticationContext = createContext<ContextValues>({authenticated: false, setAuth: () => {}})

/* COMPONENTE PROVIDER DEL CONTEXT */
export default function UseAuthenticationProvider({children}: PropsWithChildren){
    // booleano bandera con el estado de autenticación 
    const [authenticated, setAuth] = useState(false);
    const value = useMemo(() => ({authenticated, setAuth}), [authenticated, setAuth]);

    return (
        <UseAuthenticationContext.Provider value={value}>
            {children}
        </UseAuthenticationContext.Provider>
    )
}

/* HOOK PARA CONSUMIR ESTE CONTEXT */
export function useAuthentication(){
    return useContext(UseAuthenticationContext);
}