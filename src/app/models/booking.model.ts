export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
    id: number;
    eventId: string;
    eventName: string;
    eventDate: string;
    bookingDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfTickets: number;
    totalPrice: number;
    specialRequirements?: string;
    status: BookingStatus;
}

export interface BookingFormData {
    eventId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfTickets: number;
    specialRequirements?: string;
}
