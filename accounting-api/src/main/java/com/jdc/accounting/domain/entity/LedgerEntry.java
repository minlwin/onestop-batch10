package com.jdc.accounting.domain.entity;

import java.time.LocalDateTime;

import com.jdc.accounting.domain.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class LedgerEntry extends AbstractEntity{

	@EmbeddedId
	private LedgerEntryPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "member_id", referencedColumnName = "account_id", insertable = false, updatable = false)
	private Member member;
	
	@ManyToOne(optional = false)
	private Ledger ledger;
	
	@Column(nullable = false)
	private String particular;

	@Column(nullable = false)
	private LocalDateTime entryAt;
}
