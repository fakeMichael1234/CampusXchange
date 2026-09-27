package com.campusxchange.model;

/**
 * Represents a moderation report filed against a product listing.
 */
public class Report {
    private String id;
    private String productId;
    private String productTitle;
    private String reportedBy;
    private String reason;
    private String details;
    private String date;
    private String status; // "Pending" | "Resolved" | "Dismissed"

    public Report() {}

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                         { return id; }
    public void setId(String id)                 { this.id = id; }
    public String getProductId()                  { return productId; }
    public void setProductId(String pid)         { this.productId = pid; }
    public String getProductTitle()               { return productTitle; }
    public void setProductTitle(String title)    { this.productTitle = title; }
    public String getReportedBy()                 { return reportedBy; }
    public void setReportedBy(String reporter)   { this.reportedBy = reporter; }
    public String getReason()                     { return reason; }
    public void setReason(String reason)         { this.reason = reason; }
    public String getDetails()                    { return details; }
    public void setDetails(String details)       { this.details = details; }
    public String getDate()                       { return date; }
    public void setDate(String date)             { this.date = date; }
    public String getStatus()                     { return status; }
    public void setStatus(String status)         { this.status = status; }
}
