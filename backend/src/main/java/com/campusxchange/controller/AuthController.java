package com.campusxchange.controller;

import com.campusxchange.model.User;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

/**
 * AuthController — handles signup and login.
 * Java equivalent of the signup() and login() functions in StoreContext.jsx.
 *
 * POST /api/auth/signup  — register a new student
 * POST /api/auth/login   — authenticate with email + password
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final DataStore store;

    public AuthController(DataStore store) {
        this.store = store;
    }

    // ── POST /api/auth/signup ─────────────────────────────────────────────────
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String name     = body.getOrDefault("name", "").trim();
        String email    = body.getOrDefault("email", "").toLowerCase().trim();
        String password = body.getOrDefault("password", "");
        String college  = body.getOrDefault("college", DataStore.INDIAN_CAMPUSES.get(0));
        String course   = body.getOrDefault("course", "Undergraduate Student");
        String year     = body.getOrDefault("year", "1st Year");
        String mobile   = body.getOrDefault("mobile", "");
        String dept     = body.getOrDefault("department", "");

        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name, email and password are required."));
        }

        // Duplicate check — mirrors StoreContext signup()
        if (store.findUserByEmail(email).isPresent()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "An account with this email already exists. Please log in."));
        }

        String userId = "usr_" + System.currentTimeMillis();
        User newUser  = new User();
        newUser.setId(userId);
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setMobile(mobile);
        newUser.setCollege(college);
        newUser.setCampus(college);
        newUser.setCourse(course);
        newUser.setDepartment(dept);
        newUser.setYear(year);
        newUser.setVerified(true);
        newUser.setRating(5.0);
        newUser.setReviewsCount(0);
        newUser.setAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80");
        newUser.setJoinedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("MMM yyyy")));
        newUser.setItemsSold(0);
        newUser.setBio("Verified student at " + college + ".");
        newUser.setPasswordHash(DataStore.simpleHash(password));

        store.getUsers().add(newUser);

        // Return profile without password hash
        return ResponseEntity.ok(safeUser(newUser));
    }

    // ── POST /api/auth/login ──────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email    = body.getOrDefault("email", "").toLowerCase().trim();
        String password = body.getOrDefault("password", "");

        Optional<User> accountOpt = store.findUserByEmail(email);
        if (accountOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "No account found with this email. Please register first."));
        }

        User account = accountOpt.get();
        if (!account.getPasswordHash().equals(DataStore.simpleHash(password))) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Incorrect password. Please try again."));
        }

        return ResponseEntity.ok(safeUser(account));
    }

    // ── PATCH /api/auth/profile ───────────────────────────────────────────────
    @PatchMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> fields) {
        String userId = (String) fields.get("id");
        if (userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User id is required."));
        }
        Optional<User> opt = store.findUserById(userId);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = opt.get();
        if (fields.containsKey("name"))       user.setName((String) fields.get("name"));
        if (fields.containsKey("bio"))        user.setBio((String) fields.get("bio"));
        if (fields.containsKey("mobile"))     user.setMobile((String) fields.get("mobile"));
        if (fields.containsKey("college"))    { user.setCollege((String) fields.get("college")); user.setCampus((String) fields.get("college")); }
        if (fields.containsKey("course"))     user.setCourse((String) fields.get("course"));
        if (fields.containsKey("year"))       user.setYear((String) fields.get("year"));
        if (fields.containsKey("avatar"))     user.setAvatar((String) fields.get("avatar"));
        if (fields.containsKey("department")) user.setDepartment((String) fields.get("department"));

        return ResponseEntity.ok(safeUser(user));
    }

    /** Returns a copy of the user without the password hash */
    private Map<String, Object> safeUser(User u) {
        return Map.of(
            "id",           u.getId(),
            "name",         u.getName(),
            "email",        u.getEmail(),
            "mobile",       u.getMobile() != null ? u.getMobile() : "",
            "college",      u.getCollege(),
            "campus",       u.getCampus() != null ? u.getCampus() : u.getCollege(),
            "course",       u.getCourse(),
            "year",         u.getYear(),
            "verified",     u.isVerified(),
            "rating",       u.getRating(),
            "reviewsCount", u.getReviewsCount(),
            "avatar",       u.getAvatar(),
            "joinedDate",   u.getJoinedDate(),
            "itemsSold",    u.getItemsSold(),
            "bio",          u.getBio() != null ? u.getBio() : ""
        );
    }
}
