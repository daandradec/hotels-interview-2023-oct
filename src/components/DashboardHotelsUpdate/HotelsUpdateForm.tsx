/* IMPORTACIONES DE REACT */
import { useState } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

/* IMPORTACION DE HELPERS JS */
import dateFormat from "dateformat";

/* IMPORTACION DE TIPOS */
import { Hotel } from "@src/types/hotel";

/* DEFINICIÓN DE TIPOS */
type props = {
    hotel: Hotel;
    updateHotel: React.Dispatch<React.SetStateAction<Hotel[]>>
}

function HotelsUpdateForm({hotel, updateHotel}: props) {
    // States de los campos del formulario de hoteles 
    const [state, setState] = useState(() => {        
        return {
            name: hotel.name,
            location: hotel.location,
            dateIn: dateFormat(new Date(hotel.dateIn), "yyyy-mm-dd"),
            dateOut: dateFormat(new Date(hotel.dateOut), "yyyy-mm-dd")
        }
    })

    // State con el booleano de activación o desactivación del hotel
    const [available, setAvailable] = useState(hotel.enabled);

    // Evento de tecleo en el input para setteo de informacion en el state 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({...state, [e.target.name]: e.target.value}))
    }
    // Evento de check del checkbox para activar o desactivar
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvailable(e.target.checked);
    }
    // Evento de submit del formulario
    const handleSubmit = () => {
        // Validar que todos los campos tengan información y sean no vacios
        if(!Object.values(state).every((input) => input.length)){
            alert("Todos los campos son obligatorios")
            return;
        }
        // Crear un objeto con información de hotel
        const hotelUpdate: Hotel = {
            ...hotel,
            name: state.name, 
            location: state.location,             
            enabled: available, 
            dateIn: new Date(state.dateIn).getTime(), 
            dateOut: new Date(state.dateOut).getTime()
        }        
        // Actualizar el hotel en el que estamos parados con los nuevos datos
        updateHotel( hotels => {
            return hotels.map(hotelItem => {
                if(hotelItem.id === hotel.id)
                    return hotelUpdate;
                return hotelItem;
            })
        })
        // Popup de exito
        Swal.fire({
            icon: 'success',
            title: 'Hotel Actualizado',
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <>
                <div>
                    {/* Checkbox de habilitado o deshabilitado */}
                    <label htmlFor="available" className="text-stone-400">Habilitado</label>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} name="available" checked={available} onChange={handleChecked}/>
                </div> 
                {/* CAMPOS DE TEXTO DEL FORMULARIO DE HOTEL */}
                <form className="flex flex-col gap-4 pb-6" onSubmit={(e: React.FormEvent) => {e.preventDefault()}}>                    
                    <TextField label="Nombre del Hotel" name="name" variant="standard" fullWidth required onChange={handleChange} value={state["name"]}/>
                    <TextField label="Ubicación" name="location" variant="standard" fullWidth required onChange={handleChange} value={state["location"]}/>
                    <TextField type="date" label="Fecha Entradas" name="dateIn" variant="standard" InputLabelProps={{shrink:true}} fullWidth required onChange={handleChange} value={state["dateIn"]}/>
                    <TextField type="date" label="Fecha Salidas" name="dateOut" variant="standard" InputLabelProps={{shrink:true}} fullWidth required onChange={handleChange} value={state["dateOut"]}/>                                
                </form>
                {/* BOTON DE ACTUALIZACIÓN */}
                <div className="text-center mt-2">
                    <Button variant="contained" size="large" onClick={handleSubmit}>Actualizar</Button>
                </div> 
        </>
    )
}

export default HotelsUpdateForm;
