package com.jdc.accounting.api.input;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.util.StringUtils;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.Ledger;
import com.jdc.accounting.domain.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record LedgerSearch(
	    BalanceType type,
	    Boolean deleted,
	    String code,
	    String keyword
) {

	public Predicate[] where(CriteriaBuilder cb, Root<Ledger> root, UUID memberId) {
		
		var params = new ArrayList<Predicate>();
		
		if(null != type) {
			params.add(cb.equal(root.get(Ledger_.type), type));
		}
		
		if(null != deleted) {
			params.add(cb.equal(root.get(Ledger_.deleted), deleted));
		}

		if(StringUtils.hasLength(code)) {
			params.add(cb.equal(root.get(Ledger_.id), LedgerPk.from(memberId, code)));
		}

		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(root.get(Ledger_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Ledger_.description)), keyword.toLowerCase().concat("%"))
			));
		}

		return params.toArray(size -> new Predicate[size]);
	}
}
