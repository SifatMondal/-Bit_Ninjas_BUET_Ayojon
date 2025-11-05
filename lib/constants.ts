export const CITIES = [
  { name: 'Dhaka', namebn: 'ঢাকা', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', namebn: 'চট্টগ্রাম', lat: 22.3569, lng: 91.7832 },
  { name: 'Rajshahi', namebn: 'রাজশাহী', lat: 24.3745, lng: 88.6042 },
  { name: 'Bogura', namebn: 'বগুড়া', lat: 24.8465, lng: 89.3772 },
  { name: 'Sylhet', namebn: 'সিলেট', lat: 24.8949, lng: 91.8687 },
  { name: 'Khulna', namebn: 'খুলনা', lat: 22.8456, lng: 89.5403 },
  { name: 'Barishal', namebn: 'বরিশাল', lat: 22.701, lng: 90.3535 },
  { name: 'Rangpur', namebn: 'রংপুর', lat: 25.7439, lng: 89.2752 },
];

export const CATEGORIES = [
  { id: 'photographer', name: 'Photographer', namebn: 'ফটোগ্রাফার' },
  { id: 'caterer', name: 'Caterer', namebn: 'ক্যাটারার' },
  { id: 'makeup-artist', name: 'Makeup Artist', namebn: 'মেকআপ আর্টিস্ট' },
  { id: 'decorator', name: 'Decorator', namebn: 'ডেকোরেটর' },
  { id: 'venue', name: 'Venue', namebn: 'ভেন্যু' },
  { id: 'dj-sound', name: 'DJ & Sound', namebn: 'ডিজে এবং সাউন্ড' },
];

export const CURRENCY = 'BDT';
export const DEFAULT_LOCALE = 'en';
export const DISTANCE_DECAY_KM = 25; // Distance after which relevance starts to decay
export const SEARCH_BLEND_WEIGHTS = {
  semantic: 0.5,
  rating: 0.3,
  distance: 0.2,
};
