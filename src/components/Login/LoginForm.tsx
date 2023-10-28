/* IMPORTACIONES DE REACT */
import React from "react";

/* IMPORTACIONES DE MATERIAL UI */
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

/* IMPORTACION DE TIPOS */
import { type FormLogin } from "@src/types/login";

/* DEFINICIÓN DE TIPOS */
type props = {
    handleSubmit: (e: React.FormEvent<FormLogin>) => void
}

function LoginForm({handleSubmit}: props) {
  return (
    <form className='card p-16 login-hotel-form' onSubmit={handleSubmit}>
        <h1 className='login-hotel-h1'>Login</h1>
        <FormControl className='login-hotel-fields'>
            <TextField label="User" name="user" variant="standard" />
            <TextField type="password" name="password" label="password" variant="standard" />
            <Button variant="contained" type='submit'>Send</Button>
        </FormControl>
        <p>Usuario: admin</p>
        <p>Password: 123</p>
    </form>
  )
}

export default LoginForm