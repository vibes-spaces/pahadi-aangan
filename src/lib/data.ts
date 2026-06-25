import { Room, Amenity, Review, Offer, Event, GalleryItem, MenuItem, Booking, Guest, Staff, DashboardStats, BlogPost, Experience, SpaTreatment } from './types';

export const siteName = 'Pahadi Aangan';
export const siteTagline = 'A Heritage Retreat in the Heart of Himachal';
export const siteDescription = 'Experience the timeless elegance of traditional Himachali architecture at Pahadi Aangan. Nestled among pine forests with panoramic Himalayan views.';

export const rooms: Room[] = [
  {
    id: 'kathkuni-kutiya',
    slug: 'kathkuni-kutiya',
    title: 'Kathkuni Kutiya',
    subtitle: 'A traditional stone & wood cottage',
    description: 'Handcrafted in authentic Kathkuni style with locally sourced stone and deodar wood, offering a cozy retreat with modern comforts.',
    longDescription: 'Step into a living piece of Himachali heritage. The Kathkuni Kutiya is constructed using the ancient building technique of interlocking stone and deodar wood without mortar — a craft passed down through generations. The walls exude warmth, the wooden ceiling beams tell stories of the mountains, and the hand-carved window frames offer glimpses of the snow-capped Dhauladhar range. Modern amenities blend seamlessly with tradition, including a plush king bed draped in Pahadi weaves, a private sit-out with panoramic views, and an attached bathroom with handcrafted stone sinks.',
    price: 3500,
    size: '380 sqft',
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['Handcrafted Stone & Wood Interior', 'Private Sit-out', 'Traditional Pahadi Weaves', 'Free WiFi', 'Smart TV', 'Tea/Coffee Maker', 'Hair Dryer', 'In-room Safe', 'Rain Shower', 'Eco-friendly Toiletries'],
    images: ['https://images.unsplash.com/photo-1615571022219-eb45cf7faa36?w=800&q=80'],
    featured: true,
    available: true,
    traditional: 'Built in authentic Kathkuni style — interlocking stone & deodar wood',
  },
  {
    id: 'pahadi-mahal',
    slug: 'pahadi-mahal',
    title: 'Pahadi Mahal Suite',
    subtitle: 'Royalty meets mountain heritage',
    description: 'A regal suite inspired by the hill forts of Himachal, with hand-painted murals, carved wooden ceilings, and a private terrace.',
    longDescription: 'The Pahadi Mahal Suite is our crown jewel, designed to evoke the grandeur of Himachal\'s royal heritage. A hand-carved wooden doorway leads into a sprawling living space featuring traditional Kullu-style murals, a handwoven wool carpet from Kinnaur, and a ceiling adorned with intricate wooden carvings. The bedroom boasts a four-poster king bed with embroidered Pahadi textiles. The en-suite bathroom features a copper soaking tub and a rain shower with mountain spring water. Step onto your private terrace to witness the sun setting behind the Pir Panjal range.',
    price: 6500,
    size: '550 sqft',
    capacity: 3,
    bedType: 'King Bed + Day Bed',
    amenities: ['Hand-painted Murals', 'Carved Wood Ceiling', 'Copper Soaking Tub', 'Private Terrace', 'Traditional Kullu Weaves', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Tea/Coffee Maker', 'Fireplace', 'Rain Shower'],
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'],
    featured: true,
    available: true,
    traditional: 'Inspired by hill fort architecture with hand-painted Kullu murals',
  },
  {
    id: 'apple-orchard',
    slug: 'apple-orchard',
    title: 'Apple Orchard Room',
    subtitle: 'Wake up to the scent of apples',
    description: 'Nestled within a working apple orchard, this charming room offers a unique farm-stay experience with traditional Himachali hospitality.',
    longDescription: 'Surrounded by centuries-old apple trees, the Apple Orchard Room offers a tranquil escape into Himachal\'s agricultural heart. The room is decorated in warm earth tones with hand-block-printed fabrics and locally crafted furniture. Large windows overlook the orchard, where you can watch the apples ripen and the birds dance among the branches. The attached veranda has a traditional wooden swing (jhoola) and a cozy seating area. In spring, the orchard bursts into a pink-and-white blossom spectacle; in autumn, you can pluck apples straight from the trees.',
    price: 2800,
    size: '320 sqft',
    capacity: 2,
    bedType: 'Queen Bed',
    amenities: ['Orchard Views', 'Traditional Jhoola (Swing)', 'Hand-block-printed Textiles', 'Free WiFi', 'Tea/Coffee Maker', 'Garden Access', 'Bicycle on Request', 'Bonfire Access'],
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80'],
    featured: true,
    available: true,
    traditional: 'Farm-stay in a working apple orchard with traditional jhoola',
  },
  {
    id: 'dhauladhar-view',
    slug: 'dhauladhar-view',
    title: 'Dhauladhar View Room',
    subtitle: 'Panoramic snow-capped vistas',
    description: 'Wake up to the majestic Dhauladhar range from your window. Modern comfort meets traditional design in this mountain-facing retreat.',
    longDescription: 'The Dhauladhar View Room offers uninterrupted vistas of the snow-clad Dhauladhar range from its large picture window and private balcony. The room artfully combines contemporary amenities with traditional Himachali aesthetics — a hand-embroidered wall hanging from Chamba, locally sourced slate flooring with radiant heating, and furniture crafted from reclaimed Himalayan cedar. The balcony features a pair of carved wooden chairs where you can sip your morning chai while watching eagles soar above the pine forests.',
    price: 4000,
    size: '350 sqft',
    capacity: 2,
    bedType: 'King Bed',
    amenities: ['Panoramic Mountain Views', 'Private Balcony', 'Slate Floor Heating', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Tea/Coffee Maker', 'Himalayan Cedar Furniture', 'Rain Shower', 'Premium Toiletries'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
    featured: false,
    available: true,
    traditional: 'Radiant-heated slate floors and reclaimed Himalayan cedar furniture',
  },
  {
    id: 'family-buransh',
    slug: 'family-buransh',
    title: 'Buransh Family Suite',
    subtitle: 'Named after the rhododendron blossom',
    description: 'A spacious two-bedroom suite perfect for families, featuring traditional Himachali decor and a shared courtyard with apple trees.',
    longDescription: 'Named after the vibrant rhododendron (Buransh) flowers that paint the Himachali hillsides in spring, this family suite offers ample space across two bedrooms connected by a cozy living area. The master bedroom has a king bed, while the adjoining room features twin beds with traditional Pahadi patchwork quilts. The living room has a fireplace, a dining area, and opens to a private courtyard with flowering plants and apple trees. The suite is decorated with handwoven wool rugs and wooden artifacts from local artisans.',
    price: 7500,
    size: '680 sqft',
    capacity: 5,
    bedType: 'King Bed + Twin Beds',
    amenities: ['Two Bedrooms', 'Private Courtyard', 'Fireplace', 'Living & Dining Area', 'Traditional Pahadi Quilts', 'Free WiFi', 'Smart TV', 'Full Kitchenette', 'Refrigerator', 'Tea/Coffee Maker'],
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
    featured: false,
    available: true,
    traditional: 'Traditional Pahadi patchwork quilts & handwoven Kinnauri rugs',
  },
];

export const amenities: Amenity[] = [
  { title: 'Traditional Architecture', description: 'Authentic Kathkuni buildings with interlocking stone & wood craftsmanship', icon: 'Temple' },
  { title: 'Himalayan Panorama', description: 'Uninterrupted views of the Dhauladhar & Pir Panjal ranges', icon: 'Mountain' },
  { title: 'Pahadi Cuisine', description: 'Organic farm-to-table Himachali meals at our restaurant "Chamba"', icon: 'Utensils' },
  { title: 'Apple Orchard', description: 'Wander through our century-old working apple orchard', icon: 'Apple' },
  { title: 'Bonfire & Stargazing', description: 'Evening bonfire under the clearest mountain skies', icon: 'Campfire' },
  { title: 'Heritage Walks', description: 'Guided tours through traditional Himachali villages & temples', icon: 'Footprints' },
  { title: 'Yoga Pavilion', description: 'Morning yoga with panoramic mountain views in a traditional wooden pavilion', icon: 'Yoga' },
  { title: 'Free WiFi', description: 'High-speed internet throughout the property', icon: 'Wifi' },
  { title: 'Spa Therapies', description: 'Traditional Ayurvedic & Himalayan herbal treatments', icon: 'Spa' },
  { title: 'Cultural Evenings', description: 'Live Pahadi folk music & dance performances', icon: 'Music' },
  { title: 'Library', description: 'Collection of books on Himachali culture, history & Himalayan lore', icon: 'BookOpen' },
  { title: 'Treks & Excursions', description: 'Guided treks, river crossing & paragliding near Solang Valley', icon: 'Map' },
];

export const reviews: Review[] = [
  { id: '1', name: 'Arunima Thakur', location: 'Chandigarh', rating: 5, text: 'Pahadi Aangan is a dream. The Kathkuni architecture transported me to another era. Walking through the property felt like stepping into a Himachali painting. The food at Chamba restaurant is extraordinary — the Siddu and Madra were the best I\'ve ever had.', date: '2026-05-20', approved: true },
  { id: '2', name: 'Vikram Singh Rathore', location: 'Jaipur', rating: 5, text: 'We booked the Pahadi Mahal Suite for our anniversary and it was spellbinding. The hand-painted murals, the copper bathtub, the private terrace — every detail was perfect. The staff went above and beyond to make our stay memorable.', date: '2026-04-15', approved: true },
  { id: '3', name: 'Sophie Müller', location: 'Berlin, Germany', rating: 5, text: 'An authentic Himalayan experience unlike any other. The traditional architecture is stunning — the stone-and-wood construction keeps the rooms naturally warm. The heritage walk through the nearby village was the highlight of our India trip.', date: '2026-03-22', approved: true },
  { id: '4', name: 'Priyanka & Rahul Mehta', location: 'Mumbai', rating: 4, text: 'The Apple Orchard Room was exactly what we needed — quiet, charming, surrounded by nature. Picking apples from the tree and having them for breakfast was magical. The staff recommended a short trek to a hidden waterfall. Unforgettable.', date: '2026-02-10', approved: true },
  { id: '5', name: 'David Chen', location: 'Singapore', rating: 5, text: 'I\'ve stayed at many resorts in the Himalayas but Pahadi Aangan stands out for its commitment to preserving Himachali heritage. The architecture, the food, the cultural evenings — everything is authentic. The Dhauladhar views from my room were breathtaking.', date: '2025-12-05', approved: true },
];

export const offers: Offer[] = [
  { id: '1', title: 'Heritage Escape', description: 'Book 21 days in advance and immerse yourself in Himachali heritage with exclusive cultural experiences included.', discount: '25% OFF', validUntil: '2026-12-31', code: 'HERITAGE25', featured: true },
  { id: '2', title: 'Apple Blossom Special', description: 'Visit during spring blossom season (March-April) and enjoy complimentary orchard walks, apple cider tasting, and a picnic among the blossoms.', discount: '15% OFF', validUntil: '2026-04-30', code: 'BLOSSOM15', featured: true },
  { id: '3', title: 'Monsoon Magic', description: 'Experience the Himalayas in the monsoon season when the valleys turn emerald green. Special rates with complimentary spa treatment.', discount: '30% OFF', validUntil: '2026-09-30', code: 'MONSOON30' },
  { id: '4', title: 'Honeymoon in the Hills', description: 'Romantic package with private terrace dinner, couple spa treatment, flower decoration, and a traditional Himachali welcome ceremony.', discount: '20% OFF', validUntil: '2026-12-31', code: 'PAHADI20' },
];

export const events: Event[] = [
  { id: '1', title: 'Himachali Weddings', description: 'Celebrate your union amidst the timeless beauty of the Himalayas. Our traditional stone courtyard with mountain backdrop seats up to 300 guests. Includes Pahadi folk music, traditional decor, and farm-to-table catering.', capacity: '300 Seating / 500 Floating', pricing: '₹950 Veg • ₹1,200 Non-Veg', icon: 'Ring', features: ['Traditional stone courtyard venue', 'In-house Himachali catering', '50 rooms for wedding guests', 'Pahadi folk music & dance', 'Decor with local flowers & fabrics', 'Bonfire & stargazing setup'], category: 'wedding' },
  { id: '2', title: 'Corporate Retreats', description: 'Escape the boardroom for the serenity of the mountains. Our conference pavilion blends modern AV with traditional architecture. Team-building includes heritage walks, yoga sessions, and trekking.', capacity: 'Up to 60 guests', pricing: 'Custom Quote', icon: 'Building', features: ['Traditional conference pavilion', 'Projector, AV & high-speed WiFi', 'Team-building activities', 'Yoga & meditation sessions', 'Customized catering', 'Nature trails & treks'], category: 'corporate' },
  { id: '3', title: 'Cultural Celebrations', description: 'Celebrate festivals, birthdays, and milestones with a touch of Pahadi tradition. Poolside evenings, orchard picnics, or a grand dinner under the stars.', capacity: 'Up to 200 guests', pricing: 'Custom Quote', icon: 'Cake', features: ['Courtyard & lawn venues', 'Poolside celebration options', 'In-house Himachali catering', 'Folk music performers', 'Bonfire & outdoor dining', 'Photography services'], category: 'celebration' },
  { id: '4', title: 'Dussehra Festival Experience', description: 'Witness the world-famous Kullu Dussehra from our exclusive viewing arrangements. Includes guided visits to the Dussehra grounds, traditional meals, and cultural workshops.', capacity: 'Limited to 20 guests', pricing: '₹15,000 per person', icon: 'Temple', features: ['Exclusive Dussehra viewing', 'Guided heritage walks', 'Traditional Pahadi meals', 'Puja & blessing ceremony', 'Local artisan workshops', 'Photography tour'], category: 'cultural' },
];

export const galleryItems: GalleryItem[] = [
  { id: '1', title: 'Kathkuni Architecture', url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80', caption: 'Our signature stone & wood construction in the evening light', category: 'Architecture' },
  { id: '2', title: 'Mountain View Suite', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', caption: 'The Pahadi Mahal Suite with hand-painted murals', category: 'Rooms' },
  { id: '3', title: 'Chamba Restaurant', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', caption: 'Fine dining with traditional Himachali flavors', category: 'Dining' },
  { id: '4', title: 'Apple Orchard', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80', caption: 'Century-old apple trees in full blossom', category: 'Exterior' },
  { id: '5', title: 'Sunset Over Dhauladhar', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', caption: 'Golden hour from the property terrace', category: 'Exterior' },
  { id: '6', title: 'Traditional Courtyard', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', caption: 'The central courtyard with stone paving and flowering plants', category: 'Architecture' },
  { id: '7', title: 'Cultural Evening', url: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80', caption: 'Pahadi folk dance performance under the stars', category: 'Events' },
  { id: '8', title: 'Riverside Picnic', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', caption: 'Curated picnics by the gurgling Beas river', category: 'Experiences' },
  { id: '9', title: 'Yoga at Sunrise', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', caption: 'Morning yoga with panoramic Himalayan views', category: 'Experiences' },
  { id: '10', title: 'Handcrafted Details', url: 'https://images.unsplash.com/photo-1597074866935-eaedd6607122?w=800&q=80', caption: 'Intricate wood carvings by local artisans', category: 'Architecture' },
  { id: '11', title: 'Bonfire Night', url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80', caption: 'Evening bonfire with stargazing', category: 'Experiences' },
  { id: '12', title: 'Local Village Trek', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Guided trek through traditional Himachali villages', category: 'Experiences' },
];

export const diningMenuItems: MenuItem[] = [
  { id: 'M1', name: 'Siddu', description: 'Steamed wheat dumplings stuffed with poppy seeds & jaggery, served with ghee', price: '₹280', category: 'Starters', traditional: true },
  { id: 'M2', name: 'Madra', description: 'Chickpea & yogurt curry slow-cooked with traditional Himachali spices', price: '₹350', category: 'Main Course', traditional: true },
  { id: 'M3', name: 'Dham Thali', description: 'Traditional festive thali with rice, moong dal, kadi, rajma, and sweet rice', price: '₹650', category: 'Specialty', traditional: true },
  { id: 'M4', name: 'Chana Madra', description: 'Classic Himachali chickpea curry in a yogurt-based gravy', price: '₹320', category: 'Main Course', traditional: true },
  { id: 'M5', name: 'Sepu Vadi', description: 'Lentil dumplings in spinach gravy, a Kangra valley specialty', price: '₹350', category: 'Main Course', traditional: true },
  { id: 'M6', name: 'Khatta', description: 'Tangy lentil soup tempered with garlic and red chilies', price: '₹180', category: 'Soups', traditional: true },
  { id: 'M7', name: 'Auriya Kaddu', description: 'Pumpkin cooked in yogurt and mustard seeds', price: '₹250', category: 'Main Course', traditional: true },
  { id: 'M8', name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken pieces', price: '₹450', category: 'Main Course' },
  { id: 'M9', name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich creamy gravy', price: '₹350', category: 'Main Course' },
  { id: 'M10', name: 'Paneer Tikka', description: 'Grilled cottage cheese with bell peppers and spices', price: '₹380', category: 'Starters' },
  { id: 'M11', name: 'Tandoori Roti', description: 'Traditional clay oven bread', price: '₹40', category: 'Breads' },
  { id: 'M12', name: 'Kullu Trout', description: 'Fresh river trout marinated in Himalayan herbs, pan-seared to perfection', price: '₹550', category: 'Specialty', traditional: true },
  { id: 'M13', name: 'Aktori', description: 'Buckwheat pancakes with leafy greens, served with mint chutney', price: '₹300', category: 'Specialty', traditional: true },
  { id: 'M14', name: 'Kheer', description: 'Traditional rice pudding with cardamom and dry fruits', price: '₹180', category: 'Desserts' },
  { id: 'M15', name: 'Gulab Jamun', description: 'Deep-fried milk dumplings in rose syrup', price: '₹180', category: 'Desserts' },
  { id: 'M16', name: 'Masala Chai', description: 'Traditional Indian spiced tea with ginger and cardamom', price: '₹80', category: 'Beverages' },
  { id: 'M17', name: 'Kullu Apple Cider', description: 'Freshly pressed apple cider from our orchard', price: '₹200', category: 'Beverages', traditional: true },
  { id: 'M18', name: 'Kangra Tea', description: 'Premium green tea from the Kangra valley tea gardens', price: '₹120', category: 'Beverages', traditional: true },
];

export const mockBookings: Booking[] = [
  { id: 'B001', guestName: 'Arunima Thakur', guestEmail: 'arunima@email.com', guestPhone: '+91 98765 43210', roomType: 'kathkuni-kutiya', roomTitle: 'Kathkuni Kutiya', checkIn: '2026-07-15', checkOut: '2026-07-18', guests: 2, status: 'confirmed', totalAmount: 10500, paymentStatus: 'paid', createdAt: '2026-06-10', specialRequests: 'Traditional welcome ceremony requested' },
  { id: 'B002', guestName: 'Vikram Singh', guestEmail: 'vikram@email.com', guestPhone: '+91 98765 43211', roomType: 'pahadi-mahal', roomTitle: 'Pahadi Mahal Suite', checkIn: '2026-07-20', checkOut: '2026-07-25', guests: 2, status: 'pending', totalAmount: 32500, paymentStatus: 'pending', createdAt: '2026-06-15' },
  { id: 'B003', guestName: 'Sophie Müller', guestEmail: 'sophie@email.com', guestPhone: '+91 98765 43212', roomType: 'kathkuni-kutiya', roomTitle: 'Kathkuni Kutiya', checkIn: '2026-06-28', checkOut: '2026-07-02', guests: 1, status: 'checked-in', totalAmount: 14000, paymentStatus: 'paid', createdAt: '2026-05-20' },
  { id: 'B004', guestName: 'Priyanka Mehta', guestEmail: 'priyanka@email.com', guestPhone: '+91 98765 43213', roomType: 'apple-orchard', roomTitle: 'Apple Orchard Room', checkIn: '2026-06-25', checkOut: '2026-06-27', guests: 2, status: 'checked-out', totalAmount: 5600, paymentStatus: 'paid', createdAt: '2026-05-10' },
  { id: 'B005', guestName: 'David Chen', guestEmail: 'david@email.com', guestPhone: '+91 98765 43214', roomType: 'dhauladhar-view', roomTitle: 'Dhauladhar View Room', checkIn: '2026-08-01', checkOut: '2026-08-05', guests: 2, status: 'cancelled', totalAmount: 16000, paymentStatus: 'refunded', createdAt: '2026-06-01' },
];

export const mockGuests: Guest[] = [
  { id: 'G001', name: 'Arunima Thakur', email: 'arunima@email.com', phone: '+91 98765 43210', totalStays: 3, totalSpent: 35000, joinDate: '2025-01-15', status: 'active' },
  { id: 'G002', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 98765 43211', totalStays: 1, totalSpent: 32500, joinDate: '2026-06-15', status: 'active' },
  { id: 'G003', name: 'Sophie Müller', email: 'sophie@email.com', phone: '+91 98765 43212', totalStays: 2, totalSpent: 28000, joinDate: '2025-11-10', status: 'active' },
  { id: 'G004', name: 'Priyanka Mehta', email: 'priyanka@email.com', phone: '+91 98765 43213', totalStays: 2, totalSpent: 12000, joinDate: '2025-08-22', status: 'inactive' },
  { id: 'G005', name: 'David Chen', email: 'david@email.com', phone: '+91 98765 43214', totalStays: 3, totalSpent: 45000, joinDate: '2024-10-05', status: 'active' },
];

export const mockStaff: Staff[] = [
  { id: 'S001', name: 'Mohan Verma', role: 'General Manager', email: 'mohan@pahadiaangan.in', phone: '+91 98000 00001', joinDate: '2019-01-01', status: 'active' },
  { id: 'S002', name: 'Gita Devi', role: 'Hospitality Manager', email: 'gita@pahadiaangan.in', phone: '+91 98000 00002', joinDate: '2020-03-15', status: 'active' },
  { id: 'S003', name: 'Rajinder Thakur', role: 'Executive Chef', email: 'rajinder@pahadiaangan.in', phone: '+91 98000 00003', joinDate: '2019-06-01', status: 'active' },
  { id: 'S004', name: 'Kamla Sharma', role: 'Housekeeping Manager', email: 'kamla@pahadiaangan.in', phone: '+91 98000 00004', joinDate: '2020-08-20', status: 'active' },
  { id: 'S005', name: 'Deepak Kumar', role: 'Cultural Coordinator', email: 'deepak@pahadiaangan.in', phone: '+91 98000 00005', joinDate: '2021-01-10', status: 'active' },
  { id: 'S006', name: 'Lakshmi Negi', role: 'Spa Therapist', email: 'lakshmi@pahadiaangan.in', phone: '+91 98000 00006', joinDate: '2022-04-01', status: 'active' },
];

export const dashboardStats: DashboardStats = {
  totalBookings: 198,
  totalRevenue: 2450000,
  activeGuests: 112,
  occupancyRate: 72,
  pendingBookings: 15,
  confirmedBookings: 12,
  checkedIn: 6,
  cancelledBookings: 4,
};

export const contactInfo = {
  address: 'Village Shamshi, Distt Kullu, Himachal Pradesh 175101',
  addressFull: 'Pahadi Aangan, Shamshi Road, Near Naggar Castle, Kullu Valley, Himachal Pradesh 175101',
  phones: ['+91 98050 17177', '+91 80918 17177'],
  email: 'stay@pahadiaangan.in',
  instagram: 'https://www.instagram.com/pahadiaangan/',
  facebook: 'https://www.facebook.com/pahadiaangan/',
  youtube: 'https://www.youtube.com/@pahadiaangan',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.499!2d77.128482!3d31.913483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904f7175b670789%3A0x2f83623d67f788bd!2sNaggar%20Castle!5e0!3m2!1sen!2sin',
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'B1', slug: 'kathkuni-architecture-guide', title: 'Kathkuni Architecture: Himachal\'s Ancient Building Wisdom', excerpt: 'Discover the ancient building technique that has shaped Himachali architecture for centuries — interlocking stone and deodar wood without a single drop of mortar.', content: 'Kathkuni is a traditional Himachali building technique where stones and deodar wood are interlocked without mortar...', author: 'Mohan Verma', date: '2026-05-15', image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80', category: 'Architecture', tags: ['kathkuni', 'architecture', 'heritage', 'himachal'], featured: true,
  },
  {
    id: 'B2', slug: 'kullu-dussehra-guide', title: 'Kullu Dussehra: A Week-Long Celebration of Faith & Culture', excerpt: 'Experience the world-famous Kullu Dussehra — a unique week-long festival celebrated with processions, folk performances, and traditional rituals.', content: 'Unlike the rest of India where Dussehra is a one-day affair, Kullu celebrates it for a full week...', author: 'Gita Devi', date: '2026-04-28', image: 'https://images.unsplash.com/photo-1577234286642-fc0a0a1b6e1b?w=800&q=80', category: 'Culture', tags: ['dussehra', 'kullu', 'festival', 'culture'], featured: true,
  },
  {
    id: 'B3', slug: 'himachali-cuisine-guide', title: 'A Taste of the Hills: Exploring Traditional Himachali Cuisine', excerpt: 'From Siddu to Madra, embark on a culinary journey through the lesser-known but incredibly rich cuisine of Himachal Pradesh.', content: 'Himachali cuisine is a beautiful reflection of its geography and culture — simple, hearty, and bursting with flavors...', author: 'Rajinder Thakur', date: '2026-04-10', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', category: 'Food', tags: ['cuisine', 'himachali-food', 'siddu', 'madra', 'pahadi'], featured: true,
  },
  {
    id: 'B4', slug: 'trekking-near-kullu', title: '5 Best Treks Near Kullu for Every Type of Traveler', excerpt: 'Whether you\'re a seasoned trekker or a first-timer, these trails around Kullu offer breathtaking views and unforgettable experiences.', content: 'The Kullu Valley is a trekker\'s paradise with trails that range from easy nature walks to challenging alpine expeditions...', author: 'Deepak Kumar', date: '2026-03-20', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Travel', tags: ['trekking', 'kullu', 'himalayas', 'adventure'], featured: false,
  },
  {
    id: 'B5', slug: 'apple-orchard-season', title: 'When the Valley Blooms: A Guide to Apple Blossom Season in Kullu', excerpt: 'Spring paints the Kullu Valley in shades of pink and white. Here\'s everything you need to know about apple blossom season.', content: 'Every spring, the Kullu Valley transforms into a breathtaking canvas of pink and white as apple trees burst into bloom...', author: 'Kamla Sharma', date: '2026-02-28', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80', category: 'Nature', tags: ['apple', 'orchard', 'spring', 'blossom', 'kullu'], featured: false,
  },
  {
    id: 'B6', slug: 'pahadi-folk-music', title: 'The Soul of Himachal: A Journey Through Pahadi Folk Music', excerpt: 'From the energetic Nati dance to the soulful Jhoori, discover the rich musical traditions of Himachal Pradesh.', content: 'Pahadi folk music is the heartbeat of Himachali culture, passed down through generations...', author: 'Gita Devi', date: '2026-01-15', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', category: 'Culture', tags: ['music', 'folk', 'pahadi', 'nati', 'culture'], featured: false,
  },
];

export const experiences: Experience[] = [
  {
    id: 'E1', slug: 'heritage-village-walk', title: 'Heritage Village Walk', subtitle: 'Step back in time', description: 'Guided walk through centuries-old Himachali villages near Naggar. Explore traditional Kathkuni homes, ancient temples, and interact with local artisans practicing age-old crafts.', duration: 'Half Day (4 hours)', price: '₹1,500 per person', images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'], included: ['Professional guide', 'Village visits', 'Temple tours', 'Artisan workshop visit', 'Traditional refreshments'], category: 'Culture',
  },
  {
    id: 'E2', slug: 'apple-orchard-picnic', title: 'Apple Orchard Picnic', subtitle: 'Dine among the blossoms', description: 'A curated picnic experience in our century-old apple orchard. Enjoy traditional Pahadi snacks, fresh apple cider, and the serene beauty of the orchard with mountain views.', duration: '2-3 hours', price: '₹1,200 per person', images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80'], included: ['Picnic setup', 'Traditional Pahadi snacks', 'Apple cider', 'Fresh fruits', 'Photography'], category: 'Food',
  },
  {
    id: 'E3', slug: 'cooking-class', title: 'Pahadi Cooking Class', subtitle: 'Learn the secrets of Himachali cuisine', description: 'Join our chef for a hands-on cooking class where you\'ll learn to make traditional Himachali dishes like Siddu, Madra, and Dham. Ends with a meal you cooked yourself.', duration: 'Half Day (4 hours)', price: '₹2,500 per person', images: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'], included: ['Hands-on cooking session', 'Recipe booklet', 'Traditional meal', 'Local ingredients', 'Apron & hat'], category: 'Food',
  },
  {
    id: 'E4', slug: 'river-rafting', title: 'Beas River Rafting', subtitle: 'Conquer the rapids', description: 'Experience the thrill of white-water rafting on the pristine Beas River. Suitable for beginners and experienced rafters with professional guides and equipment.', duration: 'Full Day (6 hours)', price: '₹2,800 per person', images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'], included: ['Professional rafting guide', 'Safety equipment', 'Pickup & drop', 'Lunch by the river', 'Photographs'], category: 'Adventure',
  },
  {
    id: 'E5', slug: 'yoga-meditation', title: 'Yoga & Meditation Retreat', subtitle: 'Find your inner peace', description: 'Morning yoga sessions in our traditional wooden pavilion with panoramic Himalayan views. Includes guided meditation, pranayama, and philosophical discussions.', duration: 'Daily (6:00 AM - 8:00 AM)', price: 'Complimentary for guests', images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'], included: ['Yoga mat', 'Guided session', 'Meditation', 'Herbal tea', 'Pranayama'], category: 'Wellness',
  },
  {
    id: 'E6', slug: 'paragliding', title: 'Solang Valley Paragliding', subtitle: 'Soar like an eagle', description: 'Soar above the stunning Solang Valley with expert paragliding instructors. Experience the thrill of flying over pine forests, rivers, and snow-capped peaks.', duration: 'Half Day (3 hours flight time 15-20 min)', price: '₹3,500 per person', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'], included: ['Professional instructor', 'All safety gear', 'Video recording', 'Transportation', 'Certificate'], category: 'Adventure',
  },
  {
    id: 'E7', slug: 'temple-tour', title: 'Temple Trail of Kullu', subtitle: 'Discover ancient mountain shrines', description: 'Visit the most revered temples in the Kullu Valley including Hadimba Devi Temple, Manu Temple, and the ancient Shiva temples of Naggar. Each with fascinating legends.', duration: 'Full Day (8 hours)', price: '₹2,000 per person', images: ['https://images.unsplash.com/photo-1606293926075-69a00f0d0e2d?w=800&q=80'], included: ['Temple visits', 'Guide', 'Transportation', 'Traditional lunch', 'Puja offerings'], category: 'Culture',
  },
  {
    id: 'E8', slug: 'stargazing', title: 'Himalayan Stargazing', subtitle: 'Under the clearest skies', description: 'Experience the unparalleled clarity of Himalayan night skies. Our guide will walk you through constellations, planets, and the Milky Way visible from our dark-sky location.', duration: 'Evening (2 hours, post-dinner)', price: 'Complimentary for guests', images: ['https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80'], included: ['Telescope', 'Astronomy guide', 'Blankets & seating', 'Hot chocolate', 'Star charts'], category: 'Nature',
  },
];

export const spaTreatments: SpaTreatment[] = [
  { id: 'S1', title: 'Himalayan Herbal Massage', description: 'A deeply therapeutic massage using hand-pounded Himalayan herbs and warm essential oils. Our therapists use traditional techniques passed down through generations to release tension and rejuvenate your body.', duration: '60 min', price: '₹2,500', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', category: 'Massage' },
  { id: 'S2', title: 'Kathkuni Hot Stone Therapy', description: 'Inspired by the stone-and-wood philosophy of Kathkuni architecture, this treatment uses heated river stones placed on energy points combined with a warm oil massage. Deeply grounding and restorative.', duration: '75 min', price: '₹3,200', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', category: 'Massage' },
  { id: 'S3', title: 'Pahadi Aromatherapy', description: 'Customized blend of essential oils distilled from Himalayan flowers and herbs — rhododendron, cedar, lavender, and eucalyptus. A sensory journey through the mountains.', duration: '60 min', price: '₹2,800', image: 'https://images.unsplash.com/photo-1600612271017-8e7a5f5e9f6e?w=800&q=80', category: 'Massage' },
  { id: 'S4', title: 'Ayurvedic Panchakarma', description: 'Traditional Ayurvedic detoxification treatment customized to your dosha. Includes herbal oil massage, steam therapy, and dietary consultation.', duration: '90 min', price: '₹4,000', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', category: 'Ayurveda' },
  { id: 'S5', title: 'Apple Orchard Body Scrub', description: 'Exfoliating scrub made from crushed apple seeds, oatmeal, and honey from our own hives. Followed by a warm milk and rose petal bath. Leaves your skin glowing.', duration: '60 min', price: '₹2,800', image: 'https://images.unsplash.com/photo-1570179499640-d01f1e0e6e6b?w=800&q=80', category: 'Body' },
  { id: 'S6', title: 'Himalayan Salt Steam', description: 'Steam therapy in our traditional cedar-wood steam room infused with Himalayan pink salt and mountain herbs. Opens pores, clears sinuses, and deeply relaxes muscles.', duration: '45 min', price: '₹1,800', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80', category: 'Steam' },
  { id: 'S7', title: 'Couple\'s Himalayan Retreat', description: 'A romantic spa journey for two with side-by-side massages, a rose petal bath, and sparkling apple cider. The perfect indulgence for couples.', duration: '90 min', price: '₹6,500', image: 'https://images.unsplash.com/photo-1583425422901-3ce7a4dcf8f4?w=800&q=80', category: 'Couple' },
  { id: 'S8', title: 'Shirodhara Therapy', description: 'Ancient Ayurvedic treatment where warm medicated oil is gently poured over the forehead in a rhythmic stream. Deeply calming for the mind and nervous system.', duration: '60 min', price: '₹3,000', image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&q=80', category: 'Ayurveda' },
];
