package com.jdc.accounting.domain.entity;

import java.math.BigDecimal;

import com.jdc.accounting.domain.AbstractEntity;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class LedgerEntry extends AbstractEntity {

	@EmbeddedId
	private LedgerEntryPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "member_id", insertable = false, updatable = false)
	private Member member;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "member_id", insertable = false, updatable = false)
	private Ledger ledger;
	
	private BigDecimal amount;
	private BigDecimal lastBalance;
	private String particular;
}
