package com.jdc.accounting.api.input;

import java.time.LocalDateTime;
import java.util.UUID;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.entity.LedgerEntry;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Root;

public record LedgerEntrySearch(
		BalanceType type,
	    String code,
	    LocalDateTime dateForm,
	    LocalDateTime dateTo,
	    String keyword) {

	public Expression<Boolean> where(CriteriaBuilder cb, Root<LedgerEntry> root, UUID memberId) {
		// TODO Auto-generated method stub
		return null;
	}

}
