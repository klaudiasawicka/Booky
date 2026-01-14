package com.bookbuddy.bookbuddy.controller;

import com.bookbuddy.bookbuddy.dto.book.BookCreateRequest;
import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import com.bookbuddy.bookbuddy.dto.rating.RatingRequest;
import com.bookbuddy.bookbuddy.dto.rating.RatingResponse;
import com.bookbuddy.bookbuddy.exception.InvalidBookRequestException;
import com.bookbuddy.bookbuddy.service.BookService;
import com.bookbuddy.bookbuddy.service.RatingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/books")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;
    private final RatingService ratingService;

    @GetMapping
    public List<BookResponse> getBooks(){
        return bookService.getBooks(null, null, null);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BookResponse> createBook(@RequestPart("book") String request, @RequestPart(value = "cover", required = false) MultipartFile cover, Authentication authentication){
        ObjectMapper mapper = new ObjectMapper();

        BookCreateRequest book;
        try {
            book = mapper.readValue(request, BookCreateRequest.class);
        } catch (Exception e) {
            throw new InvalidBookRequestException("Invalid value of book part");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(bookService.createBook(book, authentication.getName(), cover));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable String bookId){
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @PostMapping("{bookId}/rate")
    public RatingResponse rateBook(@RequestBody RatingRequest request, @PathVariable String bookId, Authentication authentication){
        return ratingService.rateBook(bookId, authentication.getName(), request);
    }

    @DeleteMapping("/{bookId}")
    public String deleteBook(@PathVariable String bookId, Authentication authentication){
        return bookService.deleteBook(bookId, authentication.getName());
    }

    @GetMapping("/{bookId}/ratings")
    public List<RatingResponse> getRatingsForBook(@PathVariable String bookId){
        return ratingService.getRatingsForBook(bookId);
    }

    @GetMapping("/recommendations")
    public List<BookResponse> recommendBooks(Authentication authentication){
        return bookService.recommendBooks(authentication.getName());
    }
}
