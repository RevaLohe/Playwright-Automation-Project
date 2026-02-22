import { APIRequestContext } from "@playwright/test";
import { expect } from "../../../fixtures/HooksFixtures";
import { CreateBookingRequest } from "../model/createBookingRequest";
import { BookingResponse, GetBookingByIdResponse } from "../model/createBookingResponse";

export class BookingsClient {

  constructor(private request: APIRequestContext) { }

  async listProducts() {
    const response = await this.request.get('/booking');
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  /** Get auth token for DELETE (Cookie auth). Set RESTFUL_BOOKER_USERNAME and RESTFUL_BOOKER_PASSWORD in .env or GitHub Secrets. */
  async createToken(): Promise<string> {
    const username = process.env.RESTFUL_BOOKER_USERNAME;
    const password = process.env.RESTFUL_BOOKER_PASSWORD;
    if (!username || !password) {
      throw new Error(
        'Missing RESTFUL_BOOKER_USERNAME or RESTFUL_BOOKER_PASSWORD. Set in .env or GitHub Secrets.'
      );
    }
    const response = await this.request.post('/auth', {
      data: { username, password },
      headers: { 'Content-Type': 'application/json' }
    });
    expect(response.ok(), await response.text()).toBeTruthy();
    const body = await response.json() as { token?: string };
    if (!body.token) {
      throw new Error('Auth response missing token. Response: ' + JSON.stringify(body));
    }
    return body.token;
  }

  async postBooking(bookingPayload: CreateBookingRequest): Promise<BookingResponse> {
    const response = await this.request.post('/booking', {
      data: bookingPayload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.json() as Promise<BookingResponse>;
  }

  async getBookingById(id: number): Promise<GetBookingByIdResponse> {
    const response = await this.request.get(`/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    expect(response.status(), await response.text()).toBe(200);
    return response.json() as Promise<GetBookingByIdResponse>;
  }

  async deleteBooking(id: number, token: string): Promise<void> {
    const response = await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
        Accept: 'application/json'
      }
    });
    expect(response.status(), await response.text()).toBe(201);
  }

}