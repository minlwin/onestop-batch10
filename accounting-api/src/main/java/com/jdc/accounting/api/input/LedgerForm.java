package com.jdc.accounting.api.input;

import com.jdc.accounting.domain.consts.BalanceType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LedgerForm(
		@NotNull(message = "Please select balance type.")
	    BalanceType type,
	    @NotBlank(message = "Please enter ledger name.")
	    String name,
	    @NotBlank(message = "Please enter description.")
	    String description
) {}