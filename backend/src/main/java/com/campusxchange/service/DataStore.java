package com.campusxchange.service;

import com.campusxchange.model.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

/**
 * DataStore — Java equivalent of mockData.js + StoreContext state.
 *
 * All data is held in-memory (CopyOnWriteArrayList / ConcurrentHashMap)
 * and seeded with the same initial data that was previously in mockData.js.
 *
 * In a production setup this would be replaced by a real database (JPA + MySQL/PostgreSQL).
 */
@Service
public class DataStore {

    // ── Campus list ───────────────────────────────────────────────────────────
    public static final List<String> INDIAN_CAMPUSES = List.of(
        "SRM IST Ramapuram, Chennai",
        "IIT Madras, Chennai",
        "Anna University (CEG), Guindy",
        "VIT University, Vellore",
        "Sathyabama Institute, Chennai",
        "Saveetha Engineering College, Chennai",
        "Amrita Vishwa Vidyapeetham, Coimbatore",
        "SSN College of Engineering, Kalavakkam"
    );

    // ── Simple deterministic hash (mirrors simpleHash() in StoreContext.jsx) ──
    public static String simpleHash(String str) {
        int h = 0;
        for (char c : str.toCharArray()) {
            h = (31 * h + c);
        }
        return Integer.toHexString(h);
    }

    // ── In-memory collections ─────────────────────────────────────────────────
    private final List<User>          users         = new CopyOnWriteArrayList<>();
    private final List<Product>       products      = new CopyOnWriteArrayList<>();
    private final List<Order>         orders        = new CopyOnWriteArrayList<>();
    private final List<Offer>         offers        = new CopyOnWriteArrayList<>();
    private final List<MessageThread> messages      = new CopyOnWriteArrayList<>();
    private final List<Notification>  notifications = new CopyOnWriteArrayList<>();
    private final List<Report>        reports       = new CopyOnWriteArrayList<>();

    // Wishlist: userId -> Set<productId>
    private final Map<String, Set<String>> wishlists = new ConcurrentHashMap<>();

    // ── Constructor: seed initial data ────────────────────────────────────────
    public DataStore() {
        seedUsers();
        seedProducts();
        seedOrders();
        seedOffers();
        seedMessages();
        seedNotifications();
        seedReports();
        seedWishlists();
    }

    // ===========================================================================
    // SEED METHODS — same data as mockData.js
    // ===========================================================================

    private void seedUsers() {
        String defaultHash = simpleHash("password123");

        users.add(buildUser("usr_1", "Ananya Sharma", "ananya.s@srmist.edu.in",
            "SRM IST Ramapuram, Chennai", "B.Tech Computer Science Engineering",
            "Final Year (2025)", true, 4.9, 24,
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
            "Aug 2023", 18,
            "CS Final Year student interested in AI and Web Dev. Handover at SRM IST Ramapuram, Chennai.",
            defaultHash));

        users.add(buildUser("usr_2", "Rohan Verma", "rohan.v@iitm.ac.in",
            "IIT Madras, Chennai", "B.Tech Electrical Engineering",
            "3rd Year (2026)", true, 5.0, 16,
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
            "Jan 2024", 12,
            "EE Junior selling lab components, microcontrollers, and engineering textbooks. Handover at IIT Madras, Chennai.",
            defaultHash));

        users.add(buildUser("usr_3", "Priya Sundaram", "priya.s@annauniv.edu",
            "Anna University (CEG), Guindy", "B.Tech Information Technology",
            "Final Year (2025)", true, 4.8, 11,
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
            "Oct 2023", 8,
            "IT Senior clearing dorm items and study materials. Handover at Anna University (CEG), Guindy.",
            defaultHash));

        users.add(buildUser("usr_4", "Karthik Subramanian", "karthik.s@vit.ac.in",
            "VIT University, Vellore", "B.Tech Mechanical Engineering",
            "2nd Year (2027)", true, 4.9, 29,
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
            "Aug 2023", 25,
            "MechE student selling bicycles, hostel furniture, and drawing tools. Fast meetups at VIT University, Vellore.",
            defaultHash));
    }

    private User buildUser(String id, String name, String email, String college, String course,
                           String year, boolean verified, double rating, int reviewsCount,
                           String avatar, String joinedDate, int itemsSold, String bio, String hash) {
        User u = new User(id, name, email, college, course, year,
                          verified, rating, reviewsCount, avatar, joinedDate, itemsSold, bio, hash);
        u.setCampus(college);
        return u;
    }

    private void seedProducts() {
        products.add(buildProduct("prod_1",
            "MacBook Air M2 (8GB RAM / 256GB SSD) Space Gray", 65000,
            "electronics", "Like New",
            "Apple MacBook Air M2 in pristine condition. Used carefully for 8 months for coding assignments. " +
            "Battery health 96%, includes original 30W USB-C charger, braided MagSafe cable, and original box.",
            List.of("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"),
            "usr_1", "Ananya Sharma", "SRM IST Ramapuram, Chennai",
            "SRM IST Ramapuram, Chennai", "2 hours ago", "2026-09-25T11:00:00Z",
            184, 22, true));

        products.add(buildProduct("prod_2",
            "Higher Engineering Mathematics by B.S. Grewal (44th Ed)", 850,
            "books", "Good",
            "Essential reference textbook for standard engineering mathematics courses. " +
            "Clean pages with minimal pencil underlines in calculus chapters. Hardcover edition.",
            List.of("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"),
            "usr_2", "Rohan Verma", "IIT Madras, Chennai",
            "IIT Madras, Chennai", "4 hours ago", "2026-09-25T09:00:00Z",
            95, 12, true));

        products.add(buildProduct("prod_3",
            "Dell UltraSharp 27\" 4K USB-C Monitor (U2720Q)", 14500,
            "electronics", "Like New",
            "4K IPS color-accurate monitor with 90W USB-C single cable connectivity. " +
            "Excellent for coding and graphic design. Includes HDMI, DisplayPort, and USB-C cables.",
            List.of("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"),
            "usr_3", "Priya Sundaram", "Anna University (CEG), Guindy",
            "Anna University (CEG), Guindy", "5 hours ago", "2026-09-25T08:00:00Z",
            140, 19, true));

        products.add(buildProduct("prod_4",
            "Sony WH-1000XM5 Noise Canceling Headphones (Black)", 12000,
            "electronics", "Like New",
            "Top-tier active noise cancellation headphones for library study sessions. " +
            "Lightly used for 5 months. Includes original hardshell case, aux cable, and USB-C charging cable.",
            List.of("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"),
            "usr_4", "Karthik Subramanian", "VIT University, Vellore",
            "VIT University, Vellore", "1 day ago", "2026-09-24T18:00:00Z",
            230, 34, false));

        products.add(buildProduct("prod_6",
            "Ergonomic High-Back Mesh Study Chair with Headrest", 3500,
            "furniture", "Good",
            "Breathable mesh back chair with adjustable lumbar support, 3D armrests, and smooth casters. " +
            "Essential for long study hours in hostel or PG room.",
            List.of("https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80"),
            "usr_1", "Ananya Sharma", "SRM IST Ramapuram, Chennai",
            "SRM IST Ramapuram, Chennai", "2 days ago", "2026-09-23T16:00:00Z",
            112, 14, false));

        products.add(buildProduct("prod_7",
            "Casio FX-991EX ClassWiz Non-Programmable Scientific Calculator", 950,
            "stationery", "Like New",
            "High-resolution ClassWiz scientific calculator approved for university semester exams and GATE testing. " +
            "Functions perfectly with solar/battery dual power.",
            List.of("https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48b?auto=format&fit=crop&w=800&q=80"),
            "usr_2", "Rohan Verma", "IIT Madras, Chennai",
            "IIT Madras, Chennai", "2 days ago", "2026-09-23T10:00:00Z",
            88, 10, false));

        products.add(buildProduct("prod_8",
            "Arduino Uno Ultimate Starter Kit + Sensor Module Pack", 2400,
            "academic", "Like New",
            "Complete embedded systems lab kit containing original Arduino Uno R3 board, OLED display, " +
            "servo motors, ultrasonic sensors, jumper cables, breadboard, and relay modules.",
            List.of("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"),
            "usr_2", "Rohan Verma", "IIT Madras, Chennai",
            "IIT Madras, Chennai", "3 days ago", "2026-09-22T15:00:00Z",
            190, 28, true));

        products.add(buildProduct("prod_9",
            "Prestige 1.5 Litre Stainless Steel Electric Kettle", 800,
            "hostel", "Good",
            "Automatic cut-off stainless steel electric kettle for boiling water, tea, coffee, and instant noodles. " +
            "Works fast and safely.",
            List.of("https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=800&q=80"),
            "usr_3", "Priya Sundaram", "Anna University (CEG), Guindy",
            "Anna University (CEG), Guindy", "3 days ago", "2026-09-22T11:00:00Z",
            145, 18, false));
    }

    private Product buildProduct(String id, String title, double price, String category,
                                 String condition, String description, List<String> images,
                                 String sellerId, String sellerName, String campus,
                                 String pickupLocation, String postedDate, String createdAt,
                                 int views, int likes, boolean featured) {
        Product p = new Product();
        p.setId(id); p.setTitle(title); p.setPrice(price); p.setCategory(category);
        p.setCondition(condition); p.setDescription(description); p.setImages(images);
        p.setSellerId(sellerId); p.setSellerName(sellerName); p.setSellerCollege(campus);
        p.setVerifiedSeller(true); p.setCampus(campus); p.setPickupLocation(pickupLocation);
        p.setPostedDate(postedDate); p.setCreatedAt(createdAt);
        p.setViews(views); p.setLikes(likes); p.setFeatured(featured); p.setStatus("active");
        return p;
    }

    private void seedOrders() {
        Order o1 = new Order();
        o1.setId("ord_1001"); o1.setProductId("prod_2");
        o1.setProductTitle("Higher Engineering Mathematics by B.S. Grewal");
        o1.setPrice(850); o1.setSellerName("Rohan Verma"); o1.setBuyerName("Ananya Sharma");
        o1.setCampus("SRM IST Ramapuram, Chennai"); o1.setDate("2026-09-24");
        o1.setStatus("Completed"); o1.setTransactionId("TXN-940281-SRM");
        orders.add(o1);

        Order o2 = new Order();
        o2.setId("ord_1002"); o2.setProductId("prod_7");
        o2.setProductTitle("Casio FX-991EX Scientific Calculator");
        o2.setPrice(950); o2.setSellerName("Rohan Verma"); o2.setBuyerName("Karthik Subramanian");
        o2.setCampus("IIT Madras, Chennai"); o2.setDate("2026-09-23");
        o2.setStatus("Confirmed"); o2.setTransactionId("TXN-884012-IITM");
        orders.add(o2);
    }

    private void seedOffers() {
        Offer off = new Offer();
        off.setId("off_1"); off.setProductId("prod_1"); off.setProductTitle("MacBook Air M2");
        off.setOriginalPrice(65000); off.setOfferPrice(62000);
        off.setBuyerId("usr_2"); off.setBuyerName("Rohan Verma"); off.setBuyerCollege("IIT Madras, Chennai");
        off.setSellerId("usr_1"); off.setSellerName("Ananya Sharma");
        off.setStatus("Pending"); off.setCreatedAt("2026-09-25T10:30:00Z");
        offers.add(off);
    }

    private void seedMessages() {
        MessageThread t1 = new MessageThread();
        t1.setId("msg_thread_1");
        t1.setParticipant(new MessageThread.Participant(
            "Rohan Verma", "IIT Madras, Chennai",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80", true));
        t1.setItemTitle("MacBook Air M2");
        t1.setLastMessage("Sounds good! Can we meet at SRM IST Ramapuram at 4:30 PM today?");
        t1.setTimestamp("10:42 AM"); t1.setUnread(false);
        t1.setChatHistory(List.of(
            new MessageThread.ChatMessage("them", "Hi Ananya! Is the MacBook Air M2 still available for inspection on campus today?", "10:30 AM"),
            new MessageThread.ChatMessage("me",   "Hello Rohan! Yes it is. Battery health is 96% and screen is scratchless.", "10:35 AM"),
            new MessageThread.ChatMessage("them", "Awesome. Would you accept ₹62,000 for quick handover today?", "10:38 AM"),
            new MessageThread.ChatMessage("me",   "I can do ₹63,000 final price. Includes full box and charger.", "10:40 AM"),
            new MessageThread.ChatMessage("them", "Sounds good! Can we meet at SRM IST Ramapuram at 4:30 PM today?", "10:42 AM")
        ));
        messages.add(t1);

        MessageThread t2 = new MessageThread();
        t2.setId("msg_thread_2");
        t2.setParticipant(new MessageThread.Participant(
            "Priya Sundaram", "Anna University (CEG), Guindy",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80", false));
        t2.setItemTitle("Dell UltraSharp 27\" 4K Monitor");
        t2.setLastMessage("Is the 90W USB-C charging cable included with the display?");
        t2.setTimestamp("Yesterday"); t2.setUnread(true);
        t2.setChatHistory(List.of(
            new MessageThread.ChatMessage("them", "Is the 90W USB-C charging cable included with the display?", "Yesterday")
        ));
        messages.add(t2);
    }

    private void seedNotifications() {
        notifications.add(new Notification("notif_1", "message",
            "New message from Rohan Verma",
            "Regarding MacBook Air M2 campus handover details", "15 min ago", false));
        notifications.add(new Notification("notif_2", "offer",
            "Offer Received: ₹62,000",
            "Rohan Verma made an offer on your MacBook Air M2 listing.", "1 hour ago", false));
        notifications.add(new Notification("notif_3", "wishlist",
            "Saved Item Update",
            "Dell UltraSharp 27\" 4K Monitor price updated.", "1 day ago", true));
        notifications.add(new Notification("notif_4", "verification",
            "Campus Identity Verified",
            "Your @srmist.edu.in student badge has been validated.", "3 days ago", true));
    }

    private void seedReports() {
        Report r = new Report();
        r.setId("rep_1"); r.setProductId("prod_4");
        r.setProductTitle("Sony WH-1000XM5 Headphones");
        r.setReportedBy("usr_3"); r.setReason("Wrong information");
        r.setDetails("Seller listed as new condition but photos show minor cushion wear.");
        r.setDate("2026-09-24"); r.setStatus("Pending");
        reports.add(r);
    }

    private void seedWishlists() {
        Set<String> ananyaWishlist = new HashSet<>(Arrays.asList("prod_1", "prod_5"));
        wishlists.put("usr_1", ananyaWishlist);
    }

    // ===========================================================================
    // PUBLIC ACCESSORS — used by service/controller layers
    // ===========================================================================

    public List<User>          getUsers()         { return users; }
    public List<Product>       getProducts()      { return products; }
    public List<Order>         getOrders()        { return orders; }
    public List<Offer>         getOffers()        { return offers; }
    public List<MessageThread> getMessages()      { return messages; }
    public List<Notification>  getNotifications() { return notifications; }
    public List<Report>        getReports()       { return reports; }
    public List<String>        getCampuses()      { return INDIAN_CAMPUSES; }

    public Map<String, Set<String>> getWishlists() { return wishlists; }

    public Set<String> getWishlistForUser(String userId) {
        return wishlists.computeIfAbsent(userId, k -> new HashSet<>());
    }

    public Optional<User> findUserByEmail(String email) {
        return users.stream().filter(u -> u.getEmail().equalsIgnoreCase(email)).findFirst();
    }

    public Optional<User> findUserById(String id) {
        return users.stream().filter(u -> u.getId().equals(id)).findFirst();
    }

    public Optional<Product> findProductById(String id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst();
    }
}
