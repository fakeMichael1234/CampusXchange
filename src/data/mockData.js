/**
 * CampusXchange Mock Database Layer
 * Verified Indian College Marketplace Data - ZERO emojis.
 */

export const INDIAN_CAMPUSES = [
  "SRM IST Ramapuram, Chennai",
  "IIT Madras, Chennai",
  "Anna University (CEG), Guindy",
  "VIT University, Vellore",
  "Sathyabama Institute, Chennai",
  "Saveetha Engineering College, Chennai",
  "Amrita Vishwa Vidyapeetham, Coimbatore",
  "SSN College of Engineering, Kalavakkam"
];

export const INITIAL_USERS = [
  {
    id: 'usr_1',
    name: 'Ananya Sharma',
    email: 'ananya.s@srmist.edu.in',
    college: 'SRM IST Ramapuram, Chennai',
    course: 'B.Tech Computer Science Engineering',
    year: 'Final Year (2025)',
    verified: true,
    rating: 4.9,
    reviewsCount: 24,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    joinedDate: 'Aug 2023',
    itemsSold: 18,
    bio: 'CS Final Year student interested in AI and Web Dev. Quick handover near SRM Tech Park Lobby or Central Library.'
  },
  {
    id: 'usr_2',
    name: 'Rohan Verma',
    email: 'rohan.v@iitm.ac.in',
    college: 'IIT Madras, Chennai',
    course: 'B.Tech Electrical Engineering',
    year: '3rd Year (2026)',
    verified: true,
    rating: 5.0,
    reviewsCount: 16,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    joinedDate: 'Jan 2024',
    itemsSold: 12,
    bio: 'EE Junior selling lab components, microcontrollers, and engineering textbooks. Pickup available near Gajendra Circle / Central Library.'
  },
  {
    id: 'usr_3',
    name: 'Priya Sundaram',
    email: 'priya.s@annauniv.edu',
    college: 'Anna University (CEG), Guindy',
    course: 'B.Tech Information Technology',
    year: 'Final Year (2025)',
    verified: true,
    rating: 4.8,
    reviewsCount: 11,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    joinedDate: 'Oct 2023',
    itemsSold: 8,
    bio: 'IT Senior clearing dorm items and study materials. Safe handover inside CEG Canteen area.'
  },
  {
    id: 'usr_4',
    name: 'Karthik Subramanian',
    email: 'karthik.s@vit.ac.in',
    college: 'VIT University, Vellore',
    course: 'B.Tech Mechanical Engineering',
    year: '2nd Year (2027)',
    verified: true,
    rating: 4.9,
    reviewsCount: 29,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    joinedDate: 'Aug 2023',
    itemsSold: 25,
    bio: 'MechE student selling bicycles, hostel furniture, and drawing tools. Fast meetups near Technology Tower.'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Grid' },
  { id: 'books', label: 'Books & Textbooks', icon: 'BookOpen' },
  { id: 'electronics', label: 'Electronics & Tech', icon: 'Laptop' },
  { id: 'hostel', label: 'Hostel Essentials', icon: 'Home' },
  { id: 'furniture', label: 'Dorm Furniture', icon: 'Armchair' },
  { id: 'stationery', label: 'Stationery & Tools', icon: 'PenTool' },

  { id: 'fashion', label: 'Apparel & Accessories', icon: 'Shirt' },
  { id: 'academic', label: 'Lab & Engineering Kits', icon: 'Cpu' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    title: 'MacBook Air M2 (8GB RAM / 256GB SSD) Space Gray',
    price: 65000,
    category: 'electronics',
    condition: 'Like New',
    description: 'Apple MacBook Air M2 in pristine condition. Used carefully for 8 months for coding assignments. Battery health 96%, includes original 30W USB-C charger, braided MagSafe cable, and original box.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_1',
    sellerName: 'Ananya Sharma',
    sellerCollege: 'SRM IST Ramapuram, Chennai',
    verifiedSeller: true,
    campus: 'SRM IST Ramapuram, Chennai',
    pickupLocation: 'Tech Park Lobby / Main Canteen',
    postedDate: '2 hours ago',
    createdAt: '2026-09-25T11:00:00Z',
    views: 184,
    likes: 22,
    featured: true,
    status: 'active'
  },
  {
    id: 'prod_2',
    title: 'Higher Engineering Mathematics by B.S. Grewal (44th Ed)',
    price: 850,
    category: 'books',
    condition: 'Good',
    description: 'Essential reference textbook for standard engineering mathematics courses. Clean pages with minimal pencil underlines in calculus chapters. Hardcover edition.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_2',
    sellerName: 'Rohan Verma',
    sellerCollege: 'IIT Madras, Chennai',
    verifiedSeller: true,
    campus: 'IIT Madras, Chennai',
    pickupLocation: 'Central Library Gate / Gajendra Circle',
    postedDate: '4 hours ago',
    createdAt: '2026-09-25T09:00:00Z',
    views: 95,
    likes: 12,
    featured: true,
    status: 'active'
  },
  {
    id: 'prod_3',
    title: 'Dell UltraSharp 27" 4K USB-C Monitor (U2720Q)',
    price: 14500,
    category: 'electronics',
    condition: 'Like New',
    description: '4K IPS color-accurate monitor with 90W USB-C single cable connectivity. Excellent for coding and graphic design. Includes HDMI, DisplayPort, and USB-C cables.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_3',
    sellerName: 'Priya Sundaram',
    sellerCollege: 'Anna University (CEG), Guindy',
    verifiedSeller: true,
    campus: 'Anna University (CEG), Guindy',
    pickupLocation: 'Red Building / CEG Canteen',
    postedDate: '5 hours ago',
    createdAt: '2026-09-25T08:00:00Z',
    views: 140,
    likes: 19,
    featured: true,
    status: 'active'
  },
  {
    id: 'prod_4',
    title: 'Sony WH-1000XM5 Noise Canceling Headphones (Black)',
    price: 12000,
    category: 'electronics',
    condition: 'Like New',
    description: 'Top-tier active noise cancellation headphones for library study sessions. Lightly used for 5 months. Includes original hardshell case, aux cable, and USB-C charging cable.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_4',
    sellerName: 'Karthik Subramanian',
    sellerCollege: 'VIT University, Vellore',
    verifiedSeller: true,
    campus: 'VIT University, Vellore',
    pickupLocation: 'Technology Tower / Food Court',
    postedDate: '1 day ago',
    createdAt: '2026-09-24T18:00:00Z',
    views: 230,
    likes: 34,
    featured: false,
    status: 'active'
  },
  {
    id: 'prod_6',
    title: 'Ergonomic High-Back Mesh Study Chair with Headrest',
    price: 3500,
    category: 'furniture',
    condition: 'Good',
    description: 'Breathable mesh back chair with adjustable lumbar support, 3D armrests, and smooth casters. Essential for long study hours in hostel or PG room.',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_1',
    sellerName: 'Ananya Sharma',
    sellerCollege: 'SRM IST Ramapuram, Chennai',
    verifiedSeller: true,
    campus: 'SRM IST Ramapuram, Chennai',
    pickupLocation: 'Girl Hostel Block B',
    postedDate: '2 days ago',
    createdAt: '2026-09-23T16:00:00Z',
    views: 112,
    likes: 14,
    featured: false,
    status: 'active'
  },
  {
    id: 'prod_7',
    title: 'Casio FX-991EX ClassWiz Non-Programmable Scientific Calculator',
    price: 950,
    category: 'stationery',
    condition: 'Like New',
    description: 'High-resolution ClassWiz scientific calculator approved for university semester exams and GATE testing. Functions perfectly with solar/battery dual power.',
    images: [
      'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48b?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_2',
    sellerName: 'Rohan Verma',
    sellerCollege: 'IIT Madras, Chennai',
    verifiedSeller: true,
    campus: 'IIT Madras, Chennai',
    pickupLocation: 'Department of Electrical Engineering',
    postedDate: '2 days ago',
    createdAt: '2026-09-23T10:00:00Z',
    views: 88,
    likes: 10,
    featured: false,
    status: 'active'
  },
  {
    id: 'prod_8',
    title: 'Arduino Uno Ultimate Starter Kit + Sensor Module Pack',
    price: 2400,
    category: 'academic',
    condition: 'Like New',
    description: 'Complete embedded systems lab kit containing original Arduino Uno R3 board, OLED display, servo motors, ultrasonic sensors, jumper cables, breadboard, and relay modules.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_2',
    sellerName: 'Rohan Verma',
    sellerCollege: 'IIT Madras, Chennai',
    verifiedSeller: true,
    campus: 'IIT Madras, Chennai',
    pickupLocation: 'CFI (Centre for Innovation)',
    postedDate: '3 days ago',
    createdAt: '2026-09-22T15:00:00Z',
    views: 190,
    likes: 28,
    featured: true,
    status: 'active'
  },
  {
    id: 'prod_9',
    title: 'Prestige 1.5 Litre Stainless Steel Electric Kettle',
    price: 800,
    category: 'hostel',
    condition: 'Good',
    description: 'Automatic cut-off stainless steel electric kettle for boiling water, tea, coffee, and instant noodles in hostel room. Works fast and safely.',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'usr_3',
    sellerName: 'Priya Sundaram',
    sellerCollege: 'Anna University (CEG), Guindy',
    verifiedSeller: true,
    campus: 'Anna University (CEG), Guindy',
    pickupLocation: 'Hostel Main Gate',
    postedDate: '3 days ago',
    createdAt: '2026-09-22T11:00:00Z',
    views: 145,
    likes: 18,
    featured: false,
    status: 'active'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord_1001',
    productId: 'prod_2',
    productTitle: 'Higher Engineering Mathematics by B.S. Grewal',
    price: 850,
    sellerName: 'Rohan Verma',
    buyerName: 'Ananya Sharma',
    campus: 'SRM IST Ramapuram, Chennai',
    date: '2026-09-24',
    status: 'Completed',
    transactionId: 'TXN-940281-SRM'
  },
  {
    id: 'ord_1002',
    productId: 'prod_7',
    productTitle: 'Casio FX-991EX Scientific Calculator',
    price: 950,
    sellerName: 'Rohan Verma',
    buyerName: 'Karthik Subramanian',
    campus: 'IIT Madras, Chennai',
    date: '2026-09-23',
    status: 'Confirmed',
    transactionId: 'TXN-884012-IITM'
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'off_1',
    productId: 'prod_1',
    productTitle: 'MacBook Air M2',
    originalPrice: 65000,
    offerPrice: 62000,
    buyerId: 'usr_2',
    buyerName: 'Rohan Verma',
    buyerCollege: 'IIT Madras, Chennai',
    sellerId: 'usr_1',
    sellerName: 'Ananya Sharma',
    status: 'Pending',
    createdAt: '2026-09-25T10:30:00Z'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg_thread_1',
    participant: {
      name: 'Rohan Verma',
      college: 'IIT Madras, Chennai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      online: true
    },
    itemTitle: 'MacBook Air M2',
    lastMessage: 'Sounds good! Can we meet at SRM Tech Park Lobby at 4:30 PM today?',
    timestamp: '10:42 AM',
    unread: false,
    chatHistory: [
      { sender: 'them', text: 'Hi Ananya! Is the MacBook Air M2 still available for inspection on campus today?', time: '10:30 AM' },
      { sender: 'me', text: 'Hello Rohan! Yes it is. Battery health is 96% and screen is scratchless.', time: '10:35 AM' },
      { sender: 'them', text: 'Awesome. Would you accept ₹62,000 for quick handover today?', time: '10:38 AM' },
      { sender: 'me', text: 'I can do ₹63,000 final price. Includes full box and charger.', time: '10:40 AM' },
      { sender: 'them', text: 'Sounds good! Can we meet at SRM Tech Park Lobby at 4:30 PM today?', time: '10:42 AM' }
    ]
  },
  {
    id: 'msg_thread_2',
    participant: {
      name: 'Priya Sundaram',
      college: 'Anna University (CEG), Guindy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      online: false
    },
    itemTitle: 'Dell UltraSharp 27" 4K Monitor',
    lastMessage: 'Is the 90W USB-C charging cable included with the display?',
    timestamp: 'Yesterday',
    unread: true,
    chatHistory: [
      { sender: 'them', text: 'Is the 90W USB-C charging cable included with the display?', time: 'Yesterday' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'message',
    title: 'New message from Rohan Verma',
    description: 'Regarding MacBook Air M2 campus handover details',
    timestamp: '15 min ago',
    read: false
  },
  {
    id: 'notif_2',
    type: 'offer',
    title: 'Offer Received: ₹62,000',
    description: 'Rohan Verma made an offer on your MacBook Air M2 listing.',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif_3',
    type: 'wishlist',
    title: 'Saved Item Update',
    description: 'Dell UltraSharp 27" 4K Monitor price updated.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 'notif_4',
    type: 'verification',
    title: 'Campus Identity Verified',
    description: 'Your @srmist.edu.in student badge has been validated.',
    timestamp: '3 days ago',
    read: true
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep_1',
    productId: 'prod_4',
    productTitle: 'Sony WH-1000XM5 Headphones',
    reportedBy: 'usr_3',
    reason: 'Wrong information',
    details: 'Seller listed as new condition but photos show minor cushion wear.',
    date: '2026-09-24',
    status: 'Pending'
  }
];
