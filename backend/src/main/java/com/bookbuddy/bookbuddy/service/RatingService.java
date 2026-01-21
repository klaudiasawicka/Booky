package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.rating.RatingRequest;
import com.bookbuddy.bookbuddy.dto.rating.RatingResponse;
import com.bookbuddy.bookbuddy.exception.AccessDeniedException;
import com.bookbuddy.bookbuddy.exception.BookNotFoundException;
import com.bookbuddy.bookbuddy.exception.RatingNotFoundException;
import com.bookbuddy.bookbuddy.model.Book;
import com.bookbuddy.bookbuddy.model.Rating;
import com.bookbuddy.bookbuddy.model.User;
import com.bookbuddy.bookbuddy.model.enums.ActionType;
import com.bookbuddy.bookbuddy.repository.BookRepository;
import com.bookbuddy.bookbuddy.repository.BookRepositoryImpl;
import com.bookbuddy.bookbuddy.repository.RatingRepository;
import com.bookbuddy.bookbuddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RatingService {

    private final BookRepository bookRepository;
    private final BookRepositoryImpl bookRepositoryCustom;
    private final RatingRepository ratingRepository;
    private final ActivityLogService activityLogService;
    private final UserRepository userRepository;

    public RatingResponse rateBook(
        String bookId,
        String userId,
        RatingRequest request
    ){
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new BookNotFoundException(request.getBookId()));

        Optional<Rating> existingRating = ratingRepository.findByBookIdAndUserId(bookId, userId);

        Rating rating;

        if (existingRating.isPresent()){
            rating = existingRating.get();
        }else {
            rating = new Rating();
            rating.setBookId(bookId);
            rating.setUserId(userId);
            updateRatingsCount(bookId, book.getRatingsCount() + 1);
        }

        rating.setRating(request.getRating());
        rating.setComment(request.getComment());
        rating.setUpdatedAt(Instant.now());

        Rating saved = ratingRepository.save(rating);


        activityLogService.logActivity(userId, ActionType.RATE_BOOK, bookId);

        recalculateAverageRating(bookId);

        return toRatingResponse(saved);
    }

    public List<RatingResponse> getRatingsForBook(String bookId) {
        List<Rating> ratings = ratingRepository.findAllByBookId(bookId);
        return ratings
                .stream()
                .map(this::toRatingResponse)
                .toList();
    }

    private void updateRatingsCount(String bookId, int count) {
        bookRepositoryCustom.updateRatingsCount(bookId, count);
    }

    private void recalculateAverageRating(String bookId) {
        List<Rating> ratings = ratingRepository.findAllByBookId(bookId);

        double avg = ratings.stream()
                .mapToInt(Rating::getRating)
                .average()
                .orElse(0.0);

        bookRepositoryCustom.updateAvgRating(bookId, avg);
    }

    public String deleteRating(String id, String email){
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new RatingNotFoundException(id));

        User user = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        Book book = bookRepository.findById(rating.getBookId())
                .orElseThrow(() -> new BookNotFoundException(rating.getBookId()));

        if (Objects.equals(rating.getUserId(), user.getId()) || Objects.equals(user.getRoles(), "ADMIN")){
            ratingRepository.delete(rating);
            updateRatingsCount(book.getId(), book.getRatingsCount() - 1);
        } else{
            throw new AccessDeniedException("You are not allowed to delete this rating");
        }
         return "Successfully deleted rating";
    }

    private RatingResponse toRatingResponse(Rating rating){
        RatingResponse dto = new RatingResponse();
        dto.setId(rating.getId());
        dto.setUserId(rating.getUserId());
        dto.setBookId(rating.getBookId());
        dto.setComment(rating.getComment());
        dto.setRating(rating.getRating());
        dto.setCreatedAt(rating.getUpdatedAt());

        return dto;
    }
}
