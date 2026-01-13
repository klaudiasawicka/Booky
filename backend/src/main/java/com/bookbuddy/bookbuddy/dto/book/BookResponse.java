package com.bookbuddy.bookbuddy.dto.book;

import io.micrometer.core.instrument.Tags;
import lombok.Data;

import java.util.List;

@Data
public class BookResponse {
    private String Id;

    private String title;

    private String author;

    private List<String> tags;
    private List<String> subject;

    private double avgRating;

    private int ratingsCount;

}
