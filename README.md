# CampusXchange 🚀

### Your Campus. Your Marketplace.

**CampusXchange** is a student-focused peer-to-peer marketplace designed exclusively for college communities.

Buy, sell, discover, negotiate, and exchange items with verified students around your campus — from textbooks and calculators to laptops, furniture, hostel essentials, and more.

> **A marketplace built around campus communities, not strangers.**

---

## 🌐 What is CampusXchange?

Students frequently have items they no longer need — textbooks after a semester, old calculators, electronics, furniture, hostel essentials, and other useful products.

At the same time, another student nearby may be looking for exactly the same thing.

CampusXchange connects them.

Instead of dealing with random public marketplaces, shipping fees, unknown sellers, and distant listings, students can discover products within their campus community and arrange convenient in-person exchanges.

### The idea is simple:

```text
Verified Student
       ↓
Discover Campus Listings
       ↓
Contact Seller
       ↓
Make an Offer
       ↓
Agree on Price
       ↓
Meet on Campus
       ↓
Inspect the Item
       ↓
Complete the Exchange
```

---

# ✨ Features

## 🛍️ Student Marketplace

Browse products listed by students across different categories.

* 📚 Books & Textbooks
* 💻 Electronics & Technology
* 🪑 Dorm & Hostel Furniture
* 🏠 Hostel Essentials
* ✏️ Stationery & Tools
* 👕 Apparel & Accessories
* 🔬 Lab & Engineering Kits

---

## 🔐 Student Verification

CampusXchange is designed around a verified student community.

Students can create accounts using their details and institutional email, helping establish a trusted campus marketplace.

---

## 👤 Student Profiles

Every student gets a dedicated profile containing information such as:

* Name
* College
* Course
* Year
* Verification status
* Ratings
* Reviews
* Listings
* Buying/selling activity

---

## 📦 Create & Manage Listings

Students can list products with:

* Product name
* Description
* Price
* Category
* Condition
* Images
* Campus
* Pickup location

Sellers can also edit and manage their active listings.

---

## 💬 Student-to-Student Messaging

Buyers can communicate directly with sellers.

Use messaging to:

* Ask questions
* Discuss product condition
* Negotiate prices
* Make arrangements
* Decide a campus meetup location

---

## 💰 Make Offers

Don't want to pay the listed price?

Send an offer to the seller.

```text
Listed Price
     ↓
Buyer Makes Offer
     ↓
Seller Reviews Offer
     ↓
Accept / Reject / Negotiate
```

---

## ❤️ Wishlist

Save interesting products and access them later through your personal wishlist.

---

## 🔔 Notifications

Students can receive notifications for important marketplace activity such as:

* New messages
* Offers
* Listing updates
* Wishlist activity
* Account events

---

## 🧾 Orders & Purchases

Separate dashboards allow students to manage:

### Seller

* Active listings
* Orders
* Offers
* Sales activity

### Buyer

* Purchases
* Wishlist
* Conversations
* Saved products

---

## 🛡️ Reporting System

Users can report suspicious or inappropriate listings.

This provides a foundation for marketplace moderation and safer student-to-student interactions.

---

## 👨‍💼 Admin Panel

Administrators can oversee marketplace activity and manage reported content.

---

# 🎨 UI / UX

CampusXchange uses a modern dark interface designed around a futuristic campus-tech aesthetic.

### Design characteristics

* Dark high-contrast interface
* Responsive design
* Glass / translucent UI elements
* Smooth animations
* Interactive cards
* Technical typography
* 3D visuals
* Particle effects
* Mobile navigation
* Micro-interactions

The landing page includes an interactive **3D network visualization** representing the connections between students and their campus marketplace.

---

# 🧠 Why CampusXchange?

Traditional marketplaces are designed for everyone.

CampusXchange is designed specifically around the student experience.

### Traditional Marketplace

```text
Unknown Seller
      ↓
Long Distance
      ↓
Shipping
      ↓
Delivery Cost
      ↓
Waiting
      ↓
Potential Risk
```

### CampusXchange

```text
Verified Student
      ↓
Same Campus
      ↓
Direct Communication
      ↓
Campus Meetup
      ↓
Inspect Item
      ↓
Exchange
```

The goal is to make student-to-student commerce **local, convenient, and community-oriented**.

---

# 🛠️ Tech Stack

## Frontend

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| React 18          | Frontend framework          |
| Vite              | Development & build tooling |
| Tailwind CSS      | Styling                     |
| Framer Motion     | Animations                  |
| Three.js          | 3D graphics                 |
| React Three Fiber | React-based 3D rendering    |
| React Three Drei  | 3D utilities                |
| Lucide React      | Icons                       |

---

## Backend

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| Java 17           | Backend language              |
| Spring Boot 3.3.4 | Backend framework             |
| Spring Web        | REST APIs                     |
| Spring Validation | Request validation            |
| Maven             | Dependency management & build |

---

# 🏗️ Architecture

```text
                    CampusXchange
                         │
             ┌───────────┴───────────┐
             │                       │
         FRONTEND                 BACKEND
             │                       │
        React + Vite             Spring Boot
             │                       │
       Tailwind CSS             REST APIs
             │                       │
     Framer Motion            Controllers
             │                       │
     Three.js / R3F              Models
             │                       │
       React Context             Services
             │                       │
             └───────────┬───────────┘
                         │
                    Marketplace
```

---

# 📁 Project Structure

```text
CampusXchange/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── campusxchange/
│                       ├── config/
│                       ├── controller/
│                       ├── model/
│                       └── service/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   ├── layout/
│   │   ├── marketplace/
│   │   └── ui/
│   │
│   ├── context/
│   │   ├── StoreContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── AboutPage.jsx
│   │   ├── AdminPanelPage.jsx
│   │   ├── HowItWorksPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MarketplacePage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── SignupPage.jsx
│   │
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

# 🧭 Main Routes

| Route                          | Description          |
| ------------------------------ | -------------------- |
| `/`                            | Landing page         |
| `/login`                       | Student login        |
| `/signup`                      | Student registration |
| `/marketplace`                 | Browse marketplace   |
| `/product/:id`                 | Product details      |
| `/about`                       | About CampusXchange  |
| `/how-it-works`                | Platform workflow    |
| `/admin`                       | Admin panel          |
| `/dashboard`                   | Student dashboard    |
| `/dashboard/listings`          | Manage listings      |
| `/dashboard/listings/create`   | Create listing       |
| `/dashboard/listings/:id/edit` | Edit listing         |
| `/dashboard/orders`            | Seller orders        |
| `/dashboard/purchases`         | Buyer purchases      |
| `/dashboard/wishlist`          | Wishlist             |
| `/dashboard/messages`          | Messages             |
| `/dashboard/profile`           | Student profile      |
| `/dashboard/settings`          | Account settings     |
| `/dashboard/notifications`     | Notifications        |

---

# ⚡ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/fakeMichael1234/CampusXchange.git
```

```bash
cd CampusXchange
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Start the frontend

```bash
npm run dev
```

The Vite development server will start locally.

---

## 4. Build for production

```bash
npm run build
```

---

## 5. Preview production build

```bash
npm run preview
```

---

## 6. Run linting

```bash
npm run lint
```

---

# ☕ Running the Backend

Make sure you have:

* Java 17+
* Maven

Navigate to the backend:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend entry point is:

```text
com.campusxchange.CampusXchangeApplication
```

---

# 🔄 Marketplace Workflow

### For Buyers

```text
Sign Up
   ↓
Verify Student Account
   ↓
Browse Marketplace
   ↓
Search / Filter
   ↓
Open Product
   ↓
Contact Seller
   ↓
Make Offer
   ↓
Agree on Price
   ↓
Meet on Campus
   ↓
Inspect Product
   ↓
Complete Exchange
```

### For Sellers

```text
Sign Up
   ↓
Create Listing
   ↓
Receive Buyer Messages
   ↓
Receive Offers
   ↓
Accept / Negotiate
   ↓
Arrange Campus Meetup
   ↓
Hand Over Product
   ↓
Receive Rating
```

---

# 🔒 Trust & Safety Concept

CampusXchange follows a campus-first trust model.

```text
Institutional Identity
        │
        ▼
Verified Student
        │
        ▼
Campus Community
        │
        ▼
Direct Communication
        │
        ▼
Physical Inspection
        │
        ▼
Campus Exchange
        │
        ▼
Rating & Reputation
```

The platform encourages users to:

* Meet in public campus locations
* Inspect products before exchanging
* Communicate through the platform
* Avoid sharing sensitive personal information
* Report suspicious listings or behavior

---

# 🚀 Future Roadmap

CampusXchange can evolve into a full-scale student commerce platform.

### Authentication

* Institutional email verification
* College domain verification
* OTP authentication
* Google authentication

### Marketplace

* Advanced search
* Location-based discovery
* Price filters
* Category filters
* Product recommendations
* Recently viewed products

### Communication

* Real-time messaging
* WebSocket support
* Read receipts
* Typing indicators
* Image sharing

### Payments

* UPI integration
* Secure online payments
* Payment status tracking
* Digital receipts

### Trust & Security

* AI-powered scam detection
* Suspicious listing detection
* Student reputation scores
* Automated moderation
* Fraud prevention

### Platform

* Multiple campus communities
* Campus-specific feeds
* Android application
* iOS application
* Push notifications
* Marketplace analytics

---

# 📊 Future Vision

CampusXchange can eventually become a **digital marketplace layer for universities**.

```text
                    CAMPUSXCHANGE
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
    Marketplace      Community         Campus
       │                 │                 │
       ▼                 ▼                 ▼
    Buy / Sell       Students         Universities
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                         ▼
                Student Ecosystem
```

The long-term goal is to create a trusted digital ecosystem where students can exchange resources, products, services, and opportunities within their university communities.

---

# 🤝 Contributing

Contributions are welcome!

### Fork the repository

```bash
git fork
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .
git commit -m "feat: add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📌 Current Development Status

CampusXchange is currently an actively developed project.

The frontend contains a complete marketplace-oriented UI and development data layer, while the Spring Boot backend provides the foundation for REST APIs and marketplace domain models.

Production deployment can be extended with persistent database storage, production authentication, cloud image storage, real-time communication, and payment infrastructure.

---

# 👨‍💻 Author

### Michael Sebastian

Computer Science Engineering — Cybersecurity

**GitHub:**
https://github.com/fakeMichael1234

---

# ⭐ Support the Project

If you like the idea behind CampusXchange:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest features
🤝 Contribute

---

<div align="center">

### CampusXchange

**Your Campus. Your Marketplace.**

Built for students.
Built around campus communities.

</div>
