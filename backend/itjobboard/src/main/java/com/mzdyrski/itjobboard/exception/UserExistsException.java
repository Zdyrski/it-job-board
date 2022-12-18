package com.mzdyrski.itjobboard.exception;

public class UserExistsException extends Exception{

    public UserExistsException(String message) {
        super(message);
    }
}
