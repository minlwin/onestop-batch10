package com.jdc.accounting.domain.entity;

import java.math.BigDecimal;

import com.jdc.accounting.domain.embeddable.LedgerEntryItemPk;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class LedgerEntryItem {

	@EmbeddedId
	private LedgerEntryItemPk id;
	
	@Column(nullable = false)
	private String itemName;
	
	@Column(nullable = false)
	private int quantity;

	@Column(nullable = false)
	private BigDecimal unitPrice;
}
