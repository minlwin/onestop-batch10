package com.jdc.accounting.api.output;

import java.math.BigDecimal;

import com.jdc.accounting.domain.entity.LedgerEntryItem;

public record LedgerEntryDetailsItem(
	    String itemName,
	    int quantity,
	    BigDecimal unitPrice) {
	
	public BigDecimal getTotal() {
		return unitPrice.multiply(BigDecimal.valueOf(quantity));
	}
	
	public static LedgerEntryDetailsItem from(LedgerEntryItem item) {
		return new LedgerEntryDetailsItem(
				item.getItemName(), 
				item.getQuantity(), 
				item.getUnitPrice());
	}
}
