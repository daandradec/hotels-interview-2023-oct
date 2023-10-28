/* IMPORTACIONES DE REACT */
import React from "react";

/* IMPORTACIONES DE MATERIAL UI */
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';

/* DEFINICIÓN DE TIPOS */
type props = {
    filterText: string;
    filterAvailable: boolean;
    filterDateIn: string;
    filterDateOut: string;
    setFilterText: React.Dispatch<React.SetStateAction<string>>;
    setFilterAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterDateIn: React.Dispatch<React.SetStateAction<string>>;
    setFilterDateOut: React.Dispatch<React.SetStateAction<string>>;
}

function FiltersBox({filterText, filterAvailable, filterDateIn, filterDateOut, setFilterText, setFilterAvailable, setFilterDateIn, setFilterDateOut}: props) {
    return (
        <div className="center mt-16 pt-4 flex-col gap-4 border">
            {/* FILTRO DE BARRA DE BUSQUEDA DE TEXTO*/}
            <form className="relative">
                <SearchIcon fontSize="large" className="absolute bottom-0 left-2"/>
                <label htmlFor="search" className="block text-stone-400">Buscar por nombre o ubicación</label>
                <input type="text" name="search" className="input search" value={filterText} placeholder="Nombre o ubicación" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}/>
            </form>

            {/* FILTROS DE RANGO DE FECHAS */}
            <form className="md:flex md:gap-4">
                <span>
                    <label htmlFor="datein" className="block text-stone-400">Fecha entrada</label>
                    <input type="date" name="datein" value={filterDateIn} className="input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterDateIn(e.target.value)}/>
                </span>
                <span>
                    <label htmlFor="dateout" className="block text-stone-400">Fecha Salida</label>
                    <input type="date" name="dateout" value={filterDateOut} className="input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterDateOut(e.target.value)}/>
                </span>
            </form>

            {/* FILTRO DE CAJA DE CHECKBOX */}
            <form>
                <label htmlFor="available" className="text-stone-400">Ocultar ocupados</label>
                <Checkbox inputProps={{ "aria-label": "controlled", "name":"available" }}  checked={filterAvailable} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterAvailable(event.target.checked)}/>
            </form>
        </div>
    );
}

export default FiltersBox;
