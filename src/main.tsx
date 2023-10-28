/* IMPORTACIONES DE REACT */
import ReactDOM from 'react-dom/client'

/* IMPORTACION DE COMPONENTES */
import UseDatabaseProvider from './hooks/useDatabase';
import UseAuthenticationProvider from './hooks/useAuthentication';

/* IMPORTACION DE COMPONENTES LIBRERIAS */
import { BrowserRouter } from "react-router-dom";
import Router from "@router/Router";

/* IMPORTACION DE ESTILOS */
import 'reset-default-style';
import '@styles/index.css';
import 'sweetalert2/src/sweetalert2.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <UseDatabaseProvider>
        <UseAuthenticationProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>        
        </UseAuthenticationProvider>
    </UseDatabaseProvider>
)
