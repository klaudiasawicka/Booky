package com.bookbuddy.bookbuddy.repository;

import com.bookbuddy.bookbuddy.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findByUserId(String userId);

    Optional<Rating> findByBookIdAndUserId(String bookId, String userId);

    List<Rating> findByUserIdAndRatingGreaterThanEqual(String userId, int ratingIsGreaterThan);

    void deleteAllByBookId(String bookId);

    List<Rating> findAllByBookId(String bookId);

    List<Rating> findAllByUserId(String userId);
}
