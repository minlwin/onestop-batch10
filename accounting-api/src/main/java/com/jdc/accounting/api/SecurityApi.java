package com.jdc.accounting.api;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.accounting.api.input.RefreshForm;
import com.jdc.accounting.api.input.SignInForm;
import com.jdc.accounting.api.input.SignUpForm;
import com.jdc.accounting.api.output.AccountInfo;
import com.jdc.accounting.api.output.SignUpResult;
import com.jdc.accounting.service.MemberSignUpService;
import com.jdc.accounting.service.TokenManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("security")
public class SecurityApi {
	
	private final TokenManagementService tokenService;
	private final MemberSignUpService signUpService;

	@PostMapping("signin")
	AccountInfo signIn(
			@Validated @RequestBody SignInForm form, BindingResult result) {
		return tokenService.generate(form);
	}
	
	@PostMapping("refresh")
	AccountInfo refreshToken(
			@Validated @RequestBody RefreshForm form, BindingResult result) {
		return tokenService.refresh(form);
	}
	
	@PostMapping("signup")
	SignUpResult signUp(
			@Validated @RequestBody SignUpForm form, BindingResult result) {
		return signUpService.signUp(form);
	}
}
