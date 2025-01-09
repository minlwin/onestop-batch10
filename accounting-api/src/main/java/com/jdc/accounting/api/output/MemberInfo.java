package com.jdc.accounting.api.output;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.entity.Account_;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.entity.Member_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record MemberInfo(
		UUID id,
		String name,
		String phone, 
		String email,
		boolean activated,
		LocalDateTime registeredAt,
		LocalDateTime activatedAt) {

	public static void select(CriteriaQuery<MemberInfo> cq, Root<Member> root) {
		cq.multiselect(
			root.get(Member_.id),
			root.get(Member_.account).get(Account_.name),
			root.get(Member_.phone),
			root.get(Member_.account).get(Account_.email),
			root.get(Member_.activated),
			root.get(Member_.registeredAt),
			root.get(Member_.activatedAt)
		);
	}
	
	public static MemberInfo from(Member member) {
		return new MemberInfo(member.getId(), member.getAccount().getName(), member.getPhone(), member.getAccount().getEmail(), member.isActivated(), member.getRegisteredAt(), member.getActivatedAt());
	}
}
