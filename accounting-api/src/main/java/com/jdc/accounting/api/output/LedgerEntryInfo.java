package com.jdc.accounting.api.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.entity.LedgerEntry;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record LedgerEntryInfo(
    String id,
    BalanceType type,
    LocalDate useDate,
    LocalDateTime issueAt,
    String ledgerCode,
    String ledgerName,
    String particular,
    BigDecimal amount,
    BigDecimal lastBalance
) {

	public static void select(CriteriaQuery<LedgerEntryInfo> cq, Root<LedgerEntry> root) {
		// TODO Auto-generated method stub
		
	}
}