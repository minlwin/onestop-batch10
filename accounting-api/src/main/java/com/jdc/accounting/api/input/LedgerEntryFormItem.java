package com.jdc.accounting.api.input;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LedgerEntryFormItem(
	@NotBlank(message = "Please enter item name.")
    String itemName,
    @NotNull(message = "Please enter quantity.")
    BigDecimal quantity,
    @NotNull(message = "Please enter unit price.")
    BigDecimal unitPrice) {}
