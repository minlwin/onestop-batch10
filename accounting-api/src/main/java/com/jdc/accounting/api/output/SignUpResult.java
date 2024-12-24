package com.jdc.accounting.api.output;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.entity.Account;
import com.jdc.accounting.domain.entity.Account.Role;

public record SignUpResult(
		UUID id,
		String name,
		String email,
		Role role, 
		LocalDateTime createdAt) {

	public static SignUpResult from(Account entity) {
		return new SignUpResult(entity.getId(), entity.getName(), entity.getEmail(), entity.getRole(), entity.getMember().getRegisteredAt());
	}
}
