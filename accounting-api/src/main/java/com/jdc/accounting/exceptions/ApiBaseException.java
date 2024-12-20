package com.jdc.accounting.exceptions;

import java.util.List;

public abstract class ApiBaseException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	private List<String> messages;
	
	public ApiBaseException(String ... messages) {
		this.messages = List.of(messages);
	}

	public List<String> getMessages() {
		return messages;
	}
}
