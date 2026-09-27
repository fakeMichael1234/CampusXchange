package com.campusxchange.model;

import java.util.List;

/**
 * Represents a product listing on CampusXchange.
 * Mirrors the product objects in mockData.js INITIAL_PRODUCTS.
 */
public class Product {
    private String id;
    private String title;
    private double price;
    private String category;
    private String condition;
    private String description;
    private List<String> images;
    private String sellerId;
    private String sellerName;
    private String sellerCollege;
    private boolean verifiedSeller;
    private String campus;
    private String pickupLocation;
    private String postedDate;
    private String createdAt;
    private int views;
    private int likes;
    private boolean featured;
    private String status; // "active" | "sold"

    public Product() {}

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                          { return id; }
    public void setId(String id)                  { this.id = id; }
    public String getTitle()                       { return title; }
    public void setTitle(String title)            { this.title = title; }
    public double getPrice()                       { return price; }
    public void setPrice(double price)            { this.price = price; }
    public String getCategory()                    { return category; }
    public void setCategory(String category)      { this.category = category; }
    public String getCondition()                   { return condition; }
    public void setCondition(String condition)    { this.condition = condition; }
    public String getDescription()                 { return description; }
    public void setDescription(String desc)       { this.description = desc; }
    public List<String> getImages()                { return images; }
    public void setImages(List<String> images)    { this.images = images; }
    public String getSellerId()                    { return sellerId; }
    public void setSellerId(String sellerId)      { this.sellerId = sellerId; }
    public String getSellerName()                  { return sellerName; }
    public void setSellerName(String name)        { this.sellerName = name; }
    public String getSellerCollege()               { return sellerCollege; }
    public void setSellerCollege(String college)  { this.sellerCollege = college; }
    public boolean isVerifiedSeller()              { return verifiedSeller; }
    public void setVerifiedSeller(boolean v)      { this.verifiedSeller = v; }
    public String getCampus()                      { return campus; }
    public void setCampus(String campus)          { this.campus = campus; }
    public String getPickupLocation()              { return pickupLocation; }
    public void setPickupLocation(String loc)     { this.pickupLocation = loc; }
    public String getPostedDate()                  { return postedDate; }
    public void setPostedDate(String date)        { this.postedDate = date; }
    public String getCreatedAt()                   { return createdAt; }
    public void setCreatedAt(String createdAt)    { this.createdAt = createdAt; }
    public int getViews()                          { return views; }
    public void setViews(int views)               { this.views = views; }
    public int getLikes()                          { return likes; }
    public void setLikes(int likes)               { this.likes = likes; }
    public boolean isFeatured()                    { return featured; }
    public void setFeatured(boolean featured)     { this.featured = featured; }
    public String getStatus()                      { return status; }
    public void setStatus(String status)          { this.status = status; }
}
