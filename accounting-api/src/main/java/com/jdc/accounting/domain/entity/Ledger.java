package com.jdc.accounting.domain.entity;

import com.jdc.accounting.domain.AbstractEntity;
import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerPk;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(indexes = @Index(columnList = "member_id,name", unique = true))
@EqualsAndHashCode(callSuper = false)
public class Ledger extends AbstractEntity {

	@EmbeddedId
	private LedgerPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "member_id", insertable = false, updatable = false)
	private Member member;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private BalanceType type;
	
	@Column(nullable = false)
	private String description;

	private boolean deleted;
}
