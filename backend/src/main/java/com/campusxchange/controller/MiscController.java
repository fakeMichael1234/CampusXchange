package com.campusxchange.controller;

import com.campusxchange.model.Notification;
import com.campusxchange.model.Report;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * Controller for Notifications, Reports (Moderation), and Wishlists.
 */
@RestController
@RequestMapping("/api")
public class MiscController {

    private final DataStore store;

    public MiscController(DataStore store) {
        this.store = store;
    }

    // ── Notifications ────────────────────────────────────────────────────────
    @GetMapping("/notifications")
    public List<Notification> getNotifications() {
        return store.getNotifications();
    }

    @PatchMapping("/notifications/{id}/read")
    public ResponseEntity<?> markNotificationRead(@PathVariable String id) {
        store.getNotifications().stream()
            .filter(n -> n.getId().equals(id))
            .forEach(n -> n.setRead(true));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/notifications/read-all")
    public ResponseEntity<?> markAllNotificationsRead() {
        store.getNotifications().forEach(n -> n.setRead(true));
        return ResponseEntity.ok().build();
    }

    // ── Reports ──────────────────────────────────────────────────────────────
    @GetMapping("/reports")
    public List<Report> getReports() {
        return store.getReports();
    }

    @PostMapping("/reports")
    public ResponseEntity<Report> createReport(@RequestBody Map<String, String> body) {
        Report report = new Report();
        report.setId("rep_" + System.currentTimeMillis());
        report.setProductId(body.get("productId"));
        report.setProductTitle(body.get("productTitle"));
        report.setReportedBy(body.getOrDefault("reportedBy", "Student"));
        report.setReason(body.get("reason"));
        report.setDetails(body.get("details"));
        report.setDate(LocalDate.now().toString());
        report.setStatus("Pending");

        store.getReports().add(0, report);
        return ResponseEntity.ok(report);
    }

    @PatchMapping("/reports/{id}/status")
    public ResponseEntity<?> updateReportStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Report> opt = store.getReports().stream().filter(r -> r.getId().equals(id)).findFirst();
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        opt.get().setStatus(body.get("status"));
        return ResponseEntity.ok(opt.get());
    }

    // ── Wishlist ─────────────────────────────────────────────────────────────
    @GetMapping("/wishlist/{userId}")
    public Set<String> getWishlist(@PathVariable String userId) {
        return store.getWishlistForUser(userId);
    }

    @PostMapping("/wishlist/{userId}/toggle/{productId}")
    public ResponseEntity<Set<String>> toggleWishlist(@PathVariable String userId, @PathVariable String productId) {
        Set<String> wishlist = store.getWishlistForUser(userId);
        if (wishlist.contains(productId)) {
            wishlist.remove(productId);
        } else {
            wishlist.add(productId);
        }
        return ResponseEntity.ok(wishlist);
    }
}
