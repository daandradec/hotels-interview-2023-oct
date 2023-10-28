export interface Hotel {
    id: number;
    name: string;
    picture: string;
    location: string;
    enabled: boolean;
    dateIn: number;
    dateOut: number;
    rooms: Array<Room>;    
}

export interface Room {
    id: number;
    amountPeople: number;
    numeration: number;
    basecost: number;
    tax: number;
    type: string;
    location: string;
    enabled: boolean;
    booking: null | Booking;
}

export interface Booking {
    fullName: string;
    DateBorn: string;
    genre: string;
    documentType: string;
    documentNumber: string; 
    email: string;
    tel: string;
    nameEmergency: string;
    telEmergency: string;
    dateIn: string;
    dateOut: string;
}