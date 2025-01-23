package com.jdc.accounting.api.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;

import com.jdc.accounting.domain.entity.MemberAccessHistory;
import com.jdc.accounting.domain.entity.MemberAccessHistory_;
import com.jdc.accounting.domain.entity.Member_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record MemberAccessSearch(
		@PathVariable String id, 
		LocalDate dateFrom,
		LocalDate dateTo) {

	public Predicate[] where(CriteriaBuilder cb, Root<MemberAccessHistory> root) {
		
		var params = new ArrayList<Predicate>();
		params.add(cb.equal(root.get(MemberAccessHistory_.member).get(Member_.id), UUID.fromString(id)));
		
		if(null != dateFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(MemberAccessHistory_.accessAt), dateFrom.atStartOfDay()));
		}
		
		if(null != dateTo) {
			params.add(cb.lessThan(root.get(MemberAccessHistory_.accessAt), dateTo.plusDays(1).atStartOfDay()));
		}

		return params.toArray(size -> new Predicate[size]);
	}

}
