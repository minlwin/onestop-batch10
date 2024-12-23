package com.jdc.accounting.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.domain.entity.Account;
import com.jdc.accounting.domain.entity.Account.Role;
import com.jdc.accounting.domain.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AdminUserInitializer {

	private final PasswordEncoder passwordEncoder;
	private final AccountRepo accountRepo;
	
	@Transactional
	@EventListener(classes = ContextRefreshedEvent.class)
	public void initialize() {
		
		if(accountRepo.count() == 0) {
			
			var admin = new Account();
			admin.setEmail("admin@gmail.com");
			admin.setName("Admin User");
			admin.setPassword(passwordEncoder.encode("admin"));
			admin.setRole(Role.Admin);
			
			accountRepo.save(admin);
		}
	}
}
