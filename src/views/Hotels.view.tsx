/* IMPORTACIONES DE REACT */
import { useState } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Container from '@mui/material/Container';
import HotelsList from '@src/components/Hotels/HotelsList';

/* IMPORTACION DE COMPONENTS */
import FiltersBox from '@src/components/Hotels/FiltersBox';

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@src/hooks/useDatabase";
import { useNavigate } from 'react-router-dom';


function Hotels() {
    // Context para la Base de datos (propio): state de hoteles
    const { hotels } = useDatabase();

    // Hook de navegación (react-router-dom)
    const navigate = useNavigate();

    // States para manejo de filtros de la aplicación en string
    const [filterText, setFilterText] = useState("");
    const [filterDateIn, setFilterDateIn] = useState("");
    const [filterDateOut, setFilterDateOut] = useState("");
    const [filterAvailable, setFilterAvailable] = useState(false);
    
    // Evento de click para redireccionar a la vista de un hotel para reservarlo
    const handleClick = (id: number) => {
        navigate("/hotel/" + id);
    }

    return <>
        <Container maxWidth="lg">
            {/* COMPONENTE DE FILTROS */}
            <FiltersBox filterText={filterText} setFilterText={setFilterText} filterDateIn={filterDateIn} setFilterDateIn={setFilterDateIn} filterAvailable={filterAvailable} setFilterAvailable={setFilterAvailable} filterDateOut={filterDateOut} setFilterDateOut={setFilterDateOut}/>

            {/* COMPONENTE DE LISTADO DE HOTELES */}
            <HotelsList hotels={hotels} handleClick={handleClick} filterText={filterText} filterDateIn={filterDateIn} filterAvailable={filterAvailable} filterDateOut={filterDateOut}/>
        </Container>
    </>;
}

export default Hotels;
