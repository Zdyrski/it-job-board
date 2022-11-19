package com.mzdyrski.itjobboard.exceptions;

import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Slf4j
@RestControllerAdvice
public class ExceptionHandling implements ErrorController {

    private static final String ACCOUNT_DISABLED = "";
    private static final String ACCOUNT_LOCKED = "YOUR ACCOUNT HAS BEEN LOCKED DUE TO MANY TRIES TO LOGIN";
    private static final String METHOD_IS_NOT_ALLOWED = "";
    private static final String INTERNAL_SERVER_ERROR_MSG = "";
    private static final String INCORRECT_CREDENTIALS = "EMAIL/PASSWORD INCORRECT";
    private static final String NOT_ENOUGH_PERMISSION = "";

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HttpResponse> badCredentialsException() {
        return createHttpResponse(BAD_REQUEST, INCORRECT_CREDENTIALS);
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<HttpResponse> lockedException() {
        return createHttpResponse(UNAUTHORIZED, ACCOUNT_LOCKED);
    }

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<HttpResponse> invalidEmailException(InvalidEmailException e) {
        return createHttpResponse(BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(BadRequestDataException.class)
    public ResponseEntity<HttpResponse> badRequestDataExceptionException(BadRequestDataException e) {
        return createHttpResponse(BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<HttpResponse> userExistsException(UserExistsException e) {
        return createHttpResponse(BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<HttpResponse> tokenExpiredException(TokenExpiredException e) {
        return createHttpResponse(UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<HttpResponse> noSuchElementException(NoSuchElementException e) {
        return createHttpResponse(BAD_REQUEST, e.getMessage());
    }

//    TODO uncomment
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<HttpResponse> internalServerErrorException(Exception e) {
//        return createHttpResponse(INTERNAL_SERVER_ERROR, e.getMessage());
//    }

    private ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message.toUpperCase()), httpStatus);
    }
}
