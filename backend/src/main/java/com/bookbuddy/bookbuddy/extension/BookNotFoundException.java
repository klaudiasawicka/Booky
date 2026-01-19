package com.bookbuddy.bookbuddy.extension;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String id){
        super("Book not found with id: " + id);
    }
}
