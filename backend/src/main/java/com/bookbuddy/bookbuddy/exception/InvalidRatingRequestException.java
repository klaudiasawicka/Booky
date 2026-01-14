package com.bookbuddy.bookbuddy.exception;

public class InvalidRatingRequestException extends RuntimeException {
    public InvalidRatingRequestException(String message) {
        super(message);
    }
}
