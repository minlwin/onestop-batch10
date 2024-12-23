package com.jdc.accounting.api.input;

import jakarta.validation.constraints.NotBlank;

public record SignUpForm(
		@NotBlank(message = "Please enter member name.")
		String name,
		@NotBlank(message = "Please enter phone number.")
		String phone,
		@NotBlank(message = "Please enter email address.")
		String email,
		@NotBlank(message = "Please enter password.")
		String password) {

}
