export interface Reservation {
  id: string;
  title: string;       // what was reserved, e.g. "Chef's Table"
  guestName: string;
  guestEmail: string;
  createdAt: string;   // ISO timestamp
  status: 'confirmed' | 'cancelled';
}