package com.campusxchange.controller;

import com.campusxchange.model.Product;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * ProductController — CRUD for marketplace listings.
 * Java equivalent of addProduct / updateProduct / deleteProduct / markProductSold
 * from StoreContext.jsx.
 *
 * GET    /api/products              — list all (filter by campus, category, query)
 * GET    /api/products/{id}         — get single product
 * POST   /api/products              — create listing
 * PATCH  /api/products/{id}         — update listing fields
 * DELETE /api/products/{id}         — remove listing
 * PATCH  /api/products/{id}/sold    — mark as sold
 * GET    /api/campuses              — list of Indian campuses
 */
@RestController
@RequestMapping("/api")
public class ProductController {

    private final DataStore store;

    public ProductController(DataStore store) {
        this.store = store;
    }

    // ── GET /api/campuses ─────────────────────────────────────────────────────
    @GetMapping("/campuses")
    public List<String> getCampuses() {
        return store.getCampuses();
    }

    // ── GET /api/products ─────────────────────────────────────────────────────
    @GetMapping("/products")
    public List<Product> getProducts(
            @RequestParam(required = false) String campus,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String query) {

        return store.getProducts().stream()
            .filter(p -> campus == null || campus.isEmpty() || p.getCampus().equalsIgnoreCase(campus))
            .filter(p -> category == null || category.isEmpty() || category.equals("all") || p.getCategory().equals(category))
            .filter(p -> query == null || query.isEmpty() ||
                         p.getTitle().toLowerCase().contains(query.toLowerCase()) ||
                         p.getDescription().toLowerCase().contains(query.toLowerCase()))
            .collect(Collectors.toList());
    }

    // ── GET /api/products/{id} ────────────────────────────────────────────────
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) {
        return store.findProductById(id)
            .map(p -> { p.setViews(p.getViews() + 1); return ResponseEntity.ok(p); })
            .orElse(ResponseEntity.notFound().build());
    }

    // ── POST /api/products ────────────────────────────────────────────────────
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        product.setId("prod_" + System.currentTimeMillis());
        product.setCreatedAt(Instant.now().toString());
        product.setPostedDate("Just now");
        product.setViews(1);
        product.setLikes(0);
        product.setFeatured(false);
        product.setStatus("active");
        product.setVerifiedSeller(true);
        store.getProducts().add(0, product);
        return ResponseEntity.ok(product);
    }

    // ── PATCH /api/products/{id} ──────────────────────────────────────────────
    @PatchMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Map<String, Object> fields) {
        Optional<Product> opt = store.findProductById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Product p = opt.get();
        if (fields.containsKey("title"))          p.setTitle((String) fields.get("title"));
        if (fields.containsKey("price"))          p.setPrice(((Number) fields.get("price")).doubleValue());
        if (fields.containsKey("description"))    p.setDescription((String) fields.get("description"));
        if (fields.containsKey("condition"))      p.setCondition((String) fields.get("condition"));
        if (fields.containsKey("pickupLocation")) p.setPickupLocation((String) fields.get("pickupLocation"));
        if (fields.containsKey("status"))         p.setStatus((String) fields.get("status"));
        if (fields.containsKey("featured"))       p.setFeatured((Boolean) fields.get("featured"));
        return ResponseEntity.ok(p);
    }

    // ── DELETE /api/products/{id} ─────────────────────────────────────────────
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        store.getProducts().removeIf(p -> p.getId().equals(id));
        return ResponseEntity.noContent().build();
    }

    // ── PATCH /api/products/{id}/sold ─────────────────────────────────────────
    @PatchMapping("/products/{id}/sold")
    public ResponseEntity<?> markSold(@PathVariable String id) {
        Optional<Product> opt = store.findProductById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        opt.get().setStatus("sold");
        return ResponseEntity.ok(opt.get());
    }

    // ── POST /api/products/{id}/like ─────────────────────────────────────────
    @PostMapping("/products/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable String id) {
        Optional<Product> opt = store.findProductById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Product p = opt.get();
        p.setLikes(p.getLikes() + 1);
        return ResponseEntity.ok(Map.of("likes", p.getLikes()));
    }
}
