package com.jdc.accounting.api.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

import com.jdc.accounting.domain.embeddable.LedgerEntryPk_;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntry_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record BalanceSearch(
		LocalDate dateFrom,
		LocalDate dateTo) {

	public Predicate[] where(CriteriaBuilder cb, Root<LedgerEntry> root, UUID id) {
		
		var params = new ArrayList<Predicate>();
		
		params.add(cb.equal(root.get(LedgerEntry_.id).get(LedgerEntryPk_.memberId), id));
		
		if (null != dateFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.useDate), dateFrom));
		}
		
		if (null != dateTo) {
			params.add(cb.lessThanOrEqualTo(root.get(LedgerEntry_.id).get(LedgerEntryPk_.useDate), dateTo));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
