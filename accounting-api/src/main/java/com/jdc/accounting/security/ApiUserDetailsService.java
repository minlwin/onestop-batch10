package com.jdc.accounting.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jdc.accounting.domain.entity.Account;
import com.jdc.accounting.domain.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiUserDetailsService implements UserDetailsService{
	
	private final AccountRepo accountRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepo.findOneByEmail(username)
				.map(account -> User.builder()
						.username(username)
						.password(account.getPassword())
						.authorities(account.getRole().name())
						.disabled(isDisable(account))
						.build())
				.orElseThrow(() -> new UsernameNotFoundException("Please check your login id."));
	}

	private boolean isDisable(Account account) {
		
		var member = account.getMember();
		
		if(null != member) {
			return !member.isActivated();
		}
		
		return false;
	}

}
