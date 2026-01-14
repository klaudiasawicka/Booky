package com.bookbuddy.bookbuddy.controller;

import com.bookbuddy.bookbuddy.dto.book.BookCreateRequest;
import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import com.bookbuddy.bookbuddy.dto.error.ErrorResponse;
import com.bookbuddy.bookbuddy.dto.rating.RatingRequest;
import com.bookbuddy.bookbuddy.dto.rating.RatingResponse;
import com.bookbuddy.bookbuddy.exception.InvalidBookRequestException;
import com.bookbuddy.bookbuddy.service.BookService;
import com.bookbuddy.bookbuddy.service.RatingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Get all books")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Books fetched successfully",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema( implementation = BookResponse.class))
                            )
                    }
            )
    })
    @GetMapping
    public List<BookResponse> getBooks(){
        return bookService.getBooks(null, null, null);
    }

    @Operation(summary = "Create a new book")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Book created successfully",
            content = { @Content(mediaType = "application/json",
            schema = @Schema(implementation = BookResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid book request",
            content = {
                    @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            })
    })
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

    @Operation(summary = "Get a book by its id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Book fetched successfully",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = BookResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Book not found",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid id",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            )
    })
    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable String bookId){
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @Operation(summary = "Rate a book with provided id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Rating created successfully",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = RatingResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Book not found",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid id",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            )
    })
    @PostMapping("{bookId}/rate")
    public RatingResponse rateBook(@RequestBody RatingRequest request, @PathVariable String bookId, Authentication authentication){
        return ratingService.rateBook(bookId, authentication.getName(), request);
    }

    @Operation(summary = "Delete book by its id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Book deleted successfully",
                    content = {
                            @Content(
                                    mediaType = "text/plain",
                                    schema = @Schema(implementation = String.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid id",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Access denied",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Book not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
    @DeleteMapping("/{bookId}")
    public String deleteBook(@PathVariable String bookId, Authentication authentication){
        return bookService.deleteBook(bookId, authentication.getName());
    }


    @Operation(summary = "Get ratings for book id")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Ratings fetched successfully",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = RatingResponse.class))
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid id",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Access denied",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Book not found",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    }
            )
    })
    @GetMapping("/{bookId}/ratings")
    public List<RatingResponse> getRatingsForBook(@PathVariable String bookId){
        return ratingService.getRatingsForBook(bookId);
    }

    @Operation(summary = "Get recommendations for currently logged in user")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Recommendations fetched successfully",
                    content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = BookResponse.class))
                            )
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Access denied",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
    @GetMapping("/recommendations")
    public List<BookResponse> recommendBooks(Authentication authentication){
        return bookService.recommendBooks(authentication.getName());
    }
}
