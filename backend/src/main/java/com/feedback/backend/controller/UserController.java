package com.feedback.backend.controller;

import com.feedback.backend.dto.UserDTO;
import com.feedback.backend.model.Feedback;
import com.feedback.backend.model.User;
import com.feedback.backend.repository.FeedbackRepository;
import com.feedback.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getName()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Delete associated feedbacks first
        List<Feedback> userFeedbacks = feedbackRepository.findByReceiverOrderByCreatedAtDesc(user);
        feedbackRepository.deleteAll(userFeedbacks);
        
        // Delete the user
        userRepository.deleteById(id);
        
        return ResponseEntity.ok("User deleted successfully");
    }
}
