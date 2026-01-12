package com.bookbuddy.bookbuddy.repository;

import com.bookbuddy.bookbuddy.model.Book;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class BookRepositoryImpl implements BookRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    @Override
    public void updateAvgRating(String bookId, double avgRating) {
        Query query = new Query(Criteria.where("_id").is(bookId));

        Update update = new Update()
                .set("avgRating", avgRating);

        mongoTemplate.updateFirst(query, update, Book.class);
    }

    @Override
    public List<Book> recommendBooks(
            List<String> tags,
            List<String> excludedBookIds
    ) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(
                        Criteria.where("tags").in(tags)
                                .and("_id").nin(excludedBookIds)
                ),
                Aggregation.addFields()
                        .addField("score")
                        .withValue(
                                ArithmeticOperators.Add.valueOf("avgRating")
                                        .add(ArithmeticOperators.Multiply
                                                .valueOf("ratingCount")
                                                .multiplyBy(0.1))
                        ).build(),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "score")),
                Aggregation.limit(10)
        );

        return mongoTemplate.aggregate(
                aggregation,
                "books",
                Book.class
        ).getMappedResults();
    }
}
