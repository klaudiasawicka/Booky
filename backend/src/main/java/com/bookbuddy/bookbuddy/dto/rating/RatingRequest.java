package com.bookbuddy.bookbuddy.dto.rating;

import lombok.Data;

@Data
public class RatingRequest {
    private String bookId;
    private int rating;
    private String comment;
}
