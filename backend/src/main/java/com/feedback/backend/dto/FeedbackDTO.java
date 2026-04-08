package com.feedback.backend.dto;

import java.time.LocalDateTime;

public class FeedbackDTO {
    private Long id;
    private String message;
    private LocalDateTime createdAt;
    private String receiverName;

    public FeedbackDTO() {}

    public FeedbackDTO(Long id, String message, LocalDateTime createdAt, String receiverName) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt;
        this.receiverName = receiverName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getReceiverName() { return receiverName; }
    public void setReceiverName(String receiverName) { this.receiverName = receiverName; }
}
