/* IMPORTACIONES DE REACT */
import { useMemo } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

/* IMPORTACION DE COMPONENTES */
import HotelsUpdateForm from '@components/DashboardHotelsUpdate/HotelsUpdateForm';
import RoomsUpdateForm from "@components/DashboardHotelsUpdate/RoomsUpdateForm";

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@src/hooks/useDatabase";
import { useParams } from "react-router-dom";

/* IMPORTACION DE ARCHIVOS ESTATICOS */
import images from "@src/data//hotels-images.json";

/* IMPORTACION DE TIPOS */
import { Hotel } from '@src/types/hotel';

/* IMPORTACION DE HELPERS JS */
import { randomPicture } from "@js/random";

function DashboardHotelsUpdate() {

    // Hook de params (react-router-dom): para traernos el id
    const { id } = useParams();

    // Context para la Base de datos (propio): state de hoteles
    const { hotels, setHotels } = useDatabase();

    // Memo con la instancia del hotel en la que estamos parados
    const hotel = useMemo(() => {
        const hotel = id ? hotels.find((hotel: Hotel) => hotel.id === Number(id)) : null;
        return hotel ?? null;
    }, [hotels, id]);

    // Evento click que actualiza la imagen del hotel con una aleatoria
    const updateImageHotel = (id: number) => {
        setHotels( hotels => {
            return hotels.map(hotel => {
                if(hotel.id === id)
                    return {...hotel, picture: randomPicture(images, images.length, hotel.picture)}
                return hotel;
            })
        })
    }

    return (
        <Container maxWidth="lg" className="p-8">
            {
                hotel ? (
                    <>
                        <Grid container spacing={2} className="mb-8">
                            
                            {/* COLUMNA IZQUIERDA CON LA FOTO DEL HOTEL Y EL BOTON DE ACTUALIZAR */}
                            <Grid item xs={12} md={9} lg={6}>
                                <img src={hotel.picture} alt="hotel" className="w-full object-cover block max-h-[378px]"/>
                                <div className="text-center mt-6">
                                    <Button variant="contained" size="large" onClick={() => updateImageHotel(hotel.id)}>Cambiar Foto</Button>
                                </div>
                            </Grid>
                            
                            {/* COLUMNA DERECHA CON EL FORMULARIO DE ACTUALIZACIÓN DEL HOTEL */}
                            <Grid item xs={12} md={3} lg={6}>
                                <HotelsUpdateForm hotel={hotel} updateHotel={setHotels}/>
                            </Grid>

                        </Grid>


                        {/* FORMULARIO PARA ACTUALIZAR LAS HABITACIONES */}
                        <RoomsUpdateForm hotel={hotel}/>

                    </>
                ) : <h2>El hotel no existe</h2>
            }
        </Container>
    )
}

export default DashboardHotelsUpdate;
