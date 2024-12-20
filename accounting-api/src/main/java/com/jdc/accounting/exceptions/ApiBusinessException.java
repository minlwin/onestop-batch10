package com.jdc.accounting.exceptions;

public class ApiBusinessException extends ApiBaseException{

	private static final long serialVersionUID = 1L;
	
	public ApiBusinessException(String ... messages) {
		super(messages);
	}

}
