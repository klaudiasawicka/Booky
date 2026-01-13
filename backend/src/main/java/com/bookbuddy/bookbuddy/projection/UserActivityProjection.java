package com.bookbuddy.bookbuddy.projection;

public interface UserActivityProjection {
    String getUserId();
    String getAction();
    String getEntityId();
    String getTimestamp();
}
