import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Reservation[]>([]);
  readonly bookings$ = this.bookingsSubject.asObservable();

  addBooking(title: string, guestName: string, guestEmail: string): Reservation {
    const booking: Reservation = {
      id: 'r' + Date.now(),
      title,
      guestName,
      guestEmail,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    this.bookingsSubject.next([booking, ...this.bookingsSubject.value]);
    return booking;
  }

  cancelBooking(id: string): void {
    this.bookingsSubject.next(
      this.bookingsSubject.value.map(b => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  }
}