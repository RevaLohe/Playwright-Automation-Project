import { test, expect } from "../../../fixtures/HooksFixtures";
import { BookingsClient } from "../clients/bookingsClient";
import { CreateBookingRequest } from "../model/createBookingRequest";
import { BookingResponse } from "../model/createBookingResponse";

test("GET products @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const bookings = await client.listProducts();
    expect(bookings.length).toBeGreaterThan(1);
});

test("POST /booking create booking (separate models) @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);

    const payload: CreateBookingRequest = {
        firstname: "Jimmy",
        lastname: "Brown",
        totalprice: 112,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-11-01",
            checkout: "2019-08-01"
        },
        additionalneeds: "Breakfast"
    };

    const response: BookingResponse = await client.postBooking(payload);

    expect(response.bookingid).toBeGreaterThan(0);
    expect(response.booking.firstname).toBe(payload.firstname);
    expect(response.booking.lastname).toBe(payload.lastname);
    expect(response.booking.totalprice).toBe(payload.totalprice);
    expect(response.booking.depositpaid).toBe(payload.depositpaid);
});

test("GET /booking/:id fetch booking by id @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const id = 744;

    const response = await client.getBookingById(id);

    expect(response.firstname).toBeTruthy();
    expect(response.lastname).toBeTruthy();
});

test("DELETE /booking/:id delete booking @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const id = 1221;

    await client.deleteBooking(id);

    // Verify booking is deleted
    const getResponse = await request.get(`/booking/${id}`);
    expect(getResponse.status()).toBe(404);
});
