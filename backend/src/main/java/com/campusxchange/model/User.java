package com.campusxchange.model;

import java.util.List;

/**
 * Represents a registered student user on CampusXchange.
 */
public class User {
    private String id;
    private String name;
    private String email;
    private String mobile;
    private String college;
    private String campus;
    private String course;
    private String department;
    private String year;
    private boolean verified;
    private double rating;
    private int reviewsCount;
    private String avatar;
    private String joinedDate;
    private int itemsSold;
    private String bio;

    // Internal auth field — never sent to frontend
    private String passwordHash;

    public User() {}

    public User(String id, String name, String email, String college, String course,
                String year, boolean verified, double rating, int reviewsCount,
                String avatar, String joinedDate, int itemsSold, String bio, String passwordHash) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.college = college;
        this.campus = college;
        this.course = course;
        this.year = year;
        this.verified = verified;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.avatar = avatar;
        this.joinedDate = joinedDate;
        this.itemsSold = itemsSold;
        this.bio = bio;
        this.passwordHash = passwordHash;
    }

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                       { return id; }
    public void setId(String id)               { this.id = id; }
    public String getName()                     { return name; }
    public void setName(String name)           { this.name = name; }
    public String getEmail()                    { return email; }
    public void setEmail(String email)         { this.email = email; }
    public String getMobile()                   { return mobile; }
    public void setMobile(String mobile)       { this.mobile = mobile; }
    public String getCollege()                  { return college; }
    public void setCollege(String college)     { this.college = college; }
    public String getCampus()                   { return campus; }
    public void setCampus(String campus)       { this.campus = campus; }
    public String getCourse()                   { return course; }
    public void setCourse(String course)       { this.course = course; }
    public String getDepartment()               { return department; }
    public void setDepartment(String dept)     { this.department = dept; }
    public String getYear()                     { return year; }
    public void setYear(String year)           { this.year = year; }
    public boolean isVerified()                 { return verified; }
    public void setVerified(boolean verified)  { this.verified = verified; }
    public double getRating()                   { return rating; }
    public void setRating(double rating)       { this.rating = rating; }
    public int getReviewsCount()                { return reviewsCount; }
    public void setReviewsCount(int c)         { this.reviewsCount = c; }
    public String getAvatar()                   { return avatar; }
    public void setAvatar(String avatar)       { this.avatar = avatar; }
    public String getJoinedDate()               { return joinedDate; }
    public void setJoinedDate(String d)        { this.joinedDate = d; }
    public int getItemsSold()                   { return itemsSold; }
    public void setItemsSold(int n)            { this.itemsSold = n; }
    public String getBio()                      { return bio; }
    public void setBio(String bio)             { this.bio = bio; }
    public String getPasswordHash()             { return passwordHash; }
    public void setPasswordHash(String h)      { this.passwordHash = h; }
}
