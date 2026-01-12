package com.bookbuddy.bookbuddy.service;

import com.bookbuddy.bookbuddy.model.ActivityLog;
import com.bookbuddy.bookbuddy.model.enums.ActionType;
import com.bookbuddy.bookbuddy.repository.ActivityLogRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@Data
@AllArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepository repository;

    public void logActivity(String userId, ActionType actionType, String entityId){
        ActivityLog log = new ActivityLog();
        log.setUserId(userId);
        log.setEntityId(entityId);
        log.setActionType(actionType);
        log.setTimestamp(Instant.now());

        repository.save(log);
    }
}
