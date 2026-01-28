package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.book.BookCreateRequest;
import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import com.bookbuddy.bookbuddy.exception.AccessDeniedException;
import com.bookbuddy.bookbuddy.exception.BookNotFoundException;
import com.bookbuddy.bookbuddy.exception.InvalidBookRequestException;
import com.bookbuddy.bookbuddy.mapper.BookMapper;
import com.bookbuddy.bookbuddy.model.Book;
import com.bookbuddy.bookbuddy.model.Rating;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.model.enums.ActionType;
import com.bookbuddy.bookbuddy.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final BlobStorageService blobStorageService;

    public BookResponse createBook(BookCreateRequest request, String userEmail, MultipartFile cover){
        if(!validateBookCreateRequest(request)){
            throw new InvalidBookRequestException("Invalid book create body");
        }
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String userId = user.getId();

        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setTags(request.getTags());
        book.setCreatedByUserId(userId);

        book.setCoverUrl(getBookCoverUrl(cover));

        Book saved = bookRepository.save(book);

        activityLogService.logActivity(userId, ActionType.ADD_BOOK, saved.getId());

        return BookMapper.toBookResponse(saved);
    }

    public String getBookCoverUrl(MultipartFile cover){
        String coverUrl;
        if(cover == null || cover.isEmpty()){
            coverUrl = "https://bookbuddystorage.blob.core.windows.net/book-covers/generic_cover.png";
            return coverUrl;
        } else if (!Objects.requireNonNull(cover.getContentType()).startsWith("image/")) {
            throw new InvalidBookRequestException("Only images allowed");
        }

        if (cover.getSize() > 16 * 1024 * 1024) {
            throw new RuntimeException("Image too large");
        }

        coverUrl = blobStorageService.uploadBookCover(cover);

        return coverUrl;
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
                .map(BookMapper::toBookResponse)
                .toList();
    }

    //@Cacheable(value = "books", key = "#id")
    public BookResponse getBookById(String id){
        System.out.println("Cache");
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        return BookMapper.toBookResponse(book);
    }

    //@CacheEvict(value = "books", key = "#bookId")
    public BookResponse updateBook(
            BookCreateRequest request,
            MultipartFile cover,
            String userEmail,
            String bookId
    ) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(!Objects.equals(book.getCreatedByUserId(), user.getId()) && !Objects.equals(user.getRoles(), "ADMIN")){
            System.out.println(user.getId());
            System.out.println(user.getRoles());
            throw new AccessDeniedException("Access denied, not authorized to update book");
        }

        if(request.getTitle() != null && !request.getTitle().isEmpty()){
            book.setTitle(request.getTitle());
        }
        if(request.getAuthor() != null && !request.getAuthor().isEmpty()){
            book.setAuthor(request.getAuthor());
        }
        if(request.getTags() != null){
            book.setTags(request.getTags());
        }
        if(cover != null && !cover.isEmpty()){
            String coverUrl = blobStorageService.uploadBookCover(cover);
            book.setCoverUrl(coverUrl);
        }

        bookRepository.save(book);

        return BookMapper.toBookResponse(book);
    }

    //@CacheEvict(value = "books", key = "#bookId")
    public String deleteBook(String bookId, String email){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(Objects.equals(book.getCreatedByUserId(), user.getId()) || Objects.equals(user.getRoles(), "ADMIN")){
            bookRepository.deleteById(book.getId());
            ratingRepository.deleteAllByBookId(book.getId());

            activityLogService.logActivity(user.getId(), ActionType.DELETE_BOOK, bookId);

            return "Successfully deleted book";
        }
        else {
            throw new AccessDeniedException("Only admin or the user which created this book can delete it");
        }
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

        return bookRepositoryCustom.recommendBooks(preferredTags, likedBookIds).stream().map(BookMapper::toBookResponse).toList();
    }

    private boolean validateBookCreateRequest(BookCreateRequest book){
        if (book.getTitle() == null || book.getTitle().isEmpty()){
            return false;
        }
        else return book.getAuthor() != null && !book.getAuthor().isEmpty();
    }
}
