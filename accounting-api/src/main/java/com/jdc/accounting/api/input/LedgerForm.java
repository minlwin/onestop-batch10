package com.jdc.accounting.api.input;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.entity.Ledger;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LedgerForm(
		@NotNull(message = "Please select balance type.")
	    BalanceType type,
	    @NotBlank(message = "Please enter ledger name.")
	    String name,
	    @NotBlank(message = "Please enter description.")
	    String description
) {

	public Ledger entity() {
		var entity = new Ledger();
		
		entity.setType(type);
		entity.setName(name);
		entity.setDescription(description);
		
		return entity;
	}
}