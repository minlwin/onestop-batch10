package com.jdc.accounting.api.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.entity.LedgerEntry;

public record LedgerEntryDetails(
	    String id,
	    BalanceType type,
	    LocalDate useDate,
	    LocalDateTime issueAt,
	    String ledgerCode,
	    String ledgerName,
	    String particular,
	    BigDecimal amount,
	    BigDecimal lastBalance, 
	    List<LedgerEntryDetailsItem> items) {

	public static LedgerEntryDetails from(LedgerEntry entry) {
		return new Builder()
				.id(entry.getId().getCode())
				.type(entry.getLedger().getType())
				.useDate(entry.getId().getUseDate())
				.issueAt(entry.getCreatedAt())
				.ledgerCode(entry.getLedger().getId().getCode())
				.ledgerName(entry.getLedger().getName())
				.particular(entry.getParticular())
				.amount(entry.getAmount())
				.lastBalance(entry.getLastBalance())
				.items(entry.getItems().stream().map(LedgerEntryDetailsItem::from).toList())
				.build();
	}
	
	public static class Builder {
		private String id;
		private BalanceType type;
		private LocalDate useDate;
		private LocalDateTime issueAt;
		private String ledgerCode;
		private String ledgerName;
		private String particular;
		private BigDecimal amount;
		private BigDecimal lastBalance;
		private List<LedgerEntryDetailsItem> items;
        
        public Builder id(String id) {
            this.id = id;
            return this;
        }
        
        public Builder type(BalanceType type) {
        	this.type = type;
            return this;
        }
        
        public Builder useDate(LocalDate useDate) {
        	this.useDate = useDate;
            return this;
        }
        
        public Builder issueAt(LocalDateTime issueAt) {
        	this.issueAt = issueAt;
            return this;
        }
        
        public Builder ledgerCode(String ledgerCode) {
        	this.ledgerCode = ledgerCode;
            return this;
        }
        
        public Builder ledgerName(String ledgerName) {
        	this.ledgerName = ledgerName;
            return this;
        }
        
        public Builder particular(String particular) {
        	this.particular = particular;
            return this;
        }
        
        public Builder amount(BigDecimal amount) {
        	this.amount = amount;
            return this;
        }
        
        public Builder lastBalance(BigDecimal lastBalance) {
        	this.lastBalance = lastBalance;
            return this;
        }
        
        public Builder items(List<LedgerEntryDetailsItem> items) {
        	this.items = items;
            return this;
        }
        
        public LedgerEntryDetails build() {
            return new LedgerEntryDetails(id, type, useDate, issueAt, ledgerCode, ledgerName, particular, amount, lastBalance, items);
        }
   	}
}
