package com.jdc.accounting.api.output;

import java.math.BigDecimal;

public record LedgerEntryDetailsItem(
	    String itemName,
	    BigDecimal quantity,
	    BigDecimal unitPrice) {
	
	public BigDecimal getTotal() {
		return quantity.multiply(unitPrice);
	}
}
