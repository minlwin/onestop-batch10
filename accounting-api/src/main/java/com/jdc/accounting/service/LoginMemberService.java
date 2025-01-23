package com.jdc.accounting.service;

import static com.jdc.accounting.utils.EntityOperationUtils.safeCall;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.repo.MemberRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginMemberService {
	
	private final MemberRepo memberRepo;
	
	@Transactional(readOnly = true)
	public Member getLoginUser() {
		var username = SecurityContextHolder.getContext().getAuthentication().getName();
		return safeCall(memberRepo.findOneByAccountEmail(username), "Member", username);
	}

}
