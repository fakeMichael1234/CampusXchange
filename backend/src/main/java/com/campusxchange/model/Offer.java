package com.campusxchange.model;

/**
 * Represents a price offer made by a buyer on a product listing.
 */
public class Offer {
    private String id;
    private String productId;
    private String productTitle;
    private double originalPrice;
    private double offerPrice;
    private String buyerId;
    private String buyerName;
    private String buyerCollege;
    private String sellerId;
    private String sellerName;
    private String status; // "Pending" | "Accepted" | "Rejected"
    private String createdAt;

    public Offer() {}

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                          { return id; }
    public void setId(String id)                  { this.id = id; }
    public String getProductId()                   { return productId; }
    public void setProductId(String pid)          { this.productId = pid; }
    public String getProductTitle()                { return productTitle; }
    public void setProductTitle(String title)     { this.productTitle = title; }
    public double getOriginalPrice()               { return originalPrice; }
    public void setOriginalPrice(double p)        { this.originalPrice = p; }
    public double getOfferPrice()                  { return offerPrice; }
    public void setOfferPrice(double p)           { this.offerPrice = p; }
    public String getBuyerId()                     { return buyerId; }
    public void setBuyerId(String id)             { this.buyerId = id; }
    public String getBuyerName()                   { return buyerName; }
    public void setBuyerName(String name)         { this.buyerName = name; }
    public String getBuyerCollege()                { return buyerCollege; }
    public void setBuyerCollege(String college)   { this.buyerCollege = college; }
    public String getSellerId()                    { return sellerId; }
    public void setSellerId(String id)            { this.sellerId = id; }
    public String getSellerName()                  { return sellerName; }
    public void setSellerName(String name)        { this.sellerName = name; }
    public String getStatus()                      { return status; }
    public void setStatus(String status)          { this.status = status; }
    public String getCreatedAt()                   { return createdAt; }
    public void setCreatedAt(String createdAt)    { this.createdAt = createdAt; }
}
