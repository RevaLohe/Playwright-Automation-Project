import { APIRequestContext, expect } from "@playwright/test";
import { CreateBookingRequest } from "../model/createBookingRequest";
import { BookingResponse } from '../model/createBookingResponse'

export class BookingsClient {

  constructor(private request: APIRequestContext) { }

  async listProducts() {
    const response = await this.request.get('/booking');
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async postBooking(bookingPayload: CreateBookingRequest): Promise<BookingResponse> {
    const response = await this.request.post('/booking', {
      data: bookingPayload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return response.json() as Promise<BookingResponse>;
  }

  async getBookingById(id: number): Promise<BookingResponse> {

    const response = await this.request.get(`/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    expect(response.status(),await response.text()).toBe(200);
    return response.json() as Promise<BookingResponse>;
  }

  async deleteBooking(id: number):Promise<void>{

    const response = await this.request.delete(`/booking/${id}`,{headers: {
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=', // admin:password123
        Accept: 'application/json'
    }})
    expect(response.status(),await response.text()).toBe(201);
  }

}