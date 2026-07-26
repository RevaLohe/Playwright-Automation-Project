import { test, expect } from "../../../fixtures/HooksFixtures";
import { BookingsClient } from "../clients/bookingsClient";
import { CreateBookingRequest } from "../model/createBookingRequest";
import { BookingResponse } from "../model/createBookingResponse";
import { readFromJson } from "../util/jsonReader";

test("GET /booking list ids @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const bookings = await client.listProducts();
    expect(bookings.length).toBeGreaterThan(1);
});

test("POST /booking create booking (separate models) @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);

    const payload: CreateBookingRequest = readFromJson("test-data/createBooking.json");

    const response: BookingResponse = await client.postBooking(payload);

    expect(response.bookingid).toBeGreaterThan(0);
    expect(response.booking.firstname).toBe(payload.firstname);
    expect(response.booking.lastname).toBe(payload.lastname);
    expect(response.booking.totalprice).toBe(payload.totalprice);
    expect(response.booking.depositpaid).toBe(payload.depositpaid);
});

test("GET /booking/:id fetch booking by id @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);
    const id = created.bookingid;

    const response = await client.getBookingById(id);

    expect(response.firstname).toBe(payload.firstname);
    expect(response.lastname).toBe(payload.lastname);
});

test("DELETE /booking/:id delete booking @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);
    const id = created.bookingid;
    const token = await client.createToken();

    await client.deleteBooking(id, token);

    const getResponse = await request.get(`/booking/${id}`);
    expect(getResponse.status()).toBe(404);
});

test("POST /auth returns a token @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const token = await client.createToken();
    expect(token.length).toBeGreaterThan(0);
});

test("PUT /booking/:id updates booking @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload: CreateBookingRequest = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);
    const token = await client.createToken();

    const updatedPayload: CreateBookingRequest = {
        ...payload,
        firstname: "UpdatedFirst",
        lastname: "UpdatedLast",
        totalprice: 999,
        additionalneeds: "Late checkout",
    };

    const updated = await client.updateBooking(created.bookingid, updatedPayload, token);
    expect(updated.firstname).toBe("UpdatedFirst");
    expect(updated.lastname).toBe("UpdatedLast");
    expect(updated.totalprice).toBe(999);

    const fetched = await client.getBookingById(created.bookingid);
    expect(fetched.firstname).toBe("UpdatedFirst");
    expect(fetched.additionalneeds).toBe("Late checkout");
});

test("PATCH /booking/:id partially updates booking @smoke @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload: CreateBookingRequest = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);
    const token = await client.createToken();

    const patched = await client.patchBooking(
        created.bookingid,
        { additionalneeds: "Dinner" },
        token
    );

    expect(patched.additionalneeds).toBe("Dinner");
    expect(patched.firstname).toBe(payload.firstname);
    expect(patched.lastname).toBe(payload.lastname);
});

test("GET /booking filter by firstname @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const uniqueFirst = `Filter${Date.now()}`;
    const payload: CreateBookingRequest = {
        ...readFromJson("test-data/createBooking.json"),
        firstname: uniqueFirst,
    };
    const created = await client.postBooking(payload);

    const matches = await client.listProducts({ firstname: uniqueFirst });
    expect(matches.some((b) => b.bookingid === created.bookingid)).toBeTruthy();
});

test("Unauthenticated DELETE returns 403 @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload: CreateBookingRequest = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);

    const status = await client.deleteBookingUnauthenticated(created.bookingid);
    expect(status).toBe(403);
});

test("Unauthenticated PUT returns 403 @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const payload: CreateBookingRequest = readFromJson("test-data/createBooking.json");
    const created = await client.postBooking(payload);

    const status = await client.updateBookingUnauthenticated(created.bookingid, payload);
    expect(status).toBe(403);
});

test("GET missing booking id returns 404 @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const status = await client.getBookingStatus(999999999);
    expect(status).toBe(404);
});

test("GET /ping health check @API", async ({ request }) => {
    const client = new BookingsClient(request);
    const status = await client.ping();
    expect(status).toBe(201);
});
