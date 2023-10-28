/* IMPORTACION DE FAKER */
import { faker } from "@faker-js/faker";

/* IMPORTACION DE TIPOS */
import { type Hotel } from "@@types/hotel";

/* IMPORTACION DE ARCHIVOS ESTATICOS */
import images from "./hotels-images.json";

export default function generateRandomHotels() {
    // Crear un array vacio para guardar hoteles
    const hotels: Hotel[] = [];

    // Generar 10 registros de hoteles aleatorios con faker
    for (let id = 1; id <= 4; id++) {
        const dateIn = Date.now() + faker.number.int({ min: 1, max: 144 }) * 1000 * 60 * 60;
        const dateOut = dateIn + faker.number.int({ min: 24, max: 144 }) * 1000 * 60 * 60;
        const hotel: Hotel = {
            id,
            name: `Hotel ${id}`,
            picture: images[faker.number.int({ min: 0, max: images.length - 1 })],
            location: faker.location.country(),
            enabled: true,
            dateIn,
            dateOut,
            rooms: []
        };
        for (let j = 1; j <= 10; ++j) {
            hotel.rooms.push({
                id: j,                
                numeration: j,
                amountPeople: faker.number.int({ min: 2, max: 6 }),
                basecost: faker.number.int({ min: 100, max: 1000 }),
                tax: faker.number.int({ min: 5, max: 25 }),
                type: faker.helpers.arrayElement(["single", "double", "suite"]),
                location: faker.helpers.arrayElement(["exterior", "interior"]),
                enabled: true,
                booking: Math.random() > 0.85 ? {
                    fullName: faker.person.fullName(),
                    DateBorn: faker.date
                        .past({ years: 30, refDate: new Date(2000, 0, 1) })
                        .toLocaleDateString(),
                    genre: faker.helpers.arrayElement([
                        "masculine",
                        "feminine"
                    ]),
                    documentType: faker.helpers.arrayElement([
                        "cc",
                        "passport"
                    ]),
                    documentNumber: faker.number
                        .int({ min: 10000000, max: 9999999999 })
                        .toString(),
                    email: faker.internet.email(),
                    tel: faker.phone.number(),
                    nameEmergency: faker.person.fullName(),
                    telEmergency: faker.phone.number(),
                    dateIn: faker.date
                        .between({ from: "2023-10-01", to: "2023-10-31" })
                        .toLocaleDateString(),
                    dateOut: faker.date
                        .between({ from: "2023-11-01", to: "2023-11-30" })
                        .toLocaleDateString()
                } : null
            });
        }
        hotels.push(hotel);
    }
    return hotels;
}
