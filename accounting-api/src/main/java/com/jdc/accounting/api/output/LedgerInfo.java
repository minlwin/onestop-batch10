package com.jdc.accounting.api.output;

import java.time.LocalDateTime;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.Ledger;
import com.jdc.accounting.domain.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record LedgerInfo(
	    LedgerPk id,
	    String name,
	    BalanceType type,
	    String description,
	    LocalDateTime createdAt,
	    LocalDateTime modifiedAt,
	    boolean deleted
	) {
	
	public String getCode() {
		return id.getCode();
	}
	
	public static void select(CriteriaQuery<LedgerInfo> cq, Root<Ledger> root) {
		cq.multiselect(
			root.get(Ledger_.id),
			root.get(Ledger_.name),
			root.get(Ledger_.type),
			root.get(Ledger_.description),
			root.get(Ledger_.createdAt),
			root.get(Ledger_.updatedAt),
			root.get(Ledger_.deleted)
		);
	}	
	
	public static LedgerInfo from(Ledger entity) {
		return new LedgerInfo(
				entity.getId(), 
				entity.getName(), 
				entity.getType(), 
				entity.getDescription(), 
				entity.getCreatedAt(), 
				entity.getUpdatedAt(), 
				entity.isDeleted());
	}

}