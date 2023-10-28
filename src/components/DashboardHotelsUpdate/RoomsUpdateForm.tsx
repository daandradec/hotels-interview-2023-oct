/* IMPORTACION DE TIPOS */
import { Hotel } from "@src/types/hotel";

/* DEFINICIÓN DE TIPOS */
type props = {
    hotel: Hotel;
}

function RoomsUpdateForm({hotel}: props) {
    return (
        <section className="flex flex-col gap-4">
            { /* LISTADO DE HABITACIONES */
                hotel.rooms.map(room => (
                    <div className="border p-6">
                        <h6 className="font-semibold">Habitación {room.numeration}</h6>
                        <div className="block lg:flex">
                            <div className=" basis-2/4">
                                <div>Limite personas: {room.amountPeople}</div>
                                <div>Costo Base: ${room.basecost}</div>
                                <div>Tasa Impuesto: {room.tax} %</div>
                                <div>Costo Total: ${room.basecost + room.basecost*room.tax/100}</div>
                                <div>Tipo {room.type}</div>
                                <div>Ubicación {room.location}</div>
                            </div>
                            <div className=" basis-2/4">
                                {
                                    room.booking ? (
                                        <div>
                                            <h6 className="font-semibold">Reserva</h6>
                                            <div>Nombre: {room.booking.fullName}</div>
                                            <div>Genero: {room.booking.genre}</div>
                                            <div>Email: {room.booking.email}</div>
                                            <div>Telefono: {room.booking.tel}</div>
                                            <div>Check-In: {room.booking.dateIn}</div>
                                            <div>Check-Out: {room.booking.dateOut}</div>
                                        </div>
                                    ) : "No tiene reservas"
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default RoomsUpdateForm;
