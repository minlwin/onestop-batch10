package com.jdc.accounting.api.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntry_;
import com.jdc.accounting.domain.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record BalanceInfo(
	    LedgerEntryPk entryId,
	    LocalDateTime issueAt,
	    BalanceType type,
	    LedgerPk ledgerId,
	    String ledgerName,
	    String particular,
	    BigDecimal debit,
	    BigDecimal credit,
	    BigDecimal lastBalance) {
	
	public String getLedgerCode() {
		return ledgerId.getCode();
	}
	
	public String getId() {
		return entryId.getCode();
	}

	public static void select(CriteriaBuilder cb, CriteriaQuery<BalanceInfo> cq, Root<LedgerEntry> root) {
		cq.multiselect(
			root.get(LedgerEntry_.id),
			root.get(LedgerEntry_.createdAt),
			root.get(LedgerEntry_.ledger).get(Ledger_.type),
			root.get(LedgerEntry_.ledger).get(Ledger_.id),
			root.get(LedgerEntry_.ledger).get(Ledger_.name),
			root.get(LedgerEntry_.particular),
			cb.selectCase()
				.when(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.type), BalanceType.Debit), root.get(LedgerEntry_.amount))
				.otherwise(cb.literal(BigDecimal.ZERO)),
			cb.selectCase()
				.when(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.type), BalanceType.Credit), root.get(LedgerEntry_.amount))
				.otherwise(cb.literal(BigDecimal.ZERO)),
			root.get(LedgerEntry_.lastBalance)
		);
	}

}
