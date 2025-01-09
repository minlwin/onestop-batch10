package com.jdc.accounting.api.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.accounting.domain.entity.Account_;
import com.jdc.accounting.domain.entity.Member;
import com.jdc.accounting.domain.entity.Member_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record MemberSearch(
		Boolean activated, 
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Member> root) {
		var params = new ArrayList<Predicate>();
		
		if(null != activated) {
			params.add(cb.equal(root.get(Member_.activated), activated));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(root.get(Member_.phone)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Member_.account).get(Account_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Member_.account).get(Account_.email)), keyword.toLowerCase().concat("%"))
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}
}
