package com.jdc.accounting.api;

import org.springframework.context.ApplicationEventPublisher;
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
import com.jdc.accounting.domain.entity.Account.Role;
import com.jdc.accounting.events.AccessEvent;
import com.jdc.accounting.events.AccessEvent.AccessType;
import com.jdc.accounting.service.MemberSignUpService;
import com.jdc.accounting.service.TokenManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("security")
public class SecurityApi {
	
	private final TokenManagementService tokenService;
	private final MemberSignUpService signUpService;
	private final ApplicationEventPublisher eventPublisher;

	@PostMapping("signin")
	AccountInfo signIn(
			@Validated @RequestBody SignInForm form, BindingResult result) {
		
		var response = tokenService.generate(form);
		if(response.role() == Role.Member) {
			eventPublisher.publishEvent(new AccessEvent(response.email(), AccessType.Generate));
		}
		return response;
	}
	
	@PostMapping("refresh")
	AccountInfo refreshToken(
			@Validated @RequestBody RefreshForm form, BindingResult result) {
		var response = tokenService.refresh(form);
		if(response.role() == Role.Member) {
			eventPublisher.publishEvent(new AccessEvent(response.email(), AccessType.Refresh));
		}
		return response;
	}
	
	@PostMapping("signup")
	SignUpResult signUp(
			@Validated @RequestBody SignUpForm form, BindingResult result) {
		var response = signUpService.signUp(form);
		if(response.role() == Role.Member) {
			eventPublisher.publishEvent(new AccessEvent(response.email(), AccessType.SignUp));
		}
		return response;
	}
}
