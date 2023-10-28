/* IMPORTACIONES DE REACT */
import { useState } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

/* IMPORTACION DE COMPONENTES */
import HotelsCreateForm from "@components/DashboardHotelsCreate/HotelsCreateForm";

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@src/hooks/useDatabase";

/* IMPORTACION DE ARCHIVOS ESTATICOS */
import images from "@src/data//hotels-images.json";

/* IMPORTACION DE HELPERS JS */
import { randomValue } from "@js/random";

function DashboardHotelsCreate() {

    // State para manejo del indice del array del cual se elige la foto del hotel
    const [imageIndex, setImageIndex] = useState(() => randomValue(images.length))

    // Context para la Base de datos (propio): state de hoteles
    const {hotels, setHotels} = useDatabase();

    return (
        <Container maxWidth="lg" className="p-8">
            <Grid container spacing={2}>
                {/* COLUMNA IZQUIERDA CON LA FOTO DEL HOTEL Y EL BOTON PARA CAMBIARLA */}
                <Grid item xs={12} md={9} lg={6}>
                    <img src={images[imageIndex]} alt="hotel" className="w-full object-cover block max-h-[378px]"/>
                    <div className="text-center mt-6">
                        <Button variant="contained" size="large" onClick={() => setImageIndex((imageIndex) => randomValue(images.length, imageIndex))}>Cambiar Foto</Button>
                    </div>
                </Grid>

                {/* COLUMNA DERECHA CON EL FORMULARIO DE CREACIÓN DE HOTELES */}
                <Grid item xs={12} md={3} lg={6}>
                    <HotelsCreateForm hotels={hotels} picture={images[imageIndex]} createHotel={setHotels}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardHotelsCreate;
