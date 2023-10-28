/* IMPORTACION DE COMPONENTES DE LIBRERIAS */
import { Route, Routes } from "react-router-dom";

/* IMPORTACION DE RUTAS */
import Hotels from "@views/Hotels.view";
import Login from "@views/Login.view";
import Layout from "@src/router/Layout";
import DashboardHotelsIndex from "@views/DashboardHotelsIndex.view";
import DashboardHotelsCreate from "@views/DashboardHotelsCreate.view";
import DashboardHotelsUpdate from "@views/DashboardHotelsUpdate.view";
import HotelBooking from "@views/HotelBooking.view";

function Router() {
    return (
        <Routes>
            {/* RUTA DE HOME */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Hotels />} />
                <Route path="/hotel/:id" element={<HotelBooking/>}/>
            </Route>

            {/* RUTA DE LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* RUTAS ANIDADAS */}
            <Route path="/dashboard" element={<Layout />}>
                <Route index element={<DashboardHotelsIndex />}></Route>
                <Route path="/dashboard/hotel/update/:id" element={<DashboardHotelsUpdate />} />
                <Route path="/dashboard/hotel/create" element={<DashboardHotelsCreate />} />
                {/* <Route path="/nested/show" element={<NestedShow />}></Route>
                <Route path="/nested/index" element={<NestedIndex />}></Route> */}
            </Route>

            {/* TODO EL RESTO DE POSIBLES RUTAS */}
            <Route path="*" element={<>Ruta No Existente</>} />
        </Routes>
    );
}

export default Router;
