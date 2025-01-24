package com.jdc.accounting.domain.entity;

import java.math.BigDecimal;
import java.util.List;

import com.jdc.accounting.domain.AbstractEntity;
import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerEntryPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@JoinColumn(name = "ledger_number", referencedColumnName = "ledger_number")
	@JoinColumn(name = "ledger_member_id", referencedColumnName = "member_id")
	private Ledger ledger;
	
	private BigDecimal amount = BigDecimal.ZERO;
	private BigDecimal lastBalance = BigDecimal.ZERO;
	private String particular;
	
	@OneToMany(mappedBy = "entry", orphanRemoval = true)
	private List<LedgerEntryItem> items;
	
	public BigDecimal getBalance() {
		return ledger.getType() == BalanceType.Credit ? 
				lastBalance.add(amount) : lastBalance.subtract(amount);
	}
}
