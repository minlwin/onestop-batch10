package com.jdc.accounting.exceptions;

public class ApiValidationException extends ApiBusinessException {

	private static final long serialVersionUID = 1L;

	public ApiValidationException(String... messages) {
		super(messages);
	}
}
