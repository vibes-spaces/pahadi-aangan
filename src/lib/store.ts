import { Room, Amenity, Review, Offer, GalleryItem, MenuItem, Event as ResortEvent, Booking, Guest, Staff, DashboardStats, BlogPost, Experience, SpaTreatment } from './types';
import * as defaults from './data';
import { generateId } from './utils';
export { generateId };

const STORE_KEYS = {
  rooms: 'pa_data_rooms',
  amenities: 'pa_data_amenities',
  reviews: 'pa_data_reviews',
  offers: 'pa_data_offers',
  gallery: 'pa_data_gallery',
  menu: 'pa_data_menu',
  bookings: 'pa_data_bookings',
  guests: 'pa_data_guests',
  staff: 'pa_data_staff',
  stats: 'pa_data_stats',
  siteSettings: 'pa_data_siteSettings',
  events: 'pa_data_events',
  blogPosts: 'pa_data_blog',
  experiences: 'pa_data_experiences',
  spaTreatments: 'pa_data_spa',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// --- Room CRUD ---
export function getRooms(): Room[] { return loadFromStorage(STORE_KEYS.rooms, defaults.rooms); }
export function saveRooms(data: Room[]) { saveToStorage(STORE_KEYS.rooms, data); }

// --- Amenities ---
export function getAmenities(): Amenity[] { return loadFromStorage(STORE_KEYS.amenities, defaults.amenities); }
export function saveAmenities(data: Amenity[]) { saveToStorage(STORE_KEYS.amenities, data); }

// --- Reviews ---
export function getReviews(): Review[] { return loadFromStorage(STORE_KEYS.reviews, defaults.reviews); }
export function saveReviews(data: Review[]) { saveToStorage(STORE_KEYS.reviews, data); }

// --- Offers ---
export function getOffers(): Offer[] { return loadFromStorage(STORE_KEYS.offers, defaults.offers); }
export function saveOffers(data: Offer[]) { saveToStorage(STORE_KEYS.offers, data); }

// --- Gallery ---
export function getGallery(): GalleryItem[] { return loadFromStorage(STORE_KEYS.gallery, defaults.galleryItems); }
export function saveGallery(data: GalleryItem[]) { saveToStorage(STORE_KEYS.gallery, data); }

// --- Menu Items ---
export function getMenuItems(): MenuItem[] { return loadFromStorage<MenuItem[]>(STORE_KEYS.menu, defaults.diningMenuItems); }
export function saveMenuItems(data: MenuItem[]) { saveToStorage(STORE_KEYS.menu, data); }

// --- Bookings ---
export function getBookings(): Booking[] { return loadFromStorage(STORE_KEYS.bookings, defaults.mockBookings); }
export function saveBookings(data: Booking[]) { saveToStorage(STORE_KEYS.bookings, data); }
export function addBooking(data: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const all = getBookings();
  const booking: Booking = { ...data, id: generateId('B'), createdAt: new Date().toISOString().split('T')[0] };
  all.push(booking);
  saveBookings(all);
  return booking;
}
export function updateBookingStatus(id: string, status: Booking['status']) {
  const all = getBookings();
  const idx = all.findIndex(b => b.id === id);
  if (idx !== -1) { all[idx].status = status; saveBookings(all); }
}

// --- Guests ---
export function getGuests(): Guest[] { return loadFromStorage(STORE_KEYS.guests, defaults.mockGuests); }
export function saveGuests(data: Guest[]) { saveToStorage(STORE_KEYS.guests, data); }

// --- Staff ---
export function getStaff(): Staff[] { return loadFromStorage(STORE_KEYS.staff, defaults.mockStaff); }
export function saveStaff(data: Staff[]) { saveToStorage(STORE_KEYS.staff, data); }

// --- Dashboard Stats ---
export function getStats(): DashboardStats { return loadFromStorage(STORE_KEYS.stats, defaults.dashboardStats); }
export function saveStats(data: DashboardStats) { saveToStorage(STORE_KEYS.stats, data); }

// --- Site Settings ---
export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutStory: string;
  address: string;
  addressFull: string;
  phones: string[];
  email: string;
  checkIn: string;
  checkOut: string;
}

export function getSiteSettings(): SiteSettings {
  const fallback: SiteSettings = {
    heroTitle: defaults.siteName,
    heroSubtitle: defaults.siteTagline,
    aboutText: 'Nestled in the serene Kullu Valley, Pahadi Aangan is a heritage retreat that celebrates the timeless beauty of traditional Himachali architecture.',
    aboutStory: 'Inspired by the ancient Kathkuni building technique, Pahadi Aangan was created to preserve and showcase the architectural heritage of Himachal Pradesh while offering world-class hospitality.',
    address: defaults.contactInfo.address,
    addressFull: defaults.contactInfo.addressFull,
    phones: [...defaults.contactInfo.phones],
    email: defaults.contactInfo.email,
    checkIn: defaults.contactInfo.checkIn,
    checkOut: defaults.contactInfo.checkOut,
  };
  return loadFromStorage(STORE_KEYS.siteSettings, fallback);
}
export function saveSiteSettings(data: SiteSettings) { saveToStorage(STORE_KEYS.siteSettings, data); }

// --- Events ---
export function getEvents(): ResortEvent[] { return loadFromStorage(STORE_KEYS.events, defaults.events); }
export function saveEvents(data: ResortEvent[]) { saveToStorage(STORE_KEYS.events, data); }

// --- Blog Posts ---
export function getBlogPosts(): BlogPost[] { return loadFromStorage(STORE_KEYS.blogPosts, defaults.blogPosts); }
export function saveBlogPosts(data: BlogPost[]) { saveToStorage(STORE_KEYS.blogPosts, data); }

// --- Experiences ---
export function getExperiences(): Experience[] { return loadFromStorage(STORE_KEYS.experiences, defaults.experiences); }
export function saveExperiences(data: Experience[]) { saveToStorage(STORE_KEYS.experiences, data); }

// --- Spa Treatments ---
export function getSpaTreatments(): SpaTreatment[] { return loadFromStorage(STORE_KEYS.spaTreatments, defaults.spaTreatments); }
export function saveSpaTreatments(data: SpaTreatment[]) { saveToStorage(STORE_KEYS.spaTreatments, data); }

// --- Utility helpers ---
export function resetAllData() {
  if (typeof window === 'undefined') return;
  Object.values(STORE_KEYS).forEach(k => { try { localStorage.removeItem(k); } catch {} });
}
