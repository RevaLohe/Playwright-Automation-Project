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

  /** Get auth token for DELETE (Cookie auth). Credentials: admin / password123 */
  async createToken(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: { username: 'admin', password: 'password123' },
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