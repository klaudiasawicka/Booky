package com.bookbuddy.bookbuddy.dto.rating;

import lombok.Data;

import java.time.Instant;

@Data
public class RatingResponse {
    private String id;
    private String bookId;
    private String userId;
    private String comment;
    private int rating;
    private Instant createdAt;
}
