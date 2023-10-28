/* IMPORTACIONES DE REACT */
import React from "react";

/* IMPORTACIONES DE MATERIAL UI */
import Grid from '@mui/material/Grid';

/* IMPORTACION DE COMPONENTS */
import LoginForm from '@components/Login/LoginForm';

/* IMPORTACIÓN DE HOOKS */
import { useNavigate } from "react-router-dom";

/* IMPORTACIÓN DE ESTILOS */
import "@styles/Login.css"

/* IMPORTACIÓN DE RECURSOS ESTATICOS */
import hotelImg from "@assets/hotel-login-background.jpg";

/* IMPORTACION DE HOOKS */
import { useAuthentication } from "@src/hooks/useAuthentication";

/* IMPORTACION DE TIPOS */
import { type FormLogin } from "@src/types/login";


function Login() {
    // Context Autenticación propio
    const {setAuth} = useAuthentication();   

    // Hook de navegación entre rutas (react-router-dom)
    const navigate = useNavigate();
    
    // Evento de submit: comprueba las credenciales y redirecciona al dashboard
    const handleSubmit = (e: React.FormEvent<FormLogin>) => {
        e.preventDefault();   
        const form = new FormData(e.target as HTMLFormElement);
        const jsonInputs = Object.fromEntries(form) as {user:string, password: string}; 
        if(e.currentTarget.elements.user.value === "admin" && e.currentTarget.elements.password.value ==="123"
            || jsonInputs.user === "admin" && jsonInputs.password === "123" ||
                form.get("user") === "admin" && form.get("password") === "123"){
            setAuth(true)
            navigate("/dashboard");
        }else
            alert("Credenciales incorrectas");
    }

    return (
        <main>
            <Grid container spacing={2}>

                {/* COLUMNA IZQUIERDA CON LA IMAGEN DEL HOTEL */}
                <Grid item lg={8} display={{ xs: "none", lg: "block" }}> 
                    <img src={hotelImg} alt="hotel" className='login-hotel-img'/>
                </Grid>

                {/* COLUMNA DERECHA CON EL FORMULARIO DE LOGIN */}
                <Grid item xs={12} lg={4}> 
                    <div className='center w-100 h-100 min-h-screen'>                            
                        <LoginForm handleSubmit={handleSubmit}/>
                    </div>
                </Grid>

            </Grid>
        </main>
    )    
}

export default Login;
