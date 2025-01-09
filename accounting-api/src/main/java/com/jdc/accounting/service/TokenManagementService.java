package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.RefreshForm;
import com.jdc.accounting.api.input.SignInForm;
import com.jdc.accounting.api.output.AccountInfo;
import com.jdc.accounting.domain.repo.AccountRepo;
import com.jdc.accounting.security.SecurityTokenProvider;
import com.jdc.accounting.security.SecurityTokenProvider.Type;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenManagementService {
	
	private final AuthenticationManager authenticationManager;
	private final SecurityTokenProvider tokenProvider;
	private final AccountRepo accountRepo;
	
	@Transactional(readOnly = true)
	public AccountInfo generate(SignInForm form) {
		
		// Authenticate
		var authentication = authenticationManager.authenticate(form.authToken());
		
		// Get Account Info
		var account = safeCall(accountRepo.findOneByEmail(form.email()), "Account", form.email());
		
		// Generate Token from Authentication Object
		return AccountInfo.builder()
				.email(form.email())
				.name(account.getName())
				.role(account.getRole())
				.accessToken(tokenProvider.generate(Type.Access, authentication))
				.refreshToken(tokenProvider.generate(Type.Refresh, authentication))
				.build();
	}

	public AccountInfo refresh(RefreshForm form) {
		
		// Authenticate
		var authentication = tokenProvider.parse(Type.Refresh, form.refreshToken());
		
		// Get Account Info
		var account = safeCall(accountRepo.findOneByEmail(authentication.getName()), "Account", authentication.getName());
		
		// Generate Token from Authentication Object
		return AccountInfo.builder()
				.email(authentication.getName())
				.name(account.getName())
				.role(account.getRole())
				.accessToken(tokenProvider.generate(Type.Access, authentication))
				.refreshToken(tokenProvider.generate(Type.Refresh, authentication))
				.build();
	}

}
