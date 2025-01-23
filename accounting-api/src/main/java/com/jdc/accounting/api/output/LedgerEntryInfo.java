package com.jdc.accounting.api.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntry_;
import com.jdc.accounting.domain.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record LedgerEntryInfo(
    LedgerEntryPk id,
    BalanceType type,
    LocalDateTime issueAt,
    LedgerPk ledgerId,
    String ledgerName,
    String particular,
    BigDecimal amount,
    BigDecimal lastBalance
) {
	
	public String getCode() {
		return id.getCode();
	}
	
	public String getLedgerCode() {
        return ledgerId.getCode();	
	}
	
	public LocalDate getUseDate() {
		return id.getUseDate();
	}
	
	public static LedgerEntryInfo from(LedgerEntry entry) {
        return new LedgerEntryInfo(
                entry.getId(),
                entry.getLedger().getType(),
                entry.getCreatedAt(),
                entry.getLedger().getId(),
                entry.getLedger().getName(),
                entry.getParticular(),
                entry.getAmount(),
                entry.getLastBalance());		
   }

	public static void select(CriteriaQuery<LedgerEntryInfo> cq, Root<LedgerEntry> root) {
		cq.multiselect(
		    root.get(LedgerEntry_.id),
            root.get(LedgerEntry_.ledger).get(Ledger_.type),
            root.get(LedgerEntry_.createdAt),
            root.get(LedgerEntry_.ledger).get(Ledger_.id),
            root.get(LedgerEntry_.ledger).get(Ledger_.name),
            root.get(LedgerEntry_.particular),
            root.get(LedgerEntry_.amount),
            root.get(LedgerEntry_.lastBalance)); 
	}
}