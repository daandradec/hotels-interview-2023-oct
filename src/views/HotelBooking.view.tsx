/* IMPORTACIONES DE REACT */
import { useState, useMemo } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

/* IMPORTACION DE COMPONENTES */
import BookingForm from '@components/HotelBooking/BookingForm';

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@src/hooks/useDatabase";
import { useParams } from "react-router-dom";

/* IMPORTACION DE HELPERS JS */
import Swal from 'sweetalert2'

/* IMPORTACION DE TIPOS */
import { Hotel, Room } from '@src/types/hotel';


function HotelBooking() {
    // Hook de params (react-router-dom): para traernos el id
    const { id } = useParams();

    // Context para la Base de datos (propio): state de hoteles
    const { hotels, setHotels } = useDatabase();

    // State para settear la habitación seleccionada
    const [currentRoom, setRoom] = useState<Room | null>(null);

    // Memo con la instancia del hotel en la que estamos parados
    const hotel = useMemo(() => {
        const hotel = id ? hotels.find((hotel: Hotel) => hotel.id === Number(id)) : null;
        return hotel ?? null;
    }, [hotels, id]);


    // Evento de click para settear la room seleccionada para reserva
    const handleClick = (booking: boolean, id: number) => {
        if(!booking){
            const room = hotel!.rooms.find(room => room.id === id );
            setRoom(room ?? null);
        }
    }

    // Evento formulario finalizado para la reserva, validar que todo este lleno y crear la reserva
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Obtener los datos del elemento form html
        const form = new FormData(event.target as HTMLFormElement);
        const inputs = Object.fromEntries(form) as {fullname:string, dateborn: string, gender: string, doctype:string, docnumber: string, email: string, telphone: string, dateIn: string, dateOut: string, fullnameemer: string, telnumberemer: string}; 
        
        // Validar que todos los datos esten digitados
        if(!Object.values(inputs).every((input) => input.length)){
            alert("Todos los campos son obligatorios")
            return;
        }

        // Validar habitación seleccionada
        if(!currentRoom){
            alert("Es obligatorio elegir una habitación para reservar")
            return;
        }

        // Objeto con la instancia de la reserva
        const booking = {
            fullName: inputs.fullname,
            DateBorn: inputs.dateborn,
            genre: inputs.gender,
            documentType: inputs.doctype,
            documentNumber: inputs.docnumber,
            email: inputs.email,
            tel: inputs.telphone,
            nameEmergency: inputs.fullnameemer,
            telEmergency: inputs.telnumberemer,
            dateIn: inputs.dateIn,
            dateOut: inputs.dateOut
        }

        // Crear el hotel
        setHotels(hotels => {
            return hotels.map(hotelObj => {
                if(hotelObj.id === hotel!.id){
                    return {...hotelObj, rooms: hotelObj.rooms.map(room => (currentRoom && room.id === currentRoom.id ? {...room, booking} : room))}
                }
                return hotelObj;
            })
        })

        // Popup de exito
        Swal.fire({
            icon: 'success',
            title: 'Reserva realizada',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <Container maxWidth="lg" className="p-8">
            {
                hotel ? (
                    <Grid container spacing={2}>

                        {/* COLUMNA IZQUIERDA CON EL LISTADO DE HABITACIONES DISPONIBLES */}
                        <Grid item xs={12} lg={6}>
                            <h2 className="text-3xl text-center mb-4">Disponibilidad Habitaciones</h2> 
                            <div className="h-auto max-h-screen overflow-y-auto">
                            {
                                hotel.rooms.map(room => { 
                                    const current = room.booking ? {
                                        roomStyle: "bg-stone-700/60 cursor-default",
                                        text: `Habitación ${room.numeration} ya reservada`                              
                                    } : {
                                        roomStyle: `${currentRoom && currentRoom.id == room.id ? "bg-emerald-700" : "bg-emerald-500"} text-white hover:bg-emerald-700 cursor-pointer`,
                                        text: `Habitación ${room.numeration} disponible`                              
                                    }
                                    return (
                                        <div key={room.id} className={`px-6 py-6 ${current.roomStyle}`} onClick={() => handleClick(!!room.booking, room.id)}>
                                            {current.text} por ${room.basecost + room.basecost * room.tax/100}
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </Grid>
        
                        {/* COLUMNA DERECHA CON EL FORMULARIO DE CREACIÓN DE RESERVAS */}
                        <Grid item xs={12} lg={6}>
                            <BookingForm handleSubmit={handleSubmit}/>
                        </Grid>
                    </Grid>
                ) : <h2>El hotel no existe</h2>
            }
        </Container>
    );
}

export default HotelBooking;
