package com.campusxchange.controller;

import com.campusxchange.model.MessageThread;
import com.campusxchange.service.DataStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * MessageController — manages student chat threads.
 * Java equivalent of sendMessage / startChatWithSeller in StoreContext.jsx.
 */
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final DataStore store;

    public MessageController(DataStore store) {
        this.store = store;
    }

    @GetMapping
    public List<MessageThread> getMessages() {
        return store.getMessages();
    }

    @PostMapping("/thread")
    public ResponseEntity<MessageThread> startThread(@RequestBody Map<String, Object> body) {
        Map<?, ?> participantMap = (Map<?, ?>) body.get("participant");
        String name = (String) participantMap.get("name");
        String itemTitle = (String) body.get("itemTitle");
        String initialText = (String) body.get("initialText");

        // Check existing thread
        Optional<MessageThread> existing = store.getMessages().stream()
            .filter(m -> m.getParticipant().getName().equals(name) && m.getItemTitle().equals(itemTitle))
            .findFirst();

        if (existing.isPresent()) {
            MessageThread t = existing.get();
            if (initialText != null && !initialText.isBlank()) {
                appendMessage(t, "me", initialText);
            }
            return ResponseEntity.ok(t);
        }

        String nowStr = LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a"));
        String firstText = (initialText != null && !initialText.isBlank()) ? initialText : "Hi " + name + ", is \"" + itemTitle + "\" still available on campus?";

        MessageThread thread = new MessageThread();
        thread.setId("msg_thread_" + System.currentTimeMillis());
        thread.setParticipant(new MessageThread.Participant(
            name,
            (String) participantMap.getOrDefault("college", DataStore.INDIAN_CAMPUSES.get(0)),
            (String) participantMap.getOrDefault("avatar", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"),
            true
        ));
        thread.setItemTitle(itemTitle);
        thread.setLastMessage(firstText);
        thread.setTimestamp("Just now");
        thread.setUnread(false);

        List<MessageThread.ChatMessage> history = new ArrayList<>();
        history.add(new MessageThread.ChatMessage("me", firstText, nowStr));
        thread.setChatHistory(history);

        store.getMessages().add(0, thread);
        return ResponseEntity.ok(thread);
    }

    @PostMapping("/thread/{threadId}")
    public ResponseEntity<?> sendMessage(@PathVariable String threadId, @RequestBody Map<String, String> body) {
        Optional<MessageThread> opt = store.getMessages().stream().filter(m -> m.getId().equals(threadId)).findFirst();
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        MessageThread thread = opt.get();
        String text = body.get("text");
        appendMessage(thread, "me", text);
        return ResponseEntity.ok(thread);
    }

    private void appendMessage(MessageThread thread, String sender, String text) {
        String timeStr = LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm a"));
        thread.setLastMessage(text);
        thread.setTimestamp(timeStr);
        List<MessageThread.ChatMessage> history = new ArrayList<>(thread.getChatHistory());
        history.add(new MessageThread.ChatMessage(sender, text, timeStr));
        thread.setChatHistory(history);
    }
}
