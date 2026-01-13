package com.bookbuddy.bookbuddy.dto.book;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class BookCreateRequest {
    private String title;
    private String author;
    private List<String> tags;
    private List<String> subjects;
}
