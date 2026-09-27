package com.campusxchange.model;

/**
 * Represents a notification for a user on CampusXchange.
 */
public class Notification {
    private String id;
    private String type; // "message" | "offer" | "wishlist" | "verification"
    private String title;
    private String description;
    private String timestamp;
    private boolean read;

    public Notification() {}

    public Notification(String id, String type, String title, String description,
                        String timestamp, boolean read) {
        this.id = id; this.type = type; this.title = title;
        this.description = description; this.timestamp = timestamp; this.read = read;
    }

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                        { return id; }
    public void setId(String id)               { this.id = id; }
    public String getType()                      { return type; }
    public void setType(String type)           { this.type = type; }
    public String getTitle()                     { return title; }
    public void setTitle(String title)         { this.title = title; }
    public String getDescription()               { return description; }
    public void setDescription(String desc)    { this.description = desc; }
    public String getTimestamp()                 { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    public boolean isRead()                      { return read; }
    public void setRead(boolean read)          { this.read = read; }
}
