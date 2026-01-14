package com.bookbuddy.bookbuddy.exception;

public class InvalidRegisterRequestException extends RuntimeException {
    public InvalidRegisterRequestException(String message) {
        super(message);
    }
}
