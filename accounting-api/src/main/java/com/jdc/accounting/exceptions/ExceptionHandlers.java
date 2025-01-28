package com.jdc.accounting.exceptions;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlers {

	@ExceptionHandler({
		ApiValidationException.class,
		ApiBusinessException.class
	})
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	List<String> handle(ApiBaseException e) {
		log.error("Business Exception", e);
		return e.getMessages();
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.GONE)
	List<String> handle(TokenExpirationForAccessException e) {
		return List.of(e.getMessage());
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	List<String> handle(AuthenticationException e) {
		return List.of(switch(e) {
		case UsernameNotFoundException ue -> "Please check your login id.";
		case BadCredentialsException be -> "Please check your password.";
		case DisabledException de -> "You account need to activate by admin.";
		default -> e.getMessage();
		});
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.FORBIDDEN)
	List<String> handle(AccessDeniedException e) {
		return List.of("You have no permission for this operation.");
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
	List<String> handle(Throwable e) {
		
		log.error("Fatal Error", e);
		
		return List.of(e.getMessage());
	}
		
}
