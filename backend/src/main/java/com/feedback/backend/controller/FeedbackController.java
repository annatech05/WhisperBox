package com.feedback.backend.controller;

import com.feedback.backend.dto.FeedbackDTO;
import com.feedback.backend.dto.FeedbackRequest;
import com.feedback.backend.model.Feedback;
import com.feedback.backend.model.User;
import com.feedback.backend.repository.FeedbackRepository;
import com.feedback.backend.repository.UserRepository;
import com.feedback.backend.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackRequest request) {
        User receiver = userRepository.findById(request.getReceiverId())
                .orElse(null);

        if (receiver == null) {
            return ResponseEntity.badRequest().body("Receiver not found");
        }

        Feedback feedback = new Feedback(request.getMessage(), receiver);
        feedbackRepository.save(feedback);

        return ResponseEntity.ok("Feedback submitted anonymously");
    }

    @GetMapping("/my")
    public ResponseEntity<List<FeedbackDTO>> getMyFeedback(@AuthenticationPrincipal CustomUserDetails userDetails) {
        User receiver = userDetails.getUser();
        List<Feedback> feedbacks = feedbackRepository.findByReceiverOrderByCreatedAtDesc(receiver);

        List<FeedbackDTO> response = feedbacks.stream()
                .map(f -> new FeedbackDTO(f.getId(), f.getMessage(), f.getCreatedAt(), f.getReceiver().getName()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        List<FeedbackDTO> response = feedbacks.stream()
                .map(f -> new FeedbackDTO(f.getId(), f.getMessage(), f.getCreatedAt(), f.getReceiver().getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        if (!feedbackRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        feedbackRepository.deleteById(id);
        return ResponseEntity.ok("Feedback deleted successfully");
    }
}
