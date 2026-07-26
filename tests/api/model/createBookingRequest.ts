export interface BookingDateRequest{
            "checkin": string,
            "checkout": string
}


export interface CreateBookingRequest {
        "firstname": string,
        "lastname": string,
        "totalprice": number,
        "depositpaid": boolean,
        "bookingdates": BookingDateRequest,
        "additionalneeds": string
}