package com.jdc.accounting.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.api.input.SignInForm;
import com.jdc.accounting.api.input.SignUpForm;
import com.jdc.accounting.api.output.AccountInfo;
import com.jdc.accounting.domain.entity.Account;
import com.jdc.accounting.domain.entity.Account.Role;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberSignUpService {
	
	private final AccountRepo accountRepo;
	private final PasswordEncoder passwordEncoder;
	private final TokenManagementService tokenManagementService;
	
	@Transactional
	public AccountInfo signUp(SignUpForm form) {
		
		var entity = new Account();
		entity.setName(form.name());
		entity.setEmail(form.email());
		entity.setPassword(passwordEncoder.encode(form.password()));
		entity.setRole(Role.Member);
		
		var member = new Member();
		member.setPhone(form.phone());
		member.setRegisteredAt(LocalDateTime.now());
		member.setAccount(entity);
		
		entity.setMember(member);
		
		accountRepo.saveAndFlush(entity);
		
		return tokenManagementService.generate(new SignInForm(form.email(), form.password()));
	}

}
