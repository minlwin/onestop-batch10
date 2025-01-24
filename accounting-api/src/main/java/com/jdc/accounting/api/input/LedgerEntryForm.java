package com.jdc.accounting.api.input;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record LedgerEntryForm(
		@NotBlank(message = "Please enter ledger code.")
	    String ledgerCode,
	    @NotBlank(message = "Please enter particular.")	
	    String particular,
	    @NotEmpty(message = "Please enter items.")
	    List<@Valid LedgerEntryFormItem> items) {
	
	public BigDecimal getAmount() {
		return items.stream().map(item -> item.unitPrice().multiply(BigDecimal.valueOf(item.quantity())))
				.reduce(BigDecimal.ZERO, (a, b) -> a.add(b));
	}
}
