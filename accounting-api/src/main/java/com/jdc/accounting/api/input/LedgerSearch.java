package com.jdc.accounting.api.input;

import com.jdc.accounting.domain.consts.BalanceType;

public record LedgerSearch(
	    BalanceType type,
	    Boolean deleted,
	    String code,
	    String keyword
) {}
