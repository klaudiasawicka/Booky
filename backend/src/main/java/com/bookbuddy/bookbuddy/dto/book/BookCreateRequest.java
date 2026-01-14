package com.bookbuddy.bookbuddy.dto.book;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class BookCreateRequest {
    @NotEmpty private String title;
    @NotEmpty private String author;
    private List<String> tags;
}
