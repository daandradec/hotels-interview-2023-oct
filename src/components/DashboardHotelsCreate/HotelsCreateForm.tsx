/* IMPORTACIONES DE REACT */
import React, { useState } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

/* IMPORTACION DE TIPOS */
import { Hotel, Room } from "@src/types/hotel";

/* IMPORTACION DE HOOKS */
import { useNavigate } from "react-router-dom";

/* DEFINICIÓN DE TIPOS */
type props = {
    hotels: Hotel[];
    picture: string;
    createHotel: React.Dispatch<React.SetStateAction<Hotel[]>>
}

function HotelsCreateForm({hotels, picture, createHotel}: props) {
    // Hook de navegación para redirección (react-router-dom)
    const navigate = useNavigate();

    // State con la cantidad de habitaciones 
    const [counterRooms, setCounter] = useState(1);

    // State de los datos del formulario para crear un hotel
    const [state, setState] = useState({
        name: "",
        location: "",
        dateIn: "",
        dateOut: "",
        basecost: "",
        tax: "",
        type: "single",
        locationRoom: "exterior"        
    })
    
    // Evento de limpieza de campos como numerico
    const cleanNumeric = (e: React.ChangeEvent<HTMLInputElement>) => {        
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');                
        setState(state => ({...state, [e.target.name]: e.target.value}))
    }

    // Evento de limpieza de campo como numerico porcentual
    const cleanNumericPer = (e: React.ChangeEvent<HTMLInputElement>) => {        
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0') + "%";
        setState(state => ({...state, [e.target.name]: e.target.value}))
    }    

    // Evento de actualización del estado 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({...state, [e.target.name]: e.target.value}))
    }

    // Evento de selección 
    const handleSelect = (e: SelectChangeEvent) => {
        setState(state => ({...state, [e.target.name]: e.target.value as string}))
    }

    // Evento de envio del formulario
    const handleSubmit = () => {
        // Validar que todos los datos sean no vacios 
        if(!Object.values(state).every((input) => input.length)){
            alert("Todos los campos son obligatorios")
            return;
        }
        
        // Limpiar la tasa de cambio
        const tax = Number(state.tax.substring(0, state.tax.length - 1));        
        
        // Crear una instancia de objeto Hotel
        const hotel: Hotel = {
            id: hotels.length + 1, 
            name: state.name, 
            location: state.location, 
            picture, 
            enabled: true, 
            dateIn: new Date(state.dateIn).getTime(), 
            dateOut: new Date(state.dateOut).getTime(),
            rooms: Array.from({ length: counterRooms }, (_, i) => ({
                id: i,
                amountPeople: Math.floor(Math.random() * 6),
                numeration: i,
                basecost: Number(state.basecost),
                tax,
                type: state.type,
                location: state.locationRoom,
                enabled: true,
                booking: null
            } as Room))
        };
        // Crear un hotel    
        createHotel((hotels: Hotel[]) => ([...hotels, hotel]));
        
        // Popup de exito
        Swal.fire({
            icon: 'success',
            title: 'Reserva realizada',
            showConfirmButton: false,
            timer: 1500
        });
        
        // Redirigir al dashboard
        navigate("/dashboard")
    }

    return (
        <>
            {/* CAMPOS DE TEXTO DEL HOTEL */}
            <form className="flex flex-col gap-4 pb-6" onSubmit={(e: React.FormEvent) => {e.preventDefault()}}>                
                <TextField label="Nombre del Hotel" name="name" variant="standard" fullWidth required onChange={handleChange}/>
                <TextField label="Ubicación" name="location" variant="standard" fullWidth required onChange={handleChange}/>
                <TextField type="date" label="Fecha Entradas" name="dateIn" variant="standard" InputLabelProps={{shrink:true}} fullWidth required onChange={handleChange}/>
                <TextField type="date" label="Fecha Salidas" name="dateOut" variant="standard" InputLabelProps={{shrink:true}} fullWidth required onChange={handleChange}/>            
            </form>
            
            {/* COMPONENTE NUMERICO */}
            <NumberField counter={counterRooms} setCounter={setCounter}/>

            {/* CAMPOS DE TEXTO Y SELECCIONADOS PARA INFORMACIÓN PARA LAS HABITACIONES */
                counterRooms ? (
                    <form className="flex flex-col gap-4 pt-2 pb-6" onSubmit={(e: React.FormEvent) => {e.preventDefault()}}>
                        <TextField onChange={cleanNumeric} label="Costo Base" name="basecost" variant="standard" fullWidth required/>
                        <TextField onChange={cleanNumericPer} label="Tasa Impuesto" name="tax" variant="standard" fullWidth required/>
                        <SelectField value={state["type"]} label="Tipo Habitacion" name="type" handleSelect={handleSelect} options={[{key:"single", value:"Unica"}, {key:"double", value:"Doble"}, {key: "suite", value: "Suite"}]}/>
                        <SelectField value={state["locationRoom"]} label="Ubicación Habitacion" name="locationRoom" handleSelect={handleSelect} options={[{key:"exterior", value:"Exterior"}, {key:"interior", value:"Interior"}]}/>
                    </form>
                ) : null
            }
            {/* BOTON DE CREACIÓN */}
            <div className="text-center mt-2">
                <Button variant="contained" size="large" onClick={handleSubmit}>Crear</Button>
            </div>            
        </>
    )
}

/* COMPONENTE DE INCREMENTADOR O DECREMENTADOR NUMERICO */
function NumberField({counter, setCounter}: {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>
}){
    return (
        <>
            <h6>Numero de Habitaciones</h6>
            <div className="flex">
                <button className="bg-sky-600 text-white p-1 border w-[30px] h-[30px] mr-2" onClick={() => setCounter(counter => Math.max(counter - 1, 1))}>-</button>
                <span className="leading-[30px]"> {counter} </span>
                <button className="bg-sky-600 text-white p-1 border w-[30px] h-[30px] ml-2" onClick={() => setCounter(counter => counter + 1)}>+</button>
            </div>
        </>
    )
}
/* COMPONENTE DE INPUT DE SELECCIÓN GENERICO */
function SelectField({handleSelect, name, value, label, options}: {
    handleSelect: (e: SelectChangeEvent) => void; 
    name:string, 
    value: string, 
    label:string, 
    options: Array<{key: string, value:string}>
}){
    return (
        <FormControl fullWidth>
            <InputLabel id={label} className="bg-white">{label}</InputLabel>
            <Select
                labelId={label}
                id={name+"sel"}   
                name={name}
                value={value}           
                label={label}
                onChange={handleSelect}
            >
                {
                    options.map((option, i) => <MenuItem key={name + i} value={option.key}>{option.value}</MenuItem>)
                }            
            </Select>        
        </FormControl>        
    )
}

export default HotelsCreateForm;
