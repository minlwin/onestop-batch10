package com.jdc.accounting.domain.entity;

import java.math.BigDecimal;

import com.jdc.accounting.domain.embeddable.LedgerEntryItemPk;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class LedgerEntryItem {

	@EmbeddedId
	private LedgerEntryItemPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
	@JoinColumn(name = "use_date", referencedColumnName = "use_date", insertable = false, updatable = false)
	@JoinColumn(name = "seq_number", referencedColumnName = "seq_number", insertable = false, updatable = false)
	private LedgerEntry entry;
	
	@Column(nullable = false)
	private String itemName;
	
	@Column(nullable = false)
	private int quantity;

	@Column(nullable = false)
	private BigDecimal unitPrice;
}
