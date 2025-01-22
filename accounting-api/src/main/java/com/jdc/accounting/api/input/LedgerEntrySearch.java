package com.jdc.accounting.api.input;

import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;

public record LedgerEntrySearch(
		BalanceType type,
	    String code,
	    LocalDateTime dateForm,
	    LocalDateTime dateTo,
	    String keyword) {

}
