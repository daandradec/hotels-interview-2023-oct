/* IMPORTACIONES DE REACT */
import { useCallback } from "react";

/* IMPORTACION DE COMPONENTES DE LIBRERIAS */
import { Outlet, useNavigate } from "react-router-dom";

/* IMPORTACIONES DE MATERIAL UI */
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';

/* IMPORTACION DE HOOKS */
import { useAuthentication } from "@src/hooks/useAuthentication";

function Layout() {
    // Context Autenticación propio
    const {authenticated, setAuth} = useAuthentication();   

    // Hook de navegación entre rutas (react-router-dom)
    const navigate = useNavigate(); 

    // Evento de login o logout
    const handleLogInOutEvent = useCallback((authenticated: boolean): void => {
        if(authenticated){
            setAuth(false);
            navigate("/");
        }else{
            navigate("/login");
        }
    }, [navigate, setAuth])

    // Redirección al home
    const handleRedirectToHome = () => {
        navigate("/");
    }

    // Redirección al dashboard
    const handleRedirectToDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <>
            {/* BARRA DE NAVEGACIÓN AMARILLA QUE SIEMPRE ESTA ARRIBA DE CUALQUIER VISTA */}
            <nav className="block w-full py-6 px-12 bg-yellow-300/60">
                <ul className="flex w-full list-unstyled">
                    <li className="cursor-pointer" onClick={handleRedirectToHome}>
                        <HomeIcon fontSize="large"/>
                    </li>
                    {
                        authenticated ? (
                            <li className="cursor-pointer mx-9" onClick={handleRedirectToDashboard}>
                                <><BadgeIcon fontSize="large" /> Dashboard</>
                            </li>
                        ) : null
                    }
                    <li className="cursor-pointer ml-auto" onClick={() => handleLogInOutEvent(authenticated)}>
                        {
                            authenticated ? (
                                <><LogoutIcon fontSize="large" /> Cerrar sesión</>
                            ) : (
                                <><LoginIcon fontSize="large" /> Ingresar</>
                            )
                        }
                        
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
