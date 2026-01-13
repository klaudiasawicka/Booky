package com.bookbuddy.bookbuddy.repository;

import com.bookbuddy.bookbuddy.model.Book;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByAuthor(String author);

    @Query()
    List<Book> findByTagsIn(Collection<String> tags);

    List<Book> findBySubjectsContaining(String subject);

    List<Book> findByAvgRatingGreaterThan(double rating);
}
