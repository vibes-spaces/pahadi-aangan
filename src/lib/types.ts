export interface Room {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  size: string;
  capacity: number;
  bedType: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  traditional: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code?: string;
  image?: string;
  featured?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  capacity: string;
  pricing: string;
  icon: string;
  features: string[];
  category: 'wedding' | 'corporate' | 'celebration' | 'cultural';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  traditional?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  caption?: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  images: string[];
  included: string[];
  category: string;
}

export interface SpaTreatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  category: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  requests: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: string;
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  specialRequests?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalStays: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  image?: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeGuests: number;
  occupancyRate: number;
  pendingBookings: number;
  confirmedBookings: number;
  checkedIn: number;
  cancelledBookings: number;
}
