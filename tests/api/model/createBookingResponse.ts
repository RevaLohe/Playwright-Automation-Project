export interface BookingDetails {
    "firstname": string;
    "lastname": string;
    "totalprice": number;
    "depositpaid": boolean;
}

export interface BookingDatesResponse {
    "checkin": string;
    "checkout": string;
}

export interface BookingResponse {
    "bookingid": number;
    "booking": BookingDetails;
    "bookingdates": BookingDatesResponse,
    "additionalneeds": string;
}