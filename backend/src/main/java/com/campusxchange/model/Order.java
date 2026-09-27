package com.campusxchange.model;

/**
 * Represents a marketplace order (confirmed purchase handover).
 */
public class Order {
    private String id;
    private String productId;
    private String productTitle;
    private double price;
    private String sellerName;
    private String buyerName;
    private String campus;
    private String date;
    private String status; // "Confirmed" | "Completed" | "Cancelled"
    private String transactionId;

    public Order() {}

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                         { return id; }
    public void setId(String id)                 { this.id = id; }
    public String getProductId()                  { return productId; }
    public void setProductId(String pid)         { this.productId = pid; }
    public String getProductTitle()               { return productTitle; }
    public void setProductTitle(String title)    { this.productTitle = title; }
    public double getPrice()                      { return price; }
    public void setPrice(double price)           { this.price = price; }
    public String getSellerName()                 { return sellerName; }
    public void setSellerName(String name)       { this.sellerName = name; }
    public String getBuyerName()                  { return buyerName; }
    public void setBuyerName(String name)        { this.buyerName = name; }
    public String getCampus()                     { return campus; }
    public void setCampus(String campus)         { this.campus = campus; }
    public String getDate()                       { return date; }
    public void setDate(String date)             { this.date = date; }
    public String getStatus()                     { return status; }
    public void setStatus(String status)         { this.status = status; }
    public String getTransactionId()              { return transactionId; }
    public void setTransactionId(String txId)    { this.transactionId = txId; }
}
