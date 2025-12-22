
export interface BookingResponse {
        "firstname": string,
        "lastname": string,
        "totalprice": number,
        "depositpaid": boolean,
}

export interface BookingDatesResponse{
    "checkin": string,
    "checkout": string
}


export interface BookingResponse{
    "bookingid": number,
    "booking": BookingResponse,
    "bookingdates": BookingDatesResponse,
    "additionalneeds": string

}