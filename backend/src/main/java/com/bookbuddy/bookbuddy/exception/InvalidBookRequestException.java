package com.bookbuddy.bookbuddy.exception;

public class InvalidBookRequestException extends RuntimeException {
    public InvalidBookRequestException(String message) {
        super(message);
    }
}
