package com.campusxchange.controller;

import com.campusxchange.model.Order;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * OrderController — manages campus handover orders.
 * Java equivalent of createOrder / updateOrderStatus from StoreContext.jsx.
 *
 * GET   /api/orders              — list orders (filter by buyerName or sellerName)
 * POST  /api/orders              — create a new order
 * PATCH /api/orders/{id}/status  — update order status
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final DataStore store;

    public OrderController(DataStore store) {
        this.store = store;
    }

    @GetMapping
    public List<Order> getOrders(
            @RequestParam(required = false) String buyer,
            @RequestParam(required = false) String seller) {
        return store.getOrders().stream()
            .filter(o -> buyer == null  || o.getBuyerName().equalsIgnoreCase(buyer))
            .filter(o -> seller == null || o.getSellerName().equalsIgnoreCase(seller))
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Map<String, Object> body) {
        Order o = new Order();
        o.setId("ord_" + System.currentTimeMillis());
        o.setProductId((String) body.get("productId"));
        o.setProductTitle((String) body.get("productTitle"));
        o.setPrice(((Number) body.get("price")).doubleValue());
        o.setSellerName((String) body.get("sellerName"));
        o.setBuyerName((String) body.getOrDefault("buyerName", "Student Member"));
        o.setCampus((String) body.get("campus"));
        o.setDate(LocalDate.now().toString());
        o.setStatus("Confirmed");
        o.setTransactionId("TXN-" + (100000 + (int)(Math.random() * 900000)) + "-CX");
        store.getOrders().add(0, o);
        return ResponseEntity.ok(o);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Optional<Order> opt = store.getOrders().stream().filter(o -> o.getId().equals(id)).findFirst();
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        opt.get().setStatus(body.get("status"));
        return ResponseEntity.ok(opt.get());
    }
}
