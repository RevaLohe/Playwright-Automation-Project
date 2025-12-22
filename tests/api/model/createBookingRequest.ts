export interface BookingDateRequest{
            "checkin": string,
            "checkout": string
}


export interface CreateBookingRequest {
        "firstname": string,
        "lastname": string,
        "totalprice": number,
        "depositpaid": true,
        "bookingdates": BookingDateRequest,
        "additionalneeds": string
}