package com.jdc.accounting.api;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.SignInForm;
import com.jdc.accounting.api.input.SignUpForm;
import com.jdc.accounting.api.output.AccountInfo;

@RestController
@RequestMapping("security")
public class SecurityApi {

	@PostMapping("signin")
	AccountInfo signIn(
			@Validated @RequestBody SignInForm form, BindingResult result) {
		
		
		return null;
	}
	
	@PostMapping("signup")
	AccountInfo signUp(
			@Validated @RequestBody SignUpForm form, BindingResult result) {

		return null;
	}
}
