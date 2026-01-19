package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.dto.book.BookResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatsService {
    private final MongoTemplate mongoTemplate;

    // top 3 rated books
    public List<BookResponse> getTopRatedBooks() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "avgRating")),
                Aggregation.limit(3)
        );

        List<Book> books = mongoTemplate.aggregate(aggregation, "books", Book.class).getMappedResults();

        return books.stream().map(book -> {
            BookResponse response = new BookResponse();
            response.setId(book.getId());
            response.setTitle(book.getTitle());
            response.setAuthor(book.getAuthor());
            response.setTags(book.getTags());
            response.setSubject(book.getSubjects());
            response.setAvgRating(book.getAvgRating());
            response.setRatingsCount(book.getRatingsCount());
            return response;
        }).collect(Collectors.toList());
    }

    // most active users
    public List<Map<String, Object>> getMostActiveUsers() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("userId").count().as("ratingsCount"),
                Aggregation.project("ratingsCount").and("_id").as("userId"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "ratingsCount")),
                Aggregation.limit(5)
        );

        return mongoTemplate.aggregate(aggregation, "ratings", Map.class)
                .getMappedResults();
    }

    // average rating per book
    public List<Map<String, Object>> getAverageRatingPerBook() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("bookId").avg("rating").as("avgRating"),
                Aggregation.project("avgRating").and("_id").as("bookId"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "avgRating"))
        );

        return mongoTemplate.aggregate(aggregation, "ratings", Map.class)
                .getMappedResults();
    }

    // most popular tags
    public List<Map<String, Object>> getMostPopularTags() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("tags"),
                Aggregation.group("tags").count().as("count"),
                Aggregation.project("count").and("_id").as("tag"),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "count"))
        );

        return mongoTemplate.aggregate(aggregation, "books", Map.class)
                .getMappedResults();
    }
}