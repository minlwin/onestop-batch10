package com.jdc.accounting.exceptions;

import org.springframework.security.core.AuthenticationException;

public class TokenExpirationForRefreshException extends AuthenticationException{

	public TokenExpirationForRefreshException() {
		super("Your session has been expired. Please login again.");
	}

	private static final long serialVersionUID = 1L;

}
