/* IMPORTACIONES DE REACT */
import { PropsWithChildren, createContext, useMemo, useState, useContext } from "react"

/* IMPORTACION DE TIPOS */
import { type Hotel } from "@@types/hotel";

/* IMPORTACION DE HELPERS */
import generateRandomHotels from "@src/data/hotels.seeder";


/* TIPADO DE LOS VALORES DEL CONTEXT API */
type ContextValues = {
    hotels: Hotel[],
    setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
}

/* CREACIÓN DE UN CONTEXT */
export const UseDatabaseContext = createContext<ContextValues>({hotels:[], setHotels: () => {}})


/* COMPONENTE PROVIDER DEL CONTEXT */
export default function UseDatabaseProvider({children}: PropsWithChildren){
    /* LISTADO DE HOTELES */
    const [hotels, setHotels] = useState<Array<Hotel>>(() => {
        return generateRandomHotels();
    });

    /* OPTIMIZACIÓN ANTIRE-RENDERIZADOS */
    const value = useMemo(() => ({hotels, setHotels}), [hotels, setHotels]);

    return (
        <UseDatabaseContext.Provider value={value}>
            {children}
        </UseDatabaseContext.Provider>
    )
}


/* HOOK PARA CONSUMIR ESTE CONTEXT */
export function useDatabase(){
    return useContext(UseDatabaseContext);
}