/* IMPORTACIONES DE REACT */
import { useMemo } from 'react'

/* IMPORTACIONES DE MATERIAL UI */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

/* IMPORTACION DE HELPERS JS */
import dateFormat from "dateformat";

/* IMPORTACION DE TIPOS */
import { Hotel } from '@src/types/hotel';

/* DEFINICIÓN DE TIPOS */
type props = {
    filterText: string;
    filterAvailable: boolean;
    filterDateIn: string;    
    filterDateOut: string;
    hotels: Hotel[];
    handleClick: (id: number) => void;
}

function HotelsList({hotels, handleClick, filterText, filterAvailable, filterDateIn, filterDateOut}: props) {

    // Memo con el listado de hoteles aplicandole todos los filtros 
    const filterHotels = useMemo(() => {          
        // Constantes con el valor en milisegundos de las fechas elegidas para filtrar
        const milisDateIn = filterDateIn ? new Date(filterDateIn+" 00:00:00").getTime() : 0;
        const milisDateOut = filterDateOut ? new Date(filterDateOut+" 23:59:00").getTime() : 0;
        
        // Crear el listado filtrado de hoteles primero por los que estan habilitados o deshabilitados 
        let hotelsFiltered = hotels.filter(hotel => hotel.enabled);

        // Filtrar los hoteles por texto de ubicación o nombre
        if(filterText)
            hotelsFiltered = hotelsFiltered.filter(hotel => filterText ? hotel.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) || hotel.location.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) : true);
        
        // Filtrar los hoteles por el rango de fechas en el que estan
        if(filterDateIn || filterDateOut)
            hotelsFiltered = hotelsFiltered.filter(hotel => {
                if(filterDateIn && filterDateOut) 
                    return hotel.dateIn >= milisDateIn && hotel.dateOut <= milisDateOut;
                else if(filterDateIn && !filterDateOut)
                    return hotel.dateIn >= milisDateIn
                else if(filterDateOut)
                    return hotel.dateOut <= milisDateOut;
                else
                    return true;
            });
        
        // Filtrar los hoteles por la cantidad de disponibilidad
        if(filterAvailable)
            hotelsFiltered = hotelsFiltered.filter(hotel => filterAvailable ? hotel.rooms.reduce((acc, curr) => acc - Number(!!curr.booking), hotel.rooms.length) : true);
        
        return hotelsFiltered
    }, [hotels, filterText, filterAvailable, filterDateIn, filterDateOut])

    return (
        <ul className='grid list-unstyled grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-24'>
        {/* LISTADO DE HOTELES */
            filterHotels.map((hotel: Hotel) => (
                <Card key={hotel.id} className='cursor-pointer' onClick={() => handleClick(hotel.id)}>                    
                    <CardMedia
                        component="img"
                        alt="hotel"
                        height="200"
                        image={hotel.picture}
                        className='h-[200px]'
                    />
                    <CardContent>
                        <h6 className='text-2xl'>{hotel.name}</h6>
                        <p className='text-sm text-stone-400'>(ubicación: {hotel.location})</p>
                        <p className='text-sm text-stone-400'>{hotel.rooms.reduce((acc, curr) => acc - Number(!!curr.booking), hotel.rooms.length)} Habitaciones disponibles</p>
                        <p className='text-sm text-stone-400'>{hotel.rooms.reduce((acc, curr) => (acc + (curr.booking ? 0 : curr.amountPeople)), 0)} Personas pueden alojarse</p>
                        <p className='text-sm text-gray-500'>Fecha Entrada: {dateFormat(new Date(hotel.dateIn), "dd-mm--yyyy")}</p>
                        <p className='text-sm text-gray-500'>Fecha Salida: {dateFormat(new Date(hotel.dateOut), "dd-mm--yyyy")}</p>
                    </CardContent>
                </Card>
            ))
        }
    </ul>        
    );
}

export default HotelsList;
