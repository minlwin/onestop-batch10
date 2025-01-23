package com.jdc.accounting.api.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.util.StringUtils;

import com.jdc.accounting.domain.consts.BalanceType;
import com.jdc.accounting.domain.embeddable.LedgerPk;
import com.jdc.accounting.domain.entity.LedgerEntry;
import com.jdc.accounting.domain.entity.LedgerEntry_;
import com.jdc.accounting.domain.entity.Ledger_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record LedgerEntrySearch(
		BalanceType type,
	    String code,
	    LocalDate dateForm,
	    LocalDate dateTo,
	    String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<LedgerEntry> root, UUID memberId) {
		
		var params = new ArrayList<Predicate>();
		
		if (null != type) {
			params.add(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.type), type));
		}
		
		if (StringUtils.hasLength(code)) {
			params.add(cb.equal(root.get(LedgerEntry_.ledger).get(Ledger_.id), LedgerPk.from(memberId, code)));
		}
		
		if (null != dateForm) {
			params.add(cb.greaterThanOrEqualTo(root.get(LedgerEntry_.createdAt), dateForm.atStartOfDay()));
		}
		
		if (null != dateTo) {
			params.add(cb.lessThan(root.get(LedgerEntry_.createdAt), dateTo.plusDays(1).atStartOfDay()));
		}
		
		if (StringUtils.hasLength(keyword)) {
            params.add(cb.or(
                cb.like(cb.lower(root.get(LedgerEntry_.ledger).get(Ledger_.name)), keyword.toLowerCase().concat("%")),
                cb.like(cb.lower(root.get(LedgerEntry_.particular)), keyword.toLowerCase().concat("%"))
            ));
        }
		
		return params.toArray(size -> new Predicate[size]);
	}

}
