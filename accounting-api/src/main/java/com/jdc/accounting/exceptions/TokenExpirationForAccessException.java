package com.jdc.accounting.exceptions;

import org.springframework.security.core.AuthenticationException;

public class TokenExpirationForAccessException extends AuthenticationException{

	public TokenExpirationForAccessException() {
		super("You need to refresh token again.");
	}

	private static final long serialVersionUID = 1L;
}
