/* IMPORTACIONES DE REACT */
import React, { useState } from "react";

/* IMPORTACIONES DE MATERIAL UI */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* DEFINICIÓN DE TIPOS */
type props = {    
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function BookingForm({handleSubmit}: props) {       
    // States con el genero y el tipo de documento
    const [gender, setGender] = useState("man");
    const [documentType, setDocType] = useState("cc");

    // Evento que settea el genero en el select
    const handleSelectGender = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    }

    // Evento que settea el tipo de documento en el select
    const handleSelectDocType = (event: SelectChangeEvent) => {
        setDocType(event.target.value as string);
    }

    // Evento de tecleo en el input de texto que permite solo numericos
    const cleanNumeric = (event: React.ChangeEvent<HTMLInputElement>) => {        
        event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');                
    }

    return (        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-8">
            <h2 className="text-3xl text-center">Reservar</h2>        
            {/* INPUTS DE TEXTO NOMBRE Y FECHA NACIMIENTO*/}    
            <TextField label="Nombre Completo" name="fullname" variant="standard" className="w-full" required/>
            <TextField type="date" label="Fecha Nacimiento" name="dateborn" variant="standard" className="w-full" InputLabelProps={{shrink:true}} required/>

            {/* INPUTS DE SELECCION DE GENERO Y TIPO DE DOCUMENTO*/}
            <SelectField value={gender} label="Edad" name="gender" handleSelect={handleSelectGender} options={[{key:"man", value:"Hombre"}, {key:"woman", value:"Mujer"}]}/>
            <SelectField value={documentType} label="Tipo Documento" name="doctype" handleSelect={handleSelectDocType} options={[{key:"cc", value:"Cedula"}, {key:"passport", value:"Pasaporte"}]}/>

            {/* INPUTS DE TEXTO NUMERO DE DOCUMENTO, EMAIL, TELEFONO Y FECHAS DE IN Y OUT */}
            <TextField onChange={cleanNumeric} label="Numero Documento" name="docnumber" variant="standard" className="w-full" required/>
            <TextField type="email" label="Email" name="email" variant="standard" className="w-full" required/>
            <TextField onChange={cleanNumeric} label="Telefono" name="telphone" variant="standard" className="w-full" required/>
            <TextField type="date" label="Fecha Check In" name="dateIn" variant="standard" className="w-full" InputLabelProps={{shrink:true}} required/>
            <TextField type="date" label="Fecha Check Out" name="dateOut" variant="standard" className="w-full" InputLabelProps={{shrink:true}} required/>
            <br/>
            <hr/><hr/>
            {/* INPUTS PARA INFORMACIÓN DE EMERGENCIA */}
            <TextField label="Nombre Persona por Emergencia" name="fullnameemer" variant="standard" className="w-full" required/>
            <TextField onChange={cleanNumeric} label="Numero de Tel por Emergencia" name="telnumberemer" variant="standard" className="w-full" required/>
            <br/>
            {/* BOTON DE SUBMIT */}
            <Button variant="contained" size="large" type='submit' className="mt-4">Reservar</Button>
        </form>
    );
}

/* INPUT DE SELECT GENERICO SEGUN LOS DATOS */
function SelectField({handleSelect, name, value, label, options}: {handleSelect: (e: SelectChangeEvent) => void; name:string, value: string, label:string, options: Array<{key: string, value:string}>}){
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
export default BookingForm;
