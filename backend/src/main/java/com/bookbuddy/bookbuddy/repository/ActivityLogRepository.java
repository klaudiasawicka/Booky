package com.bookbuddy.bookbuddy.repository;

import com.bookbuddy.bookbuddy.model.ActivityLog;
import com.bookbuddy.bookbuddy.projection.UserActivityProjection;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findByUserId(String userId);

    @Aggregation(pipeline = {
            "{ $group:  { _id: 'userId', count: { $sum: 1} } }",
            "{ $sort: { count: -1 } }"
    })
    List<UserActivityProjection> findMostActiveUsers();
}
