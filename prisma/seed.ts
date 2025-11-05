import { PrismaClient, Role, BookingStatus, PaymentStatus, KYCStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Bangladesh Cities with coordinates
const cities = [
  { name: 'Dhaka', nameEn: 'Dhaka', nameBn: 'ঢাকা', slug: 'dhaka', geoPoint: { lat: 23.8103, lng: 90.4125 } },
  { name: 'Rajshahi', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', slug: 'rajshahi', geoPoint: { lat: 24.3745, lng: 88.6042 } },
  { name: 'Bogura', nameEn: 'Bogura', nameBn: 'বগুড়া', slug: 'bogura', geoPoint: { lat: 24.8465, lng: 89.3771 } },
  { name: 'Chattogram', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', slug: 'chattogram', geoPoint: { lat: 22.3569, lng: 91.7832 } },
  { name: 'Sylhet', nameEn: 'Sylhet', nameBn: 'সিলেট', slug: 'sylhet', geoPoint: { lat: 24.8949, lng: 91.8687 } },
];

// Service Categories
const categories = [
  {
    name: 'Photography',
    nameEn: 'Photography',
    nameBn: 'ফটোগ্রাফি',
    slug: 'photography',
    description: 'Professional photographers for all occasions',
    icon: 'camera',
  },
  {
    name: 'Catering',
    nameEn: 'Catering',
    nameBn: 'ক্যাটারিং',
    slug: 'catering',
    description: 'Delicious food services for events',
    icon: 'utensils-crossed',
  },
  {
    name: 'Makeup Artist',
    nameEn: 'Makeup Artist',
    nameBn: 'মেকআপ আর্টিস্ট',
    slug: 'makeup-artist',
    description: 'Professional makeup artists',
    icon: 'sparkles',
  },
  {
    name: 'Decorator',
    nameEn: 'Decorator',
    nameBn: 'সজ্জাকারী',
    slug: 'decorator',
    description: 'Event decoration and stage design',
    icon: 'party-popper',
  },
  {
    name: 'Venue',
    nameEn: 'Venue',
    nameBn: 'ভেন্যু',
    slug: 'venue',
    description: 'Event venues and halls',
    icon: 'building-2',
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in development only!)
  console.log('🧹 Cleaning database...');
  await prisma.notification.deleteMany();
  await prisma.searchEvent.deleteMany();
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.businessCategory.deleteMany();
  await prisma.business.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.city.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Seed Cities
  console.log('🏙️  Seeding cities...');
  const createdCities = await Promise.all(
    cities.map((city, index) =>
      prisma.city.create({
        data: { ...city, sortOrder: index },
      })
    )
  );
  console.log(`✅ Created ${createdCities.length} cities`);

  // Seed Categories
  console.log('📦 Seeding categories...');
  const createdCategories = await Promise.all(
    categories.map((cat, index) =>
      prisma.serviceCategory.create({
        data: { ...cat, sortOrder: index },
      })
    )
  );
  console.log(`✅ Created ${createdCategories.length} categories`);

  // Create Users
  console.log('👥 Seeding users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@ayojon.com',
      password: hashedPassword,
      name: 'Admin User',
      phone: '+8801700000000',
      role: Role.ADMIN,
    },
  });

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'rahim@example.com',
        password: hashedPassword,
        name: 'Abdul Rahim',
        phone: '+8801711111111',
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'fatima@example.com',
        password: hashedPassword,
        name: 'Fatima Khatun',
        phone: '+8801722222222',
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'karim@example.com',
        password: hashedPassword,
        name: 'Karim Ahmed',
        phone: '+8801733333333',
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ayesha@example.com',
        password: hashedPassword,
        name: 'Ayesha Begum',
        phone: '+8801744444444',
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ibrahim@example.com',
        password: hashedPassword,
        name: 'Ibrahim Hassan',
        phone: '+8801755555555',
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'nadia@example.com',
        password: hashedPassword,
        name: 'Nadia Islam',
        phone: '+8801766666666',
        role: Role.USER,
      },
    }),
  ]);
  console.log(`✅ Created ${users.length + 1} users (including admin)`);

  // Create Business Owners
  console.log('🏢 Seeding businesses...');
  const businessOwners = await Promise.all([
    // Photographers
    prisma.user.create({
      data: {
        email: 'info@momentscapture.com',
        password: hashedPassword,
        name: 'Moments Capture Studio',
        phone: '+8801800000001',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'contact@visualstory.com',
        password: hashedPassword,
        name: 'Visual Story Photography',
        phone: '+8801800000002',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'hello@pixelperfect.com',
        password: hashedPassword,
        name: 'Pixel Perfect Studios',
        phone: '+8801800000003',
        role: Role.BUSINESS,
      },
    }),
    // Caterers
    prisma.user.create({
      data: {
        email: 'orders@tastycatering.com',
        password: hashedPassword,
        name: 'Tasty Catering BD',
        phone: '+8801800000004',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'info@royalfeast.com',
        password: hashedPassword,
        name: 'Royal Feast Caterers',
        phone: '+8801800000005',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'contact@spiceroute.com',
        password: hashedPassword,
        name: 'Spice Route Catering',
        phone: '+8801800000006',
        role: Role.BUSINESS,
      },
    }),
    // Makeup Artists
    prisma.user.create({
      data: {
        email: 'booking@glamstudio.com',
        password: hashedPassword,
        name: 'Glam Studio',
        phone: '+8801800000007',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'hello@beautybynoor.com',
        password: hashedPassword,
        name: 'Beauty by Noor',
        phone: '+8801800000008',
        role: Role.BUSINESS,
      },
    }),
    // Decorators
    prisma.user.create({
      data: {
        email: 'info@dreamdecor.com',
        password: hashedPassword,
        name: 'Dream Decor',
        phone: '+8801800000009',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'contact@elegantevents.com',
        password: hashedPassword,
        name: 'Elegant Events',
        phone: '+8801800000010',
        role: Role.BUSINESS,
      },
    }),
    // Venues
    prisma.user.create({
      data: {
        email: 'bookings@grandballroom.com',
        password: hashedPassword,
        name: 'Grand Ballroom',
        phone: '+8801800000011',
        role: Role.BUSINESS,
      },
    }),
    prisma.user.create({
      data: {
        email: 'info@skyviewhall.com',
        password: hashedPassword,
        name: 'SkyView Convention Hall',
        phone: '+8801800000012',
        role: Role.BUSINESS,
      },
    }),
  ]);

  // Business Details
  const businessData = [
    // Photographers
    {
      owner: businessOwners[0],
      name: 'Moments Capture Studio',
      slug: 'moments-capture-studio-dhaka',
      description: 'Professional wedding and event photography with 10+ years of experience. We specialize in capturing candid moments and creating beautiful memories that last forever.',
      city: 'Dhaka',
      geoPoint: { lat: 23.7805, lng: 90.4200 },
      categoryIndexes: [0], // Photography
      avgRating: 4.8,
      totalReviews: 45,
      completedJobs: 120,
      yearEstablished: 2013,
      teamSize: '6-10',
    },
    {
      owner: businessOwners[1],
      name: 'Visual Story Photography',
      slug: 'visual-story-photography-chattogram',
      description: 'Award-winning photography studio specializing in weddings, portraits, and corporate events. We blend traditional and contemporary styles.',
      city: 'Chattogram',
      geoPoint: { lat: 22.3475, lng: 91.8123 },
      categoryIndexes: [0],
      avgRating: 4.9,
      totalReviews: 62,
      completedJobs: 150,
      yearEstablished: 2015,
      teamSize: '6-10',
    },
    {
      owner: businessOwners[2],
      name: 'Pixel Perfect Studios',
      slug: 'pixel-perfect-studios-sylhet',
      description: 'Modern photography and videography services with drone coverage. Perfect for destination weddings and special events.',
      city: 'Sylhet',
      geoPoint: { lat: 24.9036, lng: 91.8560 },
      categoryIndexes: [0],
      avgRating: 4.7,
      totalReviews: 38,
      completedJobs: 95,
      yearEstablished: 2018,
      teamSize: '1-5',
    },
    // Caterers
    {
      owner: businessOwners[3],
      name: 'Tasty Catering BD',
      slug: 'tasty-catering-bd-dhaka',
      description: 'Full-service catering for all occasions. From traditional Bengali cuisine to international dishes. We serve 50-2000 guests.',
      city: 'Dhaka',
      geoPoint: { lat: 23.7925, lng: 90.4078 },
      categoryIndexes: [1], // Catering
      avgRating: 4.6,
      totalReviews: 78,
      completedJobs: 200,
      yearEstablished: 2010,
      teamSize: '11-50',
    },
    {
      owner: businessOwners[4],
      name: 'Royal Feast Caterers',
      slug: 'royal-feast-caterers-rajshahi',
      description: 'Premium catering service with expert chefs. Specializing in wedding feasts, holud, and corporate events with authentic flavors.',
      city: 'Rajshahi',
      geoPoint: { lat: 24.3650, lng: 88.5950 },
      categoryIndexes: [1],
      avgRating: 4.8,
      totalReviews: 55,
      completedJobs: 165,
      yearEstablished: 2012,
      teamSize: '11-50',
    },
    {
      owner: businessOwners[5],
      name: 'Spice Route Catering',
      slug: 'spice-route-catering-bogura',
      description: 'Innovative fusion cuisine blending traditional and modern flavors. Perfect for those seeking unique culinary experiences.',
      city: 'Bogura',
      geoPoint: { lat: 24.8520, lng: 89.3700 },
      categoryIndexes: [1],
      avgRating: 4.5,
      totalReviews: 42,
      completedJobs: 110,
      yearEstablished: 2016,
      teamSize: '6-10',
    },
    // Makeup Artists
    {
      owner: businessOwners[6],
      name: 'Glam Studio',
      slug: 'glam-studio-dhaka',
      description: 'Professional bridal and party makeup with international training. Using premium products for flawless, long-lasting looks.',
      city: 'Dhaka',
      geoPoint: { lat: 23.7550, lng: 90.3890 },
      categoryIndexes: [2], // Makeup
      avgRating: 4.9,
      totalReviews: 95,
      completedJobs: 180,
      yearEstablished: 2014,
      teamSize: '1-5',
    },
    {
      owner: businessOwners[7],
      name: 'Beauty by Noor',
      slug: 'beauty-by-noor-chattogram',
      description: 'Personalized makeup and hair styling for brides and special occasions. Traditional and contemporary looks with attention to detail.',
      city: 'Chattogram',
      geoPoint: { lat: 22.3600, lng: 91.7900 },
      categoryIndexes: [2],
      avgRating: 4.8,
      totalReviews: 67,
      completedJobs: 145,
      yearEstablished: 2017,
      teamSize: '1-5',
    },
    // Decorators
    {
      owner: businessOwners[8],
      name: 'Dream Decor',
      slug: 'dream-decor-dhaka',
      description: 'Complete event decoration services - stage design, floral arrangements, lighting, and theme decor for weddings and corporate events.',
      city: 'Dhaka',
      geoPoint: { lat: 23.8000, lng: 90.4150 },
      categoryIndexes: [3], // Decorator
      avgRating: 4.7,
      totalReviews: 58,
      completedJobs: 135,
      yearEstablished: 2015,
      teamSize: '11-50',
    },
    {
      owner: businessOwners[9],
      name: 'Elegant Events',
      slug: 'elegant-events-sylhet',
      description: 'Luxury event decoration with custom themes. From intimate gatherings to grand celebrations, we create unforgettable atmospheres.',
      city: 'Sylhet',
      geoPoint: { lat: 24.8850, lng: 91.8700 },
      categoryIndexes: [3],
      avgRating: 4.6,
      totalReviews: 44,
      completedJobs: 98,
      yearEstablished: 2016,
      teamSize: '6-10',
    },
    // Venues
    {
      owner: businessOwners[10],
      name: 'Grand Ballroom',
      slug: 'grand-ballroom-dhaka',
      description: 'Spacious 5-star convention center in the heart of Dhaka. Capacity: 500-2000 guests. Full AV equipment, catering kitchen, and parking.',
      city: 'Dhaka',
      geoPoint: { lat: 23.7600, lng: 90.3950 },
      categoryIndexes: [4], // Venue
      avgRating: 4.8,
      totalReviews: 72,
      completedJobs: 185,
      yearEstablished: 2008,
      teamSize: '50+',
    },
    {
      owner: businessOwners[11],
      name: 'SkyView Convention Hall',
      slug: 'skyview-convention-hall-chattogram',
      description: 'Modern convention hall with panoramic city views. Perfect for weddings, conferences, and social events. Capacity: 300-800 guests.',
      city: 'Chattogram',
      geoPoint: { lat: 22.3550, lng: 91.7850 },
      categoryIndexes: [4],
      avgRating: 4.7,
      totalReviews: 51,
      completedJobs: 125,
      yearEstablished: 2011,
      teamSize: '11-50',
    },
  ];

  const businesses = [];
  for (const biz of businessData) {
    const business = await prisma.business.create({
      data: {
        userId: biz.owner.id,
        businessName: biz.name,
        slug: biz.slug,
        description: biz.description,
        phone: biz.owner.phone!,
        email: biz.owner.email,
        address: `${biz.city}, Bangladesh`,
        city: biz.city,
        geoPoint: biz.geoPoint,
        yearEstablished: biz.yearEstablished,
        teamSize: biz.teamSize,
        kycStatus: KYCStatus.VERIFIED,
        verifiedAt: new Date(),
        avgRating: biz.avgRating,
        totalReviews: biz.totalReviews,
        completedJobs: biz.completedJobs,
        isActive: true,
      },
    });

    // Link categories
    for (const catIndex of biz.categoryIndexes) {
      await prisma.businessCategory.create({
        data: {
          businessId: business.id,
          categoryId: createdCategories[catIndex].id,
        },
      });
    }

    businesses.push(business);
  }
  console.log(`✅ Created ${businesses.length} businesses`);

  // Create Listings
  console.log('📝 Seeding listings...');
  const listingData = [
    // Photography listings
    {
      businessId: businesses[0].id,
      categoryId: createdCategories[0].id,
      title: 'Wedding Photography Package',
      description: 'Full-day wedding coverage with 2 photographers, 500+ edited photos, 1 album, and online gallery.',
      priceMin: 35000,
      priceMax: 80000,
      priceUnit: 'per event',
      features: ['2 Photographers', '500+ Photos', 'Photo Album', 'Online Gallery', 'Same Day Edit Video'],
    },
    {
      businessId: businesses[1].id,
      categoryId: createdCategories[0].id,
      title: 'Premium Wedding Photography',
      description: 'Luxury wedding photography with cinematic videography, drone shots, and designer album.',
      priceMin: 50000,
      priceMax: 120000,
      priceUnit: 'per event',
      features: ['3 Photographers', 'Videography', 'Drone Coverage', 'Designer Album', 'Highlight Reel'],
    },
    {
      businessId: businesses[2].id,
      categoryId: createdCategories[0].id,
      title: 'Destination Wedding Package',
      description: 'Complete coverage for destination weddings with travel, accommodation, and multi-day shoots.',
      priceMin: 60000,
      priceMax: 150000,
      priceUnit: 'per event',
      features: ['Full Team', 'Travel Included', 'Multi-day Coverage', '4K Video', 'Drone'],
    },
    // Catering listings
    {
      businessId: businesses[3].id,
      categoryId: createdCategories[1].id,
      title: 'Wedding Feast Catering',
      description: 'Traditional Bengali wedding menu with 10+ dishes. Includes setup, service staff, and cleanup.',
      priceMin: 450,
      priceMax: 850,
      priceUnit: 'per person',
      features: ['10+ Dishes', 'Service Staff', 'Table Setup', 'Crockery', 'Cleanup'],
    },
    {
      businessId: businesses[4].id,
      categoryId: createdCategories[1].id,
      title: 'Premium Wedding Catering',
      description: 'Gourmet wedding catering with live cooking stations, dessert bar, and premium service.',
      priceMin: 650,
      priceMax: 1200,
      priceUnit: 'per person',
      features: ['Live Stations', 'Premium Menu', 'Dessert Bar', 'Beverage Service', 'Decor Setup'],
    },
    {
      businessId: businesses[5].id,
      categoryId: createdCategories[1].id,
      title: 'Fusion Cuisine Package',
      description: 'Modern fusion menu blending Bengali, Indian, and Continental dishes for contemporary celebrations.',
      priceMin: 550,
      priceMax: 950,
      priceUnit: 'per person',
      features: ['Fusion Menu', 'Chef on Site', 'Custom Menu', 'Tasting Session', 'Full Service'],
    },
    // Makeup listings
    {
      businessId: businesses[6].id,
      categoryId: createdCategories[2].id,
      title: 'Bridal Makeup Package',
      description: 'Complete bridal makeup with HD products, hair styling, saree draping, and touch-ups throughout the day.',
      priceMin: 25000,
      priceMax: 60000,
      priceUnit: 'per event',
      features: ['HD Makeup', 'Hair Styling', 'Saree Draping', 'Touch-ups', 'Trial Session'],
    },
    {
      businessId: businesses[7].id,
      categoryId: createdCategories[2].id,
      title: 'Bridal Beauty Complete',
      description: 'Full bridal transformation including pre-wedding skincare, makeup, hair, and jewelry styling.',
      priceMin: 30000,
      priceMax: 75000,
      priceUnit: 'per event',
      features: ['Pre-wedding Care', 'Premium Makeup', 'Hair Design', 'Jewelry Styling', 'Follow-up'],
    },
    // Decorator listings
    {
      businessId: businesses[8].id,
      categoryId: createdCategories[3].id,
      title: 'Complete Wedding Decoration',
      description: 'Full venue decoration including stage, entrance, photo booth, floral arrangements, and lighting.',
      priceMin: 80000,
      priceMax: 250000,
      priceUnit: 'per event',
      features: ['Stage Design', 'Floral Decor', 'Lighting', 'Entrance Setup', 'Photo Booth'],
    },
    {
      businessId: businesses[9].id,
      categoryId: createdCategories[3].id,
      title: 'Luxury Event Decoration',
      description: 'Premium themed decoration with custom props, designer florals, and specialty lighting.',
      priceMin: 120000,
      priceMax: 400000,
      priceUnit: 'per event',
      features: ['Custom Theme', 'Designer Florals', 'LED Lighting', 'Props', '3D Design Preview'],
    },
    // Venue listings
    {
      businessId: businesses[10].id,
      categoryId: createdCategories[4].id,
      title: 'Grand Ballroom Venue',
      description: 'Luxurious 5-star ballroom with complete facilities for 500-2000 guests.',
      priceMin: 150000,
      priceMax: 500000,
      priceUnit: 'per day',
      features: ['AC Hall', 'AV Equipment', 'Parking', 'Catering Kitchen', 'Green Rooms', 'WiFi'],
    },
    {
      businessId: businesses[11].id,
      categoryId: createdCategories[4].id,
      title: 'SkyView Hall Booking',
      description: 'Modern convention hall with city views, perfect for weddings and corporate events.',
      priceMin: 100000,
      priceMax: 350000,
      priceUnit: 'per day',
      features: ['Panoramic Views', 'AC', 'Stage', 'Sound System', 'Parking', 'Changing Rooms'],
    },
  ];

  for (const listing of listingData) {
    await prisma.listing.create({
      data: {
        ...listing,
        slug: listing.title.toLowerCase().replace(/\s+/g, '-'),
        images: [],
        keywords: [],
      },
    });
  }
  console.log(`✅ Created ${listingData.length} listings`);

  // Create Bookings
  console.log('📅 Seeding bookings...');
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + 45);

  const bookings = await Promise.all([
    // Completed bookings
    prisma.booking.create({
      data: {
        userId: users[0].id,
        businessId: businesses[0].id,
        listingId: await prisma.listing.findFirst({ where: { businessId: businesses[0].id } }).then(l => l?.id),
        eventDate: new Date('2024-10-15'),
        eventCity: 'Dhaka',
        eventAddress: 'Gulshan Community Center',
        description: 'Wedding photography needed for 300 guests event',
        guestCount: 300,
        quotedPrice: 45000,
        finalPrice: 45000,
        status: BookingStatus.COMPLETED,
        completedAt: new Date('2024-10-16'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[1].id,
        businessId: businesses[3].id,
        eventDate: new Date('2024-11-20'),
        eventCity: 'Dhaka',
        eventAddress: 'Banani Convention Hall',
        description: 'Catering for 500 guests wedding reception',
        guestCount: 500,
        quotedPrice: 375000,
        finalPrice: 350000,
        status: BookingStatus.COMPLETED,
        completedAt: new Date('2024-11-21'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[2].id,
        businessId: businesses[6].id,
        eventDate: new Date('2024-12-05'),
        eventCity: 'Dhaka',
        eventAddress: 'Home Service',
        description: 'Bridal makeup for wedding day',
        quotedPrice: 35000,
        finalPrice: 35000,
        status: BookingStatus.COMPLETED,
        completedAt: new Date('2024-12-06'),
      },
    }),
    // Upcoming bookings
    prisma.booking.create({
      data: {
        userId: users[3].id,
        businessId: businesses[1].id,
        eventDate: futureDate,
        eventCity: 'Chattogram',
        eventAddress: 'Radisson Blu',
        description: 'Premium wedding photography package needed',
        guestCount: 400,
        quotedPrice: 65000,
        finalPrice: 60000,
        status: BookingStatus.CONFIRMED,
        confirmedAt: new Date(),
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[4].id,
        businessId: businesses[8].id,
        eventDate: futureDate,
        eventCity: 'Dhaka',
        description: 'Full wedding decoration needed',
        quotedPrice: 150000,
        status: BookingStatus.QUOTED,
      },
    }),
    // Pending bookings
    prisma.booking.create({
      data: {
        userId: users[5].id,
        businessId: businesses[4].id,
        eventDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        eventCity: 'Rajshahi',
        description: 'Wedding catering for 600 guests',
        guestCount: 600,
        status: BookingStatus.PENDING,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[0].id,
        businessId: businesses[10].id,
        eventDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
        eventCity: 'Dhaka',
        description: 'Need venue for corporate event',
        guestCount: 800,
        status: BookingStatus.PENDING,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[1].id,
        businessId: businesses[7].id,
        eventDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        eventCity: 'Chattogram',
        description: 'Bridal makeup for destination wedding',
        status: BookingStatus.QUOTED,
        quotedPrice: 45000,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[2].id,
        businessId: businesses[9].id,
        eventDate: new Date(now.getTime() + 75 * 24 * 60 * 60 * 1000),
        eventCity: 'Sylhet',
        description: 'Luxury theme decoration for wedding',
        guestCount: 350,
        status: BookingStatus.ACCEPTED,
        quotedPrice: 180000,
        finalPrice: 175000,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[3].id,
        businessId: businesses[5].id,
        eventDate: new Date(now.getTime() + 50 * 24 * 60 * 60 * 1000),
        eventCity: 'Bogura',
        description: 'Fusion catering for 200 guests',
        guestCount: 200,
        status: BookingStatus.PENDING,
      },
    }),
  ]);
  console.log(`✅ Created ${bookings.length} bookings`);

  // Create Payments for completed bookings
  console.log('💳 Seeding payments...');
  const completedBookings = bookings.filter(b => b.status === BookingStatus.COMPLETED);
  for (let i = 0; i < completedBookings.length; i++) {
    await prisma.payment.create({
      data: {
        bookingId: completedBookings[i].id,
        amount: completedBookings[i].finalPrice!,
        transactionId: `TXN${Date.now()}${i}`,
        sslSessionId: `SSL${Date.now()}${i}`,
        status: PaymentStatus.PAID,
        paidAt: completedBookings[i].completedAt,
      },
    });
  }
  console.log(`✅ Created ${completedBookings.length} payments`);

  // Create Reviews for completed bookings
  console.log('⭐ Seeding reviews...');
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        bookingId: completedBookings[0].id,
        userId: completedBookings[0].userId,
        businessId: completedBookings[0].businessId,
        rating: 5,
        qualityRating: 5,
        professionalismRating: 5,
        valueRating: 4,
        communicationRating: 5,
        title: 'Excellent Photography Service!',
        comment: 'Moments Capture did an amazing job at our wedding. The team was professional, creative, and captured every special moment beautifully. Highly recommend!',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[1].id,
        userId: completedBookings[1].userId,
        businessId: completedBookings[1].businessId,
        rating: 5,
        qualityRating: 5,
        professionalismRating: 5,
        valueRating: 5,
        communicationRating: 4,
        title: 'Delicious Food, Great Service',
        comment: 'The food was absolutely delicious! All our guests were impressed. The service team was professional and handled everything smoothly. Worth every taka!',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[2].id,
        userId: completedBookings[2].userId,
        businessId: completedBookings[2].businessId,
        rating: 5,
        qualityRating: 5,
        professionalismRating: 5,
        valueRating: 5,
        communicationRating: 5,
        title: 'Perfect Bridal Look!',
        comment: 'Glam Studio made me feel like a princess on my wedding day! The makeup was flawless and lasted the entire day. Thank you so much!',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[0].id,
        userId: users[4].id,
        businessId: completedBookings[0].businessId,
        rating: 4,
        qualityRating: 4,
        professionalismRating: 5,
        valueRating: 4,
        communicationRating: 4,
        comment: 'Great service overall. Quick responses and professional work. Would definitely hire again for future events.',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[1].id,
        userId: users[5].id,
        businessId: completedBookings[1].businessId,
        rating: 5,
        qualityRating: 5,
        professionalismRating: 5,
        valueRating: 4,
        communicationRating: 5,
        title: 'Highly Professional Team',
        comment: 'From planning to execution, everything was perfect. The team was very accommodating with our special menu requests. Excellent experience!',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[2].id,
        userId: users[0].id,
        businessId: completedBookings[2].businessId,
        rating: 5,
        qualityRating: 5,
        professionalismRating: 5,
        valueRating: 5,
        communicationRating: 5,
        title: 'Best Makeup Artist in Dhaka',
        comment: 'Absolutely stunning work! The attention to detail was incredible. My wife looked gorgeous. Thank you Glam Studio!',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[0].id,
        userId: users[3].id,
        businessId: completedBookings[0].businessId,
        rating: 4,
        qualityRating: 4,
        professionalismRating: 4,
        valueRating: 4,
        communicationRating: 4,
        comment: 'Good photography service. Photos turned out nice. A bit pricey but quality is there.',
        images: [],
      },
    }),
    prisma.review.create({
      data: {
        bookingId: completedBookings[1].id,
        userId: users[2].id,
        businessId: completedBookings[1].businessId,
        rating: 5,
        title: 'Outstanding Catering Service',
        comment: 'The best catering service we have used. Food was fresh, tasty, and beautifully presented. Guests are still talking about it!',
        images: [],
      },
    }),
  ]);
  console.log(`✅ Created ${reviews.length} reviews`);

  // Create some messages
  console.log('💬 Seeding messages...');
  await Promise.all([
    prisma.message.create({
      data: {
        bookingId: bookings[4].id,
        senderId: users[4].id,
        businessId: businesses[8].id,
        content: 'Hi! I would like to know more about your decoration packages. Can we schedule a meeting?',
      },
    }),
    prisma.message.create({
      data: {
        bookingId: bookings[4].id,
        senderId: businessOwners[8].id,
        businessId: businesses[8].id,
        content: 'Hello! Thank you for your interest. Yes, we would love to meet. What time works best for you?',
        isRead: true,
      },
    }),
    prisma.message.create({
      data: {
        bookingId: bookings[5].id,
        senderId: users[5].id,
        businessId: businesses[4].id,
        content: 'Do you provide vegetarian options? We will have about 100 vegetarian guests.',
      },
    }),
  ]);
  console.log('✅ Created sample messages');

  // Create search events
  console.log('🔍 Seeding search events...');
  await Promise.all([
    prisma.searchEvent.create({
      data: {
        userId: users[0].id,
        query: 'photographer for wedding in Dhaka under 50000',
        parsedIntent: {
          service: 'photography',
          city: 'Dhaka',
          budgetMax: 50000,
          event: 'wedding',
        },
        categoryId: createdCategories[0].id,
        city: 'Dhaka',
        budgetMax: 50000,
        resultCount: 3,
      },
    }),
    prisma.searchEvent.create({
      data: {
        userId: users[1].id,
        query: 'caterer in Chattogram for 500 people',
        parsedIntent: {
          service: 'catering',
          city: 'Chattogram',
          guestCount: 500,
        },
        categoryId: createdCategories[1].id,
        city: 'Chattogram',
        resultCount: 2,
      },
    }),
  ]);
  console.log('✅ Created search events');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Cities: ${createdCities.length}`);
  console.log(`   Categories: ${createdCategories.length}`);
  console.log(`   Users: ${users.length + 1} (including admin)`);
  console.log(`   Businesses: ${businesses.length}`);
  console.log(`   Listings: ${listingData.length}`);
  console.log(`   Bookings: ${bookings.length}`);
  console.log(`   Reviews: ${reviews.length}`);
  console.log('\n✅ You can now log in with:');
  console.log('   Admin: admin@ayojon.com / password123');
  console.log('   User: rahim@example.com / password123');
  console.log('   Business: info@momentscapture.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
