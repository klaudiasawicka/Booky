package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.book.BookCreateRequest;
import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import com.bookbuddy.bookbuddy.extension.BookNotFoundException;
import com.bookbuddy.bookbuddy.model.Book;
import com.bookbuddy.bookbuddy.model.Rating;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.model.enums.ActionType;
import com.bookbuddy.bookbuddy.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;
    private final BookRepositoryImpl bookRepositoryCustom;


    public BookResponse createBook(BookCreateRequest request, String userId){
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setTags(request.getTags());
        book.setSubjects(request.getSubjects());
        book.setCreatedByUserId(userId);

        Book saved = bookRepository.save(book);

        activityLogService.logActivity(userId, ActionType.ADD_BOOK, saved.getId());

        return toBookResponse(saved);
    }

    public List<BookResponse> getBooks(
        List<String> tags,
        String author,
        Double minRating
    ){
        List<Book> books;

        if (tags != null && !tags.isEmpty()) {
            books = bookRepository.findByTagsIn(tags);
        } else if (author != null) {
            books = bookRepository.findByAuthor(author);
        } else {
            books = bookRepository.findAll();
        }

        return books.stream()
                .filter(b -> minRating == null || b.getAvgRating() >= minRating)
                .map(this::toBookResponse)
                .toList();
    }

    public BookResponse getBookById(String Id){
        Book book = bookRepository.findById(Id)
                .orElseThrow(() -> new BookNotFoundException(Id));

        return toBookResponse(book);
    }

    public String deleteBook(String bookId, String email){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(Objects.equals(book.getCreatedByUserId(), user.getId()) || Objects.equals(user.getRoles(), "ROLES_ADMIN")){
            bookRepository.deleteById(book.getId());
            ratingRepository.deleteAllByBookId(book.getId());

            activityLogService.logActivity(user.getId(), ActionType.DELETE_BOOK, bookId);

            return "Successfully deleted book";
        }


        return "Not authorized";
    }

    public List<BookResponse> recommendBooks(String userId){
        userRepository.findByEmail(userId).orElseThrow(() -> new UsernameNotFoundException("Not found"));

        List<Rating> ratings = ratingRepository.findAllByUserId(userId);
        List<String> likedBookIds = ratings.stream()
                .filter(rating -> rating.getRating() >= 4)
                .map(Rating::getBookId)
                .toList();

        List<String> preferredTags = bookRepository.findAllById(likedBookIds)
                .stream()
                .flatMap(b -> b.getTags().stream())
                .distinct()
                .toList();

        return bookRepositoryCustom.recommendBooks(preferredTags, likedBookIds).stream().map(this::toBookResponse).toList();
    }

    private BookResponse toBookResponse(Book book) {
        BookResponse dto = new BookResponse();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setTags(book.getTags());
        dto.setSubject(book.getSubjects());
        dto.setAvgRating(book.getAvgRating());
        dto.setRatingsCount(book.getRatingsCount());
        return dto;
    }
}
