package com.feedback.backend.dto;

public class FeedbackRequest {
    private String message;
    private Long receiverId;

    public FeedbackRequest() {}

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }
}
