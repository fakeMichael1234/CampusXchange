package com.campusxchange.model;

import java.util.List;

/**
 * Represents a chat message thread between two students about a product.
 */
public class MessageThread {
    private String id;
    private Participant participant;
    private String itemTitle;
    private String lastMessage;
    private String timestamp;
    private boolean unread;
    private List<ChatMessage> chatHistory;

    public MessageThread() {}

    public static class Participant {
        private String name;
        private String college;
        private String avatar;
        private boolean online;

        public Participant() {}
        public Participant(String name, String college, String avatar, boolean online) {
            this.name = name; this.college = college; this.avatar = avatar; this.online = online;
        }
        public String getName()             { return name; }
        public void setName(String name)   { this.name = name; }
        public String getCollege()          { return college; }
        public void setCollege(String c)   { this.college = c; }
        public String getAvatar()           { return avatar; }
        public void setAvatar(String a)    { this.avatar = a; }
        public boolean isOnline()           { return online; }
        public void setOnline(boolean o)   { this.online = o; }
    }

    public static class ChatMessage {
        private String sender; // "me" | "them"
        private String text;
        private String time;

        public ChatMessage() {}
        public ChatMessage(String sender, String text, String time) {
            this.sender = sender; this.text = text; this.time = time;
        }
        public String getSender()             { return sender; }
        public void setSender(String sender) { this.sender = sender; }
        public String getText()               { return text; }
        public void setText(String text)     { this.text = text; }
        public String getTime()               { return time; }
        public void setTime(String time)     { this.time = time; }
    }

    // ── Getters & Setters ────────────────────────────────────────────
    public String getId()                                      { return id; }
    public void setId(String id)                              { this.id = id; }
    public Participant getParticipant()                        { return participant; }
    public void setParticipant(Participant participant)        { this.participant = participant; }
    public String getItemTitle()                               { return itemTitle; }
    public void setItemTitle(String itemTitle)                { this.itemTitle = itemTitle; }
    public String getLastMessage()                             { return lastMessage; }
    public void setLastMessage(String lastMessage)            { this.lastMessage = lastMessage; }
    public String getTimestamp()                               { return timestamp; }
    public void setTimestamp(String timestamp)                { this.timestamp = timestamp; }
    public boolean isUnread()                                  { return unread; }
    public void setUnread(boolean unread)                     { this.unread = unread; }
    public List<ChatMessage> getChatHistory()                  { return chatHistory; }
    public void setChatHistory(List<ChatMessage> chatHistory) { this.chatHistory = chatHistory; }
}
