package com.jdc.accounting.exceptions;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenException extends AuthenticationException {

	public InvalidTokenException() {
		super("Invalid token.");
	}

	private static final long serialVersionUID = 1L;

}
