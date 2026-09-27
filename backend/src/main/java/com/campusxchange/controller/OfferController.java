package com.campusxchange.controller;

import com.campusxchange.model.Offer;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * OfferController — manages price offers and negotiations.
 * Java equivalent of makeOffer / respondOffer in StoreContext.jsx.
 */
@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private final DataStore store;

    public OfferController(DataStore store) {
        this.store = store;
    }

    @GetMapping
    public List<Offer> getOffers(
            @RequestParam(required = false) String sellerId,
            @RequestParam(required = false) String buyerId) {
        return store.getOffers().stream()
            .filter(o -> sellerId == null || o.getSellerId().equalsIgnoreCase(sellerId))
            .filter(o -> buyerId == null  || o.getBuyerId().equalsIgnoreCase(buyerId))
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Offer> makeOffer(@RequestBody Map<String, Object> body) {
        Offer offer = new Offer();
        offer.setId("off_" + System.currentTimeMillis());
        offer.setProductId((String) body.get("productId"));
        offer.setProductTitle((String) body.get("productTitle"));
        offer.setOriginalPrice(((Number) body.get("originalPrice")).doubleValue());
        offer.setOfferPrice(((Number) body.get("offerPrice")).doubleValue());
        offer.setBuyerId((String) body.getOrDefault("buyerId", "usr_guest"));
        offer.setBuyerName((String) body.getOrDefault("buyerName", "Student Member"));
        offer.setBuyerCollege((String) body.getOrDefault("buyerCollege", DataStore.INDIAN_CAMPUSES.get(0)));
        offer.setSellerId((String) body.get("sellerId"));
        offer.setSellerName((String) body.get("sellerName"));
        offer.setStatus("Pending");
        offer.setCreatedAt(Instant.now().toString());

        store.getOffers().add(0, offer);
        return ResponseEntity.ok(offer);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> respondOffer(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Offer> opt = store.getOffers().stream().filter(o -> o.getId().equals(id)).findFirst();
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        opt.get().setStatus(body.get("status"));
        return ResponseEntity.ok(opt.get());
    }
}
