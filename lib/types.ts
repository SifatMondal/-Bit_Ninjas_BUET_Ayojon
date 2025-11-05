// Global type definitions

export type Role = 'USER' | 'BUSINESS' | 'ADMIN';

export type BookingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface PriceBand {
  min: number;
  max: number;
  description?: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  city?: string;
  dateFrom?: Date;
  dateTo?: Date;
  budgetMin?: number;
  budgetMax?: number;
  rating?: number;
  distance?: number;
  lat?: number;
  lng?: number;
}

export interface ParsedIntent {
  service?: string;
  city?: string;
  date?: string;
  budgetMin?: number;
  budgetMax?: number;
  confidence: number;
}
