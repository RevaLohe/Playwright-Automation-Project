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
    "bookingdates": BookingDatesResponse;
    "additionalneeds": string;
}

/** Response shape for GET /booking/:id (flat booking object) */
export interface GetBookingByIdResponse extends BookingDetails {
    "bookingdates"?: BookingDatesResponse;
    "additionalneeds"?: string;
}