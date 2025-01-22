package com.jdc.accounting.api.input;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record LedgerEntryForm(
		@NotBlank(message = "Please enter ledger code.")
	    String ledgerCode,
	    @NotBlank(message = "Please enter particular.")	
	    String particular,
	    @NotNull(message = "Please enter use date.")
	    LocalDate useDate,
	    @NotEmpty(message = "Please enter items.")
	    List<@Valid LedgerEntryFormItem> items
	) {}
