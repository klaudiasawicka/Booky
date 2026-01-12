package com.bookbuddy.bookbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    private String id;

    private String title;
    private String author;
    private List<String> tags;
    private List<String> subjects;
    private double avgRating = 0.0;
    private int ratingsCount = 0;

    private String createdByUserId;
    private Instant createdAt;
}
