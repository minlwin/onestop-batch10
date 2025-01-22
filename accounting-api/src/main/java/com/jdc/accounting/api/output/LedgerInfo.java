package com.jdc.accounting.api.output;

import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;

public record LedgerInfo(
	    String code,
	    String name,
	    BalanceType type,
	    String description,
	    LocalDateTime createdAt,
	    LocalDateTime modifiedAt,
	    boolean deleted
	) {}