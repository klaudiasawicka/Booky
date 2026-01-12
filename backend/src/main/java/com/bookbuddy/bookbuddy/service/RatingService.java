package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.rating.RatingRequest;
import com.bookbuddy.bookbuddy.dto.rating.RatingResponse;
import com.bookbuddy.bookbuddy.extension.BookNotFoundException;
import com.bookbuddy.bookbuddy.model.Book;
import com.bookbuddy.bookbuddy.model.Rating;
import com.bookbuddy.bookbuddy.repository.BookRepository;
import com.bookbuddy.bookbuddy.repository.BookRepositoryImpl;
import com.bookbuddy.bookbuddy.repository.RatingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RatingService {

    private final BookRepository bookRepository;
    private final BookRepositoryImpl bookRepositoryCustom;
    private final RatingRepository ratingRepository;
    private final ActivityLogService activityLogService;

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
        }

        rating.setRating(request.getRating());
        rating.setComment(request.getComment());
        rating.setCreatedAt(Instant.now());

        Rating saved = ratingRepository.save(rating);

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

    private void recalculateAverageRating(String bookId) {
        List<Rating> ratings = ratingRepository.findAllByBookId(bookId);

        double avg = ratings.stream()
                .mapToInt(Rating::getRating)
                .average()
                .orElse(0.0);

        bookRepositoryCustom.updateAvgRating(bookId, avg);
    }

    private RatingResponse toRatingResponse(Rating rating){
        RatingResponse dto = new RatingResponse();
        dto.setId(rating.getId());
        dto.setUserId(rating.getUserId());
        dto.setBookId(rating.getBookId());
        dto.setComment(rating.getComment());
        dto.setRating(rating.getRating());
        dto.setCreatedAt(rating.getCreatedAt());

        return dto;
    }
}
