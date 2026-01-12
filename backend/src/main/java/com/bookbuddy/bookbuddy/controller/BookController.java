package com.bookbuddy.bookbuddy.controller;

import com.bookbuddy.bookbuddy.dto.book.BookCreateRequest;
import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import com.bookbuddy.bookbuddy.dto.rating.RatingRequest;
import com.bookbuddy.bookbuddy.dto.rating.RatingResponse;
import com.bookbuddy.bookbuddy.service.BookService;
import com.bookbuddy.bookbuddy.service.RatingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public BookResponse createBook(@RequestBody BookCreateRequest request, Authentication authentication){
        return bookService.createBook(request, authentication.getName());
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
