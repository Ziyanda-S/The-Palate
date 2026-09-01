import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BookingService } from '../../data/booking.service';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit {
  bookings: Reservation[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.bookings$.subscribe(list => (this.bookings = list));
  }

  cancel(booking: Reservation): void {
    this.bookingService.cancelBooking(booking.id);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
}