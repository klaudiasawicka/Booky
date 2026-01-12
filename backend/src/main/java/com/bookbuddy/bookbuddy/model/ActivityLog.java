package com.bookbuddy.bookbuddy.model;


import com.bookbuddy.bookbuddy.model.enums.ActionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "activityLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLog {
    @Id
    private String id;
    private String userId;
    private String entityId;
    private ActionType actionType;
    private Instant timestamp;
}
