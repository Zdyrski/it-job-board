package com.mzdyrski.itjobboard.exception;

import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.mail.MessagingException;
import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.*;

@Slf4j
@RestControllerAdvice
public class ExceptionHandling implements ErrorController {

    private static final String ACCOUNT_DISABLED = "";
    private static final String ACCOUNT_LOCKED = "YOUR ACCOUNT HAS BEEN LOCKED DUE TO MANY TRIES TO LOGIN";
    private static final String METHOD_IS_NOT_ALLOWED = "";
    private static final String FILE_SIZE_EXCEEDED = "File size exceeded";
    private static final String INCORRECT_CREDENTIALS = "EMAIL/PASSWORD INCORRECT";
    private static final String REQUEST_NOT_VALID = "REQUEST WITH GIVEN BODY IS NOT VALID";
    private static final String EMAIL_SENDING_ERROR = "THERE WAS AN ERROR WHILE SENDING AN EMAIL";

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
        return createHttpResponse(INTERNAL_SERVER_ERROR, e.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<HttpResponse> noSuchElementException(NoSuchElementException e) {
        return createHttpResponse(BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(OfferNotAvailableException.class)
    public ResponseEntity<HttpResponse> offerNotAvailableException(OfferNotAvailableException e) {
        return createHttpResponse(FORBIDDEN, e.getMessage());
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<HttpResponse> offerNotAvailableException() {
        return createHttpResponse(INTERNAL_SERVER_ERROR, EMAIL_SENDING_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<HttpResponse> methodArgumentNotValidException() {
        return createHttpResponse(BAD_REQUEST, REQUEST_NOT_VALID);
    }

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseEntity<HttpResponse> sizeLimitExceededException() {
        return createHttpResponse(BAD_REQUEST, FILE_SIZE_EXCEEDED);
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
