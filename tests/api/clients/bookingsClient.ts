import { APIRequestContext } from "@playwright/test";
import { expect } from "../../../fixtures/HooksFixtures";
import { CreateBookingRequest } from "../model/createBookingRequest";
import { BookingResponse, GetBookingByIdResponse } from "../model/createBookingResponse";

export type BookingFilters = {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
};

export class BookingsClient {

  constructor(private request: APIRequestContext) { }

  async listProducts(filters?: BookingFilters) {
    const response = await this.request.get('/booking', {
      params: filters,
    });
    expect(response.ok()).toBeTruthy();
    return response.json() as Promise<{ bookingid: number }[]>;
  }

  /** Get auth token for PUT/PATCH/DELETE (Cookie auth). */
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

  async getBookingStatus(id: number): Promise<number> {
    const response = await this.request.get(`/booking/${id}`, {
      headers: { Accept: 'application/json' }
    });
    return response.status();
  }

  async updateBooking(id: number, bookingPayload: CreateBookingRequest, token: string): Promise<GetBookingByIdResponse> {
    const response = await this.request.put(`/booking/${id}`, {
      data: bookingPayload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      }
    });
    expect(response.status(), await response.text()).toBe(200);
    return response.json() as Promise<GetBookingByIdResponse>;
  }

  async patchBooking(
    id: number,
    partial: Partial<CreateBookingRequest>,
    token: string
  ): Promise<GetBookingByIdResponse> {
    const response = await this.request.patch(`/booking/${id}`, {
      data: partial,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
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

  async deleteBookingUnauthenticated(id: number): Promise<number> {
    const response = await this.request.delete(`/booking/${id}`, {
      headers: { Accept: 'application/json' }
    });
    return response.status();
  }

  async updateBookingUnauthenticated(id: number, bookingPayload: CreateBookingRequest): Promise<number> {
    const response = await this.request.put(`/booking/${id}`, {
      data: bookingPayload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    });
    return response.status();
  }

  async ping(): Promise<number> {
    const response = await this.request.get('/ping');
    return response.status();
  }
}
