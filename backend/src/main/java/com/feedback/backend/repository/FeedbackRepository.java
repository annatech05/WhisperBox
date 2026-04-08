package com.feedback.backend.repository;

import com.feedback.backend.model.Feedback;
import com.feedback.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByReceiverOrderByCreatedAtDesc(User receiver);
}
