package com.jdc.accounting.api.input;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import jakarta.validation.constraints.NotBlank;

public record SignInForm(
		@NotBlank(message = "Please enter email.")
		String email,
		@NotBlank(message = "Please enter password.")
		String password
		) {

	public Authentication authToken() {
		return UsernamePasswordAuthenticationToken.unauthenticated(email, password);
	}
	
}
