package com.jdc.accounting.api.output;

import com.jdc.accounting.domain.entity.LedgerEntry;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record BalanceInfo() {

	public static void select(CriteriaQuery<BalanceInfo> cq, Root<LedgerEntry> root) {
		// TODO Auto-generated method stub
		
	}

}
