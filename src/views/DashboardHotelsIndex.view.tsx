/* IMPORTACIONES DE MATERIAL UI */
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

/* IMPORTACION DE HOOKS */
import { useDatabase } from "@src/hooks/useDatabase";
import { useNavigate } from 'react-router-dom';

/* IMPORTACION DE TIPOS */
import { Hotel } from '@src/types/hotel';

function DashboardHotelsIndex() {
    // Context para la Base de datos (propio): state de hoteles
    const {hotels, setHotels} = useDatabase();

    // Hook de navegación entre rutas (react-router-dom)
    const navigate = useNavigate();
    
    // Redireccción a la ruta de la creación de hoteles
    const handleCreateHotel = () => {
        navigate("/dashboard/hotel/create");
    }

    // Redirección a la ruta de actualización de hoeles
    const handleClickIntoCard = (id: number) => {
        navigate("/dashboard/hotel/update/" + id);
    }

    // Evento de eliminación de hoteles
    const handleDeleteHotel = (id: number) => {
        setHotels(hotels => hotels.filter(hotel => hotel.id !== id));
    }

    return <>
        <Container maxWidth="lg">
            {/* SALUDO AL USUARIO LOGUEADO*/}
            <h1 className='text-4xl text-center my-12'>Bienvenido al Dashboard Usuario Admin</h1>

            {/* BOTON PARA CREAR HOTELES*/}
            <div className='text-center pb-12 '>
                <Button variant="contained" size="large" className="mx-auto" onClick={handleCreateHotel}>Crear Hotel</Button>
            </div>

            {/* LISTADO DE HOTELES DENTRO DEL SISTEMA*/}
            <ul className='grid list-unstyled grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-24'>
                {
                    hotels.map((hotel: Hotel) => (
                        <Card key={hotel.id} className={`cursor-pointer relative !overflow-visible ${!hotel.enabled && "brightness-50"}`} onClick={(e: React.MouseEvent) => {e.stopPropagation();handleClickIntoCard(hotel.id)}}>
                            <button className='absolute text-white bg-red-500 hover:bg-red-600 rounded-full w-[35px] h-[35px] top-[-15px] right-[-15px] z-10' onClick={(e: React.MouseEvent) => {e.stopPropagation();handleDeleteHotel(hotel.id);}}>X</button>
                            <CardMedia
                                component="img"
                                alt="hotel"
                                height="150"
                                image={hotel.picture}
                                className='h-[150px]'
                            />
                            <CardContent>
                                <h6 className='text-2xl'>{hotel.name}</h6>                                
                            </CardContent>
                        </Card>
                    ))
                }
            </ul>

        </Container>
    </>;
}

export default DashboardHotelsIndex;
