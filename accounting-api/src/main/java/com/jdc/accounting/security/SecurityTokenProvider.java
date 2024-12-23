package com.jdc.accounting.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class SecurityTokenProvider {

	public enum Type {
		Access, Refresh
	}

	public String generate(Type access, Authentication authentication) {
		// TODO Auto-generated method stub
		return null;
	}

	public Authentication parse(Type refresh, String refreshToken) {
		// TODO Auto-generated method stub
		return null;
	}
}
